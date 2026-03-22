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
 * 测试隐患排查及治理情况报告页面
 */
async function testRiskControlStatPage(page: Page): Promise<void> {
  console.log("\n=== 测试隐患排查及治理情况报告页面 ===");

  // 导航到统计页面
  await page.goto(`${BASE_URL}/sft/risk/control/statistics/index`);
  await page.waitForLoadState("networkidle");

  // 1. 验证页面标题
  const title = await page.textContent(".report-title");
  expect(title).toContain("隐患排查及治理情况报告");
  console.log("✓ 页面标题正确");

  // 2. 验证日期选择器存在
  const datePickers = page.locator(".el-date-picker");
  const datePickerCount = await datePickers.count();
  expect(datePickerCount).toBe(2);
  console.log("✓ 日期选择器已渲染");

  // 3. 验证检索和重置按钮
  const searchButton = page.locator('button:has-text("检索")');
  const resetButton = page.locator('button:has-text("重置")');
  await expect(searchButton.first()).toBeVisible();
  await expect(resetButton.first()).toBeVisible();
  console.log("✓ 检索/重置按钮已渲染");

  // 4. 等待加载完成并验证概要信息存在
  await page.waitForSelector(".report-summary:not(:empty)", { timeout: 10000 });
  const summary = page.locator(".report-summary");
  await expect(summary.first()).toBeVisible();
  const summaryText = await summary.textContent();
  expect(summaryText || "").toContain("共下发隐患排查任务");
  console.log("✓ 概要信息已显示");

  // 5. 验证排查任务执行情况表格
  const taskTable = page.locator(".report-table").first();
  await expect(taskTable).toBeVisible();
  console.log("✓ 排查任务执行情况表格已渲染");

  // 6. 验证任务表格表头
  const taskHeaders = await taskTable
    .locator(".el-table__header th")
    .allTextContents();
  expect(taskHeaders.join(" ")).toContain("排查类型");
  expect(taskHeaders.join(" ")).toContain("计划任务数");
  expect(taskHeaders.join(" ")).toContain("执行率");
  console.log("✓ 任务表格表头正确");

  // 7. 验证任务数据行
  const taskRows = await taskTable
    .locator(".el-table__body .el-table__row")
    .count();
  expect(taskRows).toBeGreaterThan(0);
  console.log(`✓ 任务数据行数: ${taskRows}`);

  // 8. 验证逾期任务表格
  const overdueTable = page.locator(".report-table").nth(1);
  await expect(overdueTable).toBeVisible();
  console.log("✓ 逾期任务表格已渲染");

  // 9. 验证导出按钮
  const exportButton = page.locator('button:has-text("导出")');
  await expect(exportButton.first()).toBeVisible();
  console.log("✓ 导出按钮已渲染");

  // 10. 验证执行率标签
  const rateTags = page.locator(".el-tag");
  const tagCount = await rateTags.count();
  expect(tagCount).toBeGreaterThan(0);
  console.log(`✓ 执行率标签数: ${tagCount}`);

  // 11. 截图
  await page.screenshot({
    path: "screenshots/sft-risk-control-stat.png",
    fullPage: true
  });
  console.log("✓ 已保存截图: screenshots/sft-risk-control-stat.png");

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
    console.log(
      `\n正在打开页面: ${BASE_URL}/sft/risk/control/statistics/index`
    );
    await page.goto(`${BASE_URL}/sft/risk/control/statistics/index`);

    // 检查是否需要登录
    const currentUrl = page.url();
    if (currentUrl.includes("/login")) {
      console.log("需要登录...");
      await login(page);
      // 登录后重新导航到目标页面
      await page.goto(`${BASE_URL}/sft/risk/control/statistics/index`);
    }

    // 运行测试
    await testRiskControlStatPage(page);
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
