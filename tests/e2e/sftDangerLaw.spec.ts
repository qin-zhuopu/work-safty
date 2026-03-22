/**
 * 法律法规页面 - 端到端测试
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
 * 测试法律法规页面
 */
async function testLawPage(page: Page): Promise<void> {
  console.log("\n=== 测试法律法规页面 ===");

  // 导航到页面
  await page.goto(`${BASE_URL}/sft/danger/law/index`);
  await page.waitForLoadState("networkidle");

  // 1. 验证页面标题
  const title = await page.textContent(".card-header span, h1, h2");
  expect(title).toContain("法律法规");
  console.log("✓ 页面标题正确");

  // 2. 验证表格存在
  const table = page.locator(".el-table");
  await expect(table.first()).toBeVisible();
  console.log("✓ 表格已渲染");

  // 3. 验证表头
  const headers = await page.locator(".el-table__header th").allTextContents();
  console.log("表头列:", headers.filter(h => h.trim()).slice(0, 6));
  const headerText = headers.join(" ");
  expect(headerText).toContain("序号");
  expect(headerText).toContain("级别");
  expect(headerText).toContain("类型");
  expect(headerText).toContain("法律法规名称");
  expect(headerText).toContain("颁布机构");
  expect(headerText).toContain("发布状态");
  console.log("✓ 表头正确");

  // 4. 验证数据行
  const dataRows = await page.locator(".el-table__body .el-table__row").count();
  expect(dataRows).toBeGreaterThan(0);
  console.log(`✓ 数据行数: ${dataRows}`);

  // 5. 验证搜索表单存在
  const nameInput = page.locator('input[placeholder="请输入文件名称"]');
  await expect(nameInput.first()).toBeVisible();
  console.log("✓ 搜索表单存在");

  // 6. 验证按钮存在
  const searchBtn = page.locator("button:has-text('查询')");
  const resetBtn = page.locator("button:has-text('重置')");
  const addBtn = page.locator("button:has-text('添加')");
  await expect(searchBtn.first()).toBeVisible();
  await expect(resetBtn.first()).toBeVisible();
  await expect(addBtn.first()).toBeVisible();
  console.log("✓ 查询/重置/添加按钮存在");

  // 7. 验证状态标签
  const statusTags = page.locator(".el-tag");
  const tagCount = await statusTags.count();
  expect(tagCount).toBeGreaterThan(0);
  console.log(`✓ 状态标签数: ${tagCount}`);

  // 8. 验证法律法规名称为蓝色链接
  const blueLinks = page.locator(".text-blue-600");
  const linkCount = await blueLinks.count();
  expect(linkCount).toBeGreaterThan(0);
  console.log(`✓ 法律法规名称链接数: ${linkCount}`);

  // 9. 测试搜索功能
  await nameInput.first().fill("安全生产");
  await searchBtn.first().click();
  await page.waitForTimeout(500);
  console.log("✓ 搜索功能可执行");

  // 10. 测试重置功能
  await resetBtn.first().click();
  await page.waitForTimeout(300);
  console.log("✓ 重置功能可执行");

  // 11. 验证分页组件
  const pagination = page.locator(".el-pagination");
  await expect(pagination.first()).toBeVisible();
  console.log("✓ 分页组件存在");

  // 12. 截图
  await page.screenshot({
    path: "screenshots/sft-danger-law.png",
    fullPage: true
  });
  console.log("✓ 已保存截图: screenshots/sft-danger-law.png");

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
    // 创建新页面，方便观察测试过程
    page = await context.newPage();

    // 先打开目标页面
    console.log(`\n正在打开页面: ${BASE_URL}/sft/danger/law/index`);
    await page.goto(`${BASE_URL}/sft/danger/law/index`);

    // 检查是否需要登录
    const currentUrl = page.url();
    if (currentUrl.includes("/login")) {
      console.log("需要登录...");
      await login(page);
      // 登录后重新导航到目标页面
      await page.goto(`${BASE_URL}/sft/danger/law/index`);
    }

    // 运行测试
    await testLawPage(page);
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
