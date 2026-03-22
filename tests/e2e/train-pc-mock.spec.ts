/**
 * 模拟答题页面 - 端到端测试
 * 使用 Playwright CDP 连接已有的 Chrome 实例
 */

import { chromium, type Page } from "playwright";
import { expect } from "@playwright/test";

const DEFAULT_CDP_PORT = 9223;
const BASE_URL = "http://localhost:8848";

interface TabInfo {
  title: string;
  url: string;
}

/**
 * 连接到 Chrome CDP
 */
async function connectToChrome(port: number = DEFAULT_CDP_PORT) {
  const cdpUrl = `http://localhost:${port}`;
  try {
    const browser = await chromium.connectOverCDP(cdpUrl);
    return browser;
  } catch {
    throw new Error(`无法连接到 Chrome CDP (${cdpUrl})`);
  }
}

/**
 * 获取所有 Chrome 标签页
 */
async function getChromeTabs(
  browser: Awaited<ReturnType<typeof connectToChrome>>
): Promise<TabInfo[]> {
  const contexts = browser.contexts();
  const pages = contexts.flatMap(ctx => ctx.pages());

  const tabInfo: TabInfo[] = await Promise.all(
    pages.map(async page => ({
      title: await page.title(),
      url: page.url()
    }))
  );

  return tabInfo;
}

/**
 * 登录系统
 */
async function login(page: Page): Promise<void> {
  await page.goto(`${BASE_URL}/login`);

  // 等待登录表单
  await page.waitForSelector('input[type="text"], input[name="username"]', {
    timeout: 5000
  });

  // 填写登录信息
  await page.fill('input[type="text"], input[name="username"]', "admin");
  await page.fill('input[type="password"], input[name="password"]', "admin123");

  // 点击登录按钮
  await page.click('button[type="submit"], .login-button, .el-button--primary');

  // 等待跳转到首页
  await page.waitForURL("**/welcome", { timeout: 10000 });
}

/**
 * 测试模拟答题页面
 */
async function testMockPage(page: Page): Promise<void> {
  console.log("\n=== 测试模拟答题页面 ===");

  // 导航到模拟答题页面
  await page.goto(`${BASE_URL}/train/pc/mock/index`);
  await page.waitForLoadState("networkidle");

  // 1. 验证面包屑导航
  const breadcrumb = await page.textContent(".el-breadcrumb");
  expect(breadcrumb).toContain("培训管理");
  expect(breadcrumb).toContain("模拟答题");
  console.log("✓ 面包屑导航正确");

  // 2. 验证页面标题
  const title = await page.textContent(".card-header span");
  expect(title).toContain("请选择题库类型");
  console.log("✓ 页面标题正确");

  // 3. 验证题库类型列表存在
  const radioGroup = page.locator(".el-radio-group");
  await expect(radioGroup.first()).toBeVisible();
  console.log("✓ 题库类型列表已渲染");

  // 4. 验证题库选项数量
  const radioItems = await page.locator(".el-radio").count();
  expect(radioItems).toBeGreaterThan(0);
  console.log(`✓ 题库选项数: ${radioItems}`);

  // 5. 验证第一个选项被默认选中
  const firstRadio = page.locator(".el-radio").first();
  const isChecked = await firstRadio
    .locator(".el-radio__input.is-checked")
    .count();
  expect(isChecked).toBe(1);
  console.log("✓ 默认选中第一项");

  // 6. 验证确认按钮存在
  const confirmButton = page.locator("button:has-text('确认')");
  await expect(confirmButton).toBeVisible();
  console.log("✓ 确认按钮存在");

  // 7. 点击一个题库选项
  const secondRadio = page.locator(".el-radio").nth(1);
  await secondRadio.click();
  const isSecondChecked = await secondRadio
    .locator(".el-radio__input.is-checked")
    .count();
  expect(isSecondChecked).toBe(1);
  console.log("✓ 可以切换题库选项");

  // 8. 截图
  await page.screenshot({
    path: "screenshots/train-pc-mock-page.png",
    fullPage: true
  });
  console.log("✓ 已保存截图: screenshots/train-pc-mock-page.png");

  console.log("\n=== 测试通过 ===\n");
}

/**
 * 主测试流程
 */
async function runTests() {
  let browser: Awaited<ReturnType<typeof connectToChrome>> | null = null;
  let page: Page | null = null;

  try {
    console.log("\n🚀 开始端到端测试...\n");

    // 连接到 Chrome
    browser = await connectToChrome();

    // 显示当前打开的标签页
    const tabs = await getChromeTabs(browser);
    console.log(`--- 当前 Chrome 标签页 (${tabs.length}) ---`);
    tabs.forEach((tab, i) => {
      console.log(`[${i + 1}] ${tab.title}`);
      console.log(`    ${tab.url}\n`);
    });

    // 创建新的上下文（或使用现有）
    const context = browser.contexts()[0] || (await browser.newContext());
    // 创建新页面
    page = await context.newPage();

    // 先打开目标页面
    console.log(`\n正在打开页面: ${BASE_URL}/train/pc/mock/index`);
    await page.goto(`${BASE_URL}/train/pc/mock/index`);

    // 检查是否需要登录
    const currentUrl = page.url();
    if (currentUrl.includes("/login")) {
      console.log("需要登录...");
      await login(page);
      // 登录后重新导航到目标页面
      await page.goto(`${BASE_URL}/train/pc/mock/index`);
    }

    // 运行测试
    await testMockPage(page);
  } catch (err: any) {
    console.error(`❌ 测试失败: ${err.message}`);
    if (err.stack) {
      console.error(err.stack);
    }
    process.exit(1);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

// 执行测试
runTests();
