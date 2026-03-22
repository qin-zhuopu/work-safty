/**
 * 隐患统计页面 - 端到端测试
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
 * 测试隐患统计页面
 */
async function testStatisticsPage(page: Page): Promise<void> {
  console.log("\n=== 测试隐患统计页面 ===");

  // 导航到页面
  await page.goto(`${BASE_URL}/sft/danger/statistics/index`);
  await page.waitForLoadState("networkidle");

  // 1. 验证页面标题
  const title = await page.textContent(".card-header span, h1, h2");
  expect(title).toContain("隐患统计");
  console.log("✓ 页面标题正确");

  // 2. 验证日期选择器存在
  const datePickers = page.locator(".el-date-editor");
  expect(await datePickers.count()).toBe(1);
  console.log("✓ 日期选择器存在");

  // 3. 验证检索按钮
  const searchBtn = page.locator("button:has-text('检索')");
  await expect(searchBtn.first()).toBeVisible();
  console.log("✓ 检索按钮存在");

  // 4. 验证图表容器
  const chartBlocks = page.locator(".chart-block");
  const chartCount = await chartBlocks.count();
  expect(chartCount).toBeGreaterThanOrEqual(6);
  console.log(`✓ 图表区块数: ${chartCount}`);

  // 5. 验证图表标题
  const titles = await page.locator(".chart-block .title").allTextContents();
  console.log("图表标题:", titles);

  // 6. 验证 ECharts 图表已渲染
  const charts = page.locator(".chart-block .chart");
  const chartElementsCount = await charts.count();
  expect(chartElementsCount).toBeGreaterThanOrEqual(6);
  console.log(`✓ ECharts 图表数: ${chartElementsCount}`);

  // 7. 验证图例
  const legendItems = page.locator(".legend div");
  const legendCount = await legendItems.count();
  expect(legendCount).toBeGreaterThanOrEqual(5);
  console.log(`✓ 图例项数: ${legendCount}`);

  // 8. 截图
  await page.screenshot({
    path: "screenshots/sft-danger-statistics.png",
    fullPage: true
  });
  console.log("✓ 已保存截图: screenshots/sft-danger-statistics.png");

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
    console.log(`\n正在打开页面: ${BASE_URL}/sft/danger/statistics/index`);
    await page.goto(`${BASE_URL}/sft/danger/statistics/index`);

    // 检查是否需要登录
    const currentUrl = page.url();
    if (currentUrl.includes("/login")) {
      console.log("需要登录...");
      await login(page);
      // 登录后重新导航到目标页面
      await page.goto(`${BASE_URL}/sft/danger/statistics/index`);
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
