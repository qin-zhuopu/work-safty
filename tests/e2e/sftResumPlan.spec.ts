/**
 * 三类包保责任制履职排查计划页面 - 端到端测试
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
 * 测试计划列表页面
 */
async function testPlanPage(page: Page): Promise<void> {
  console.log("\n=== 测试三类包保责任制履职排查计划页面 ===");

  // 导航到计划页面
  await page.goto(`${BASE_URL}/sft/resum/plan/index`);
  await page.waitForLoadState("networkidle");

  // 1. 验证页面标题
  const title = await page.textContent(".card-header span, h1, h2");
  expect(title).toContain("三类包保责任制履职排查计划");
  console.log("✓ 页面标题正确");

  // 2. 验证表格存在
  const table = page.locator(".el-table");
  await expect(table.first()).toBeVisible();
  console.log("✓ 表格已渲染");

  // 3. 验证搜索表单存在
  const typeSelect = page.locator('label:has-text("类型")');
  await expect(typeSelect).toBeVisible();
  console.log("✓ 搜索表单存在");

  // 4. 验证数据行
  const dataRows = await page.locator(".el-table__body .el-table__row").count();
  expect(dataRows).toBeGreaterThan(0);
  console.log(`✓ 数据行数: ${dataRows}`);

  // 5. 验证表头
  const headers = await page.locator(".el-table__header th").allTextContents();
  console.log("表头列:", headers.filter(h => h.trim()).slice(0, 6));
  expect(headers.some(h => h.includes("计划名称"))).toBeTruthy();

  // 6. 验证操作按钮
  const editButtons = page.locator('button:has-text("编辑")');
  const editCount = await editButtons.count();
  expect(editCount).toBeGreaterThan(0);
  console.log(`✓ 编辑按钮数: ${editCount}`);

  // 7. 验证状态标签
  const statusTags = page.locator(".el-tag");
  const tagCount = await statusTags.count();
  expect(tagCount).toBeGreaterThan(0);
  console.log(`✓ 状态标签数: ${tagCount}`);

  // 8. 验证分页组件
  const pagination = page.locator(".el-pagination");
  await expect(pagination).toBeVisible();
  console.log("✓ 分页组件存在");

  // 9. 测试搜索功能
  await page.fill('input[placeholder*="计划名称"]', "过氧化氢");
  await page.click('button:has-text("检索")');
  await page.waitForTimeout(500);
  console.log("✓ 搜索功能已触发");

  // 10. 重置搜索
  await page.click('button:has-text("重置")');
  await page.waitForTimeout(500);
  console.log("✓ 重置功能已触发");

  // 11. 截图
  await page.screenshot({
    path: "screenshots/sft-resum-plan.png",
    fullPage: true
  });
  console.log("✓ 已保存截图: screenshots/sft-resum-plan.png");

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
    page = await context.newPage();

    // 先打开目标页面
    console.log(`\n正在打开页面: ${BASE_URL}/sft/resum/plan/index`);
    await page.goto(`${BASE_URL}/sft/resum/plan/index`);

    // 检查是否需要登录
    const currentUrl = page.url();
    if (currentUrl.includes("/login")) {
      console.log("需要登录...");
      await login(page);
      // 登录后重新导航到目标页面
      await page.goto(`${BASE_URL}/sft/resum/plan/index`);
    }

    // 运行测试
    await testPlanPage(page);
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
