/**
 * 特殊作业分析页面 - 端到端测试
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

  await page.waitForSelector('input[type="text"], input[name="username"]', {
    timeout: 5000
  });

  await page.fill('input[type="text"], input[name="username"]', "admin");
  await page.fill('input[type="password"], input[name="password"]', "admin123");

  await page.click('button[type="submit"], .login-button, .el-button--primary');

  await page.waitForURL("**/welcome", { timeout: 10000 });
}

/**
 * 测试统计页面
 */
async function testStatisticsPage(page: Page): Promise<void> {
  console.log("\n=== 测试特殊作业分析页面 ===");

  await page.goto(`${BASE_URL}/sft/work/doc/statistics/index`);
  await page.waitForLoadState("networkidle");

  // 1. 验证页面标题
  const title = await page.textContent(".card-header .title-cn");
  expect(title?.trim()).toContain("活动统计");
  console.log("✓ 页面标题正确");

  // 2. 验证筛选条件存在
  const dateRangeInput = page.locator("input[placeholder*='开始时间']");
  await expect(dateRangeInput).toBeVisible();
  console.log("✓ 日期选择器存在");

  // 3. 验证图表容器存在
  const actChart = page.locator("#bar-act");
  const docChart = page.locator("#bar-doc");
  const typeChart = page.locator("#bar-type");
  const pieChart = page.locator("#pie-cbs");

  await expect(actChart).toBeVisible();
  await expect(docChart).toBeVisible();
  await expect(typeChart).toBeVisible();
  await expect(pieChart).toBeVisible();
  console.log("✓ 所有图表容器已渲染");

  // 4. 验证卡片标题
  const cardTitles = await page
    .locator(".card-header .title-cn")
    .allTextContents();
  expect(cardTitles).toContain("活动统计");
  expect(cardTitles).toContain("作业统计");
  expect(cardTitles).toContain("作业类型统计");
  expect(cardTitles).toContain("承包商和本部统计");
  console.log("✓ 卡片标题正确");

  // 5. 验证图例存在
  const chartLegend = page.locator(".chart-legend");
  await expect(chartLegend.first()).toBeVisible();
  console.log("✓ 图例已渲染");

  // 6. 验证承包商统计图例
  const pieLegend = page.locator(".pie-legend");
  await expect(pieLegend).toBeVisible();
  const legendText = await pieLegend.textContent();
  expect(legendText).toContain("本部");
  expect(legendText).toContain("承包商");
  console.log("✓ 承包商统计图例正确");

  // 7. 截图
  await page.screenshot({
    path: "screenshots/sft-work-doc-statistics.png",
    fullPage: true
  });
  console.log("✓ 已保存截图: screenshots/sft-work-doc-statistics.png");

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

    browser = await connectToChrome();

    const tabs = await getChromeTabs(browser);
    console.log(`--- 当前 Chrome 标签页 (${tabs.length}) ---`);
    tabs.forEach((tab, i) => {
      console.log(`[${i + 1}] ${tab.title}`);
      console.log(`    ${tab.url}\n`);
    });

    const context = browser.contexts()[0] || (await browser.newContext());
    page = await context.newPage();

    console.log(`\n正在打开页面: ${BASE_URL}/sft/work/doc/statistics/index`);
    await page.goto(`${BASE_URL}/sft/work/doc/statistics/index`);

    const currentUrl = page.url();
    if (currentUrl.includes("/login")) {
      console.log("需要登录...");
      await login(page);
      await page.goto(`${BASE_URL}/sft/work/doc/statistics/index`);
    }

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

runTests();
