/**
 * 控制台页面 - 端到端测试
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
 * 测试控制台页面
 */
async function testConsolePage(page: Page): Promise<void> {
  console.log("\n=== 测试控制台页面 ===");

  // 导航到页面
  await page.goto(`${BASE_URL}/sft/console/index`);
  await page.waitForLoadState("networkidle");

  // 1. 验证页面标题
  const pageTitle = await page.title();
  expect(pageTitle).toMatch(/控制台|Console/);
  console.log("✓ 页面标题正确");

  // 2. 验证卡片组件存在
  const cards = page.locator(".el-card");
  const cardCount = await cards.count();
  expect(cardCount).toBeGreaterThanOrEqual(6);
  console.log(`✓ 卡片组件存在，共 ${cardCount} 个`);

  // 3. 验证当日隐患排查部分
  const yhTodayTitle = page.locator(".unit:has-text('当日隐患排查')");
  await expect(yhTodayTitle).toBeVisible();
  console.log("✓ 当日隐患排查部分存在");

  // 4. 验证日常性隐患排查部分
  const yhDailyTitle = page.locator(".unit:has-text('日常性隐患排查')");
  await expect(yhDailyTitle).toBeVisible();
  console.log("✓ 日常性隐患排查部分存在");

  // 5. 验证风险分级管控部分
  const riskTitle = page.locator(".unit:has-text('风险分级管控')");
  await expect(riskTitle).toBeVisible();
  console.log("✓ 风险分级管控部分存在");

  // 6. 验证应急预案与应急资源部分
  const emergencyTitle = page.locator(".unit:has-text('应急预案与应急资源')");
  await expect(emergencyTitle).toBeVisible();
  console.log("✓ 应急预案与应急资源部分存在");

  // 7. 验证特殊作业部分
  const operationTitle = page.locator(".unit:has-text('特殊作业')");
  await expect(operationTitle).toBeVisible();
  console.log("✓ 特殊作业部分存在");

  // 8. 验证人员定位报警部分
  const positionTitle = page.locator(".unit:has-text('人员定位报警')");
  await expect(positionTitle).toBeVisible();
  console.log("✓ 人员定位报警部分存在");

  // 9. 验证智能视频监控部分
  const morTitle = page.locator(".unit:has-text('智能视频监控')");
  await expect(morTitle).toBeVisible();
  console.log("✓ 智能视频监控部分存在");

  // 10. 验证图表容器存在
  const chartContainers = page.locator(".chart");
  const chartCount = await chartContainers.count();
  expect(chartCount).toBeGreaterThanOrEqual(4);
  console.log(`✓ 图表容器存在，共 ${chartCount} 个`);

  // 11. 验证图例数据
  const legendItems = page.locator(".legend-item");
  const legendCount = await legendItems.count();
  expect(legendCount).toBeGreaterThan(0);
  console.log(`✓ 图例数据存在，共 ${legendCount} 项`);

  // 12. 验证类型列表数据
  const typeItems = page.locator(".type-item");
  const typeCount = await typeItems.count();
  expect(typeCount).toBeGreaterThan(0);
  console.log(`✓ 类型列表数据存在，共 ${typeCount} 项`);

  // 13. 验证人员定位报警表格
  const table = page.locator(".table-container .el-table");
  const tableExists = await table.count();
  if (tableExists > 0) {
    console.log("✓ 人员定位报警表格存在");
  } else {
    console.log("⚠ 人员定位报警表格不存在（可能无数据）");
  }

  // 14. 验证应急资源数量显示
  const fieldValues = await page
    .locator(".text-wrapper span:last-child")
    .allTextContents();
  const numericValues = fieldValues.filter(v => /^\d+$/.test(v));
  console.log(`✓ 应急资源数量显示: ${numericValues.slice(0, 5).join(", ")}`);

  // 15. 截图
  await page.screenshot({
    path: "screenshots/sft-console.png",
    fullPage: true
  });
  console.log("✓ 已保存截图: screenshots/sft-console.png");

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
    console.log(`\n正在打开页面: ${BASE_URL}/sft/console/index`);
    await page.goto(`${BASE_URL}/sft/console/index`);

    // 检查是否需要登录
    const currentUrl = page.url();
    if (currentUrl.includes("/login")) {
      console.log("需要登录...");
      await login(page);
      // 登录后重新导航到目标页面
      await page.goto(`${BASE_URL}/sft/console/index`);
    }

    // 运行测试
    await testConsolePage(page);
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
