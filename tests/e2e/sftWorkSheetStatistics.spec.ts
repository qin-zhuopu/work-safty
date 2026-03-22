/**
 * 派工单分析页面 - 端到端测试
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
      `无法连接到 Chrome CDP (${cdpUrl})\n` +
        `请确保 Chrome 已启动调试模式：\n` +
        `/Applications/Google\\ Chrome.app/Contents/MacOS/Google\\ Chrome --remote-debugging-port=${port}`
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
 * 测试派工单分析页面
 */
async function testStatisticsPage(page: Page): Promise<void> {
  console.log("\n=== 测试派工单分析页面 ===");

  // 导航到统计页面
  await page.goto(`${BASE_URL}/sft/work/sheet/statistics`);
  await page.waitForLoadState("networkidle");

  // 1. 验证页面标题
  const chartTitle = await page.textContent(".chart-title");
  expect(chartTitle).toContain("派工单统计");
  console.log("✓ 页面标题正确");

  // 2. 验证筛选区域存在
  const filterBox = page.locator(".filter-box");
  await expect(filterBox.first()).toBeVisible();
  console.log("✓ 筛选区域已渲染");

  // 3. 验证日期输入框
  const dateInputs = page.locator(".filter-box input[readonly]");
  const inputCount = await dateInputs.count();
  expect(inputCount).toBeGreaterThanOrEqual(2);
  console.log(`✓ 日期输入框数量: ${inputCount}`);

  // 4. 验证检索按钮
  const searchButton = page.locator('button:has-text("检索")');
  await expect(searchButton.first()).toBeVisible();
  console.log("✓ 检索按钮存在");

  // 5. 验证图表区域
  const chartTitles = await page.locator(".chart-title").allTextContents();
  console.log("图表标题:", chartTitles);

  // 6. 验证申请单位派工单统计图表
  const barSQ = page.locator("#barSQ");
  await expect(barSQ.first()).toBeVisible();
  console.log("✓ 申请单位派工单统计图表已渲染");

  // 7. 验证施工单位派工单统计图表
  const barSG = page.locator("#barSG");
  await expect(barSG.first()).toBeVisible();
  console.log("✓ 施工单位派工单统计图表已渲染");

  // 8. 验证图例存在
  const legendItems = page.locator(".legend-item");
  const legendCount = await legendItems.count();
  expect(legendCount).toBeGreaterThan(0);
  console.log(`✓ 图例项数量: ${legendCount}`);

  // 9. 验证图例文字
  const legendTexts = await legendItems.allTextContents();
  const expectedLegends = ["申请中", "审批中", "已结束", "已驳回", "紧急停止"];
  for (const legend of expectedLegends) {
    const found = legendTexts.some(text => text.includes(legend));
    expect(found).toBeTruthy();
  }
  console.log("✓ 图例文字正确");

  // 10. 截图
  await page.screenshot({
    path: "screenshots/sftWorkSheetStatistics.png",
    fullPage: true
  });
  console.log("✓ 已保存截图: screenshots/sftWorkSheetStatistics.png");

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
    console.log(`\n正在打开页面: ${BASE_URL}/sft/work/sheet/statistics`);
    await page.goto(`${BASE_URL}/sft/work/sheet/statistics`);

    // 检查是否需要登录
    const currentUrl = page.url();
    if (currentUrl.includes("/login")) {
      console.log("需要登录...");
      await login(page);
      // 登录后重新导航到目标页面
      await page.goto(`${BASE_URL}/sft/work/sheet/statistics`);
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
