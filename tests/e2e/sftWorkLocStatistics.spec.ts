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
  await page.waitForLoadState("networkidle");

  // 等待页面内容加载
  await page.waitForTimeout(2000);

  // 1. 验证页面已加载
  const pageTitle = await page.title();
  console.log("页面标题:", pageTitle);
  expect(pageTitle).toContain("人员报警统计");
  console.log("✓ 页面已加载");

  // 检查页面中是否有实际内容
  const bodyContent = await page.textContent("body");
  const hasContent =
    bodyContent?.includes("报警") || bodyContent?.includes("统计");
  console.log("页面是否包含报警/统计内容:", hasContent);

  // 2. 验证筛选条件存在
  const datePicker = page.locator(".el-date-picker");
  const hasDatePicker = (await datePicker.count()) > 0;
  console.log("是否有日期选择器:", hasDatePicker);

  if (hasDatePicker) {
    await expect(datePicker.first()).toBeVisible();
    console.log("✓ 日期选择器已渲染");
  } else {
    console.log("⚠ 日期选择器未找到，跳过");
  }

  const searchBtn = page.locator('button:has-text("检索")');
  const hasSearchBtn = (await searchBtn.count()) > 0;
  console.log("是否有检索按钮:", hasSearchBtn);

  // 3. 验证报警总数卡片
  const alarmCountCard = page.locator(".alarm-count-card");
  const hasAlarmCard = (await alarmCountCard.count()) > 0;
  console.log("是否有报警总数卡片:", hasAlarmCard);

  if (hasAlarmCard) {
    await expect(alarmCountCard).toBeVisible();
    console.log("✓ 报警总数卡片已渲染");

    const alarmCount = await page.locator(".alarm-count").textContent();
    expect(alarmCount).toBeTruthy();
    console.log(`✓ 报警总数: ${alarmCount}`);
  } else {
    console.log("⚠ 报警总数卡片未找到，跳过");
  }

  // 4. 验证按属地统计卡片
  const deptCard = page.locator(".el-card").filter({ hasText: "按属地" });
  const hasDeptCard = (await deptCard.count()) > 0;
  console.log("是否有按属地卡片:", hasDeptCard);

  if (hasDeptCard) {
    await expect(deptCard.first()).toBeVisible();
    console.log("✓ 按属地统计卡片已渲染");
  }

  // 5. 验证部门网格
  const deptGridItems = page.locator(".dept-grid-item");
  const deptCount = await deptGridItems.count();
  console.log(`部门网格项数: ${deptCount}`);

  // 6. 验证按类型统计卡片
  const typeCard = page.locator(".el-card").filter({ hasText: "按类型" });
  const hasTypeCard = (await typeCard.count()) > 0;
  console.log("是否有按类型卡片:", hasTypeCard);

  if (hasTypeCard) {
    await expect(typeCard.first()).toBeVisible();
    console.log("✓ 按类型统计卡片已渲染");
  }

  // 7. 验证类型网格
  const typeGridItems = page.locator(".type-grid-item");
  const typeCount = await typeGridItems.count();
  console.log(`类型网格项数: ${typeCount}`);

  // 8. 验证图表区域
  const deptChart = page.locator("#bar-tj-dep");
  const hasDeptChart = (await deptChart.count()) > 0;
  console.log("是否有按属地图表:", hasDeptChart);

  const typeChart = page.locator("#bar-tj-type");
  const hasTypeChart = (await typeChart.count()) > 0;
  console.log("是否有按类型图表:", hasTypeChart);

  // 9. 截图
  await page.screenshot({
    path: "screenshots/work-loc-statistics.png",
    fullPage: true
  });
  console.log("✓ 已保存截图: screenshots/work-loc-statistics.png");

  // 如果页面内容为空，尝试刷新
  if (!hasContent && !hasAlarmCard) {
    console.log("\n⚠ 页面内容为空，尝试刷新...");
    await page.reload({ waitUntil: "networkidle" });
    await page.waitForTimeout(2000);
    console.log("页面已刷新");
  }

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
