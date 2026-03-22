/**
 * 人员报警统计页面 - 端到端测试
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

  await page.waitForSelector('input[type="text"], input[name="username"]', {
    timeout: 5000
  });

  await page.fill('input[type="text"], input[name="username"]', "admin");
  await page.fill('input[type="password"], input[name="password"]', "admin123");

  await page.click('button[type="submit"], .login-button, .el-button--primary');

  await page.waitForURL("**/welcome", { timeout: 10000 });
}

/**
 * 测试人员报警统计页面
 */
async function testStatisticsPage(page: Page): Promise<void> {
  console.log("\n=== 测试人员报警统计页面 ===");

  await page.goto(`${BASE_URL}/sft/work/loc/statistics`, {
    waitUntil: "domcontentloaded"
  });
  // Wait for key elements to be present
  await page.waitForSelector(".statistics-container", { timeout: 10000 });

  // 1. 验证页面标题
  const pageTitle = await page.title();
  expect(pageTitle).toBeTruthy();
  console.log("✓ 页面已加载");

  // 2. 验证筛选条件存在
  const dateRangePicker = page.locator(".el-date-editor");
  await expect(dateRangePicker.first()).toBeVisible();
  console.log("✓ 日期选择器已渲染");

  const searchBtn = page.locator('button:has-text("检索")');
  await expect(searchBtn).toBeVisible();
  console.log("✓ 检索按钮已渲染");

  // 3. 验证报警总数卡片
  const alarmCountCard = page.locator(".alarm-count-card");
  await expect(alarmCountCard).toBeVisible();
  console.log("✓ 报警总数卡片已渲染");

  const alarmCount = await page.locator(".alarm-count").textContent();
  expect(alarmCount).toBeTruthy();
  console.log(`✓ 报警总数: ${alarmCount}`);

  // 4. 验证按属地统计卡片
  const deptCard = page
    .locator(".el-card")
    .filter({ hasText: "按属地" })
    .first();
  await expect(deptCard).toBeVisible();
  console.log("✓ 按属地统计卡片已渲染");

  const deptSummary = await page.locator(".dept-summary").textContent();
  expect(deptSummary).toBeTruthy();
  console.log("✓ 按属地摘要已渲染");

  // 5. 验证部门网格
  const deptGridItems = page.locator(".dept-grid-item");
  const deptCount = await deptGridItems.count();
  expect(deptCount).toBeGreaterThan(0);
  console.log(`✓ 部门网格项数: ${deptCount}`);

  // 6. 验证按类型统计卡片
  const typeCard = page
    .locator(".el-card")
    .filter({ hasText: "按类型" })
    .first();
  await expect(typeCard).toBeVisible();
  console.log("✓ 按类型统计卡片已渲染");

  const typeSummary = await page.locator(".type-summary").textContent();
  expect(typeSummary).toBeTruthy();
  console.log("✓ 按类型摘要已渲染");

  // 7. 验证类型网格
  const typeGridItems = page.locator(".type-grid-item");
  const typeCount = await typeGridItems.count();
  expect(typeCount).toBeGreaterThan(0);
  console.log(`✓ 类型网格项数: ${typeCount}`);

  // 8. 验证图表区域
  const chartCards = page.locator(".chart-card");
  const chartCardCount = await chartCards.count();
  expect(chartCardCount).toBe(2);
  console.log("✓ 图表卡片数量: 2");

  const deptChart = page.locator("#bar-tj-dep");
  await expect(deptChart).toBeVisible();
  console.log("✓ 按属地图表已渲染");

  const typeChart = page.locator("#bar-tj-type");
  await expect(typeChart).toBeVisible();
  console.log("✓ 按类型图表已渲染");

  // 9. 验证报警数据高亮
  const alarmDataItems = page.locator(".alarm-data");
  const alarmDataCount = await alarmDataItems.count();
  expect(alarmDataCount).toBeGreaterThan(0);
  console.log(`✓ 报警数据高亮项数: ${alarmDataCount}`);

  // 10. 截图
  await page.screenshot({
    path: "screenshots/sft-work-loc-statistics.png",
    fullPage: true
  });
  console.log("✓ 已保存截图: screenshots/sft-work-loc-statistics.png");

  // 11. 测试日期筛选功能
  console.log("\n测试日期筛选功能...");
  await searchBtn.click();
  await page.waitForTimeout(1000);
  console.log("✓ 检索按钮点击成功");

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

    console.log(`\n正在打开页面: ${BASE_URL}/sft/work/loc/statistics`);
    await page.goto(`${BASE_URL}/sft/work/loc/statistics`);

    const currentUrl = page.url();
    if (currentUrl.includes("/login")) {
      console.log("需要登录...");
      await login(page);
      await page.goto(`${BASE_URL}/sft/work/loc/statistics`);
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
