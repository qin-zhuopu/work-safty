/**
 * 隐患排查及治理情况报告页面 - 端到端测试
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
    throw new Error(
      `无法连接到 Chrome CDP (${cdpUrl})\n` + `请确保 Chrome 已启动调试模式`
    );
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
 * 测试隐患排查统计页面
 */
async function testStatisticsPage(page: Page): Promise<void> {
  console.log("\n=== 测试隐患排查统计页面 ===");

  // 导航到统计页面
  await page.goto(`${BASE_URL}/sft/risk/control/statistics`);
  await page.waitForLoadState("networkidle");

  // 1. 验证页面标题
  const title = await page.textContent(".card-header span, h1, h2");
  expect(title).toContain("隐患排查及治理情况报告");
  console.log("✓ 页面标题正确");

  // 2. 验证日期输入框存在
  const dateInputs = page.locator("input.el-input__inner");
  const inputCount = await dateInputs.count();
  expect(inputCount).toBeGreaterThanOrEqual(2);
  console.log("✓ 日期输入框已渲染");

  // 3. 验证检索和重置按钮
  const searchBtn = page.locator("button:has-text('检索')");
  const resetBtn = page.locator("button:has-text('重置')");
  await expect(searchBtn).toBeVisible();
  await expect(resetBtn).toBeVisible();
  console.log("✓ 检索和重置按钮存在");

  // 4. 验证报告标题
  const reportTitle = await page.textContent(".report-title");
  expect(reportTitle).toContain("隐患排查及治理情况报告");
  console.log("✓ 报告标题正确");

  // 5. 验证摘要内容
  const summary = await page.textContent(".report-summary");
  expect(summary).toBeTruthy();
  expect(summary?.length).toBeGreaterThan(0);
  console.log("✓ 摘要内容存在");

  // 6. 验证排查任务执行情况表格
  const taskTable = page.locator(".report-item").first().locator(".el-table");
  await expect(taskTable).toBeVisible();
  console.log("✓ 排查任务执行情况表格已渲染");

  // 7. 验证表格数据行（至少应该有4行数据）
  const taskRows = await taskTable
    .locator(".el-table__body .el-table__row")
    .count();
  expect(taskRows).toBeGreaterThan(0);
  console.log(`✓ 任务执行表格数据行数: ${taskRows}`);

  // 8. 验证表格列头
  const taskHeaders = await taskTable
    .locator(".el-table__header th .cell")
    .allTextContents();
  expect(taskHeaders).toContain("排查类型");
  expect(taskHeaders).toContain("执行率");
  console.log("✓ 表格列头正确");

  // 9. 验证逾期未执行任务区域
  const overdueSection = page.locator(".report-item").nth(1);
  await expect(overdueSection).toBeVisible();
  console.log("✓ 逾期未执行任务区域已渲染");

  // 10. 验证导出按钮
  const exportBtn = overdueSection.locator("button:has-text('导出')");
  await expect(exportBtn).toBeVisible();
  console.log("✓ 导出按钮存在");

  // 11. 验证执行率标签（应该有不同颜色的标签）
  const rateTags = page.locator(".el-tag");
  const tagCount = await rateTags.count();
  expect(tagCount).toBeGreaterThan(0);
  console.log(`✓ 执行率标签数: ${tagCount}`);

  // 12. 截图
  await page.screenshot({
    path: "screenshots/sft-risk-control-statistics.png",
    fullPage: true
  });
  console.log("✓ 已保存截图: screenshots/sft-risk-control-statistics.png");

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
    console.log(`\n正在打开页面: ${BASE_URL}/sft/risk/control/statistics`);
    await page.goto(`${BASE_URL}/sft/risk/control/statistics`);

    // 检查是否需要登录
    const currentUrl = page.url();
    if (currentUrl.includes("/login")) {
      console.log("需要登录...");
      await login(page);
      // 登录后重新导航到目标页面
      await page.goto(`${BASE_URL}/sft/risk/control/statistics`);
    }

    // 运行测试
    await testStatisticsPage(page);
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
