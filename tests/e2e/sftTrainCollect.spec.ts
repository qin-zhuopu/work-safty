/**
 * 收藏历史页面 - 端到端测试
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
 * 测试收藏历史页面
 */
async function testCollectPage(page: Page): Promise<void> {
  console.log("\n=== 测试收藏历史页面 ===");

  // 导航到页面
  await page.goto(`${BASE_URL}/sft/train/collect`);
  await page.waitForLoadState("networkidle");

  // 1. 验证面包屑导航
  const breadcrumb = await page.textContent(".breadcrumb");
  expect(breadcrumb).toContain("教育培训");
  expect(breadcrumb).toContain("收藏历史");
  console.log("✓ 面包屑导航正确");

  // 2. 验证返回按钮存在
  const backButton = page.locator(".action-card button:has-text('返回')");
  await expect(backButton.first()).toBeVisible();
  console.log("✓ 返回按钮存在");

  // 3. 验证 Tab 切换存在
  const tabs = page.locator(".content-card .el-tabs__item");
  const tabCount = await tabs.count();
  expect(tabCount).toBeGreaterThanOrEqual(2);
  console.log(`✓ Tab 切换存在，共 ${tabCount} 个`);

  // 4. 验证学习资料 Tab（默认选中）
  const activeTab = await page
    .locator(".content-card .el-tabs__item.is-active")
    .first()
    .textContent();
  expect(activeTab).toContain("学习资料");
  console.log("✓ 默认选中学习资料 Tab");

  // 5. 验证学习资料表格
  const materialTable = page.locator(".content-card .el-table");
  await expect(materialTable.first()).toBeVisible();
  const materialRows = await page
    .locator(".content-card .el-table__body .el-table__row")
    .count();
  expect(materialRows).toBeGreaterThan(0);
  console.log(`✓ 学习资料表格存在，共 ${materialRows} 行数据`);

  // 6. 验证学习资料表头
  const materialHeaders = await page
    .locator(".content-card .el-table__header th")
    .allTextContents();
  console.log(
    "学习资料表头:",
    materialHeaders.filter(h => h.trim()).slice(0, 3)
  );
  expect(materialHeaders.some(h => h.includes("课件名称"))).toBeTruthy();
  expect(materialHeaders.some(h => h.includes("收藏时间"))).toBeTruthy();

  // 7. 验证课件名称链接
  const firstLink = page
    .locator(".content-card .el-table__body .el-table__row")
    .first()
    .locator(".el-link");
  await expect(firstLink.first()).toBeVisible();
  const linkText = await firstLink.first().textContent();
  console.log(`✓ 第一行课件名称: ${linkText}`);

  // 8. 验证取消收藏按钮
  const cancelButton = page
    .locator(".content-card .el-button:has-text('取消收藏')")
    .first();
  await expect(cancelButton).toBeVisible();
  console.log("✓ 取消收藏按钮存在");

  // 9. 测试切换到考试题目 Tab
  await page
    .locator(".content-card .el-tabs__item:has-text('考试题目')")
    .click();
  await page.waitForTimeout(500);
  const examTabClass = await page
    .locator(".content-card .el-tabs__item:has-text('考试题目')")
    .getAttribute("class");
  expect(examTabClass).toContain("is-active");
  console.log("✓ 切换到考试题目 Tab 成功");

  // 10. 验证考试题目表格
  const examHeaders = await page
    .locator(".content-card .el-table__header th")
    .allTextContents();
  console.log("考试题目表头:", examHeaders.filter(h => h.trim()).slice(0, 5));
  expect(examHeaders.some(h => h.includes("题目名称"))).toBeTruthy();

  // 11. 截图
  await page.screenshot({
    path: "screenshots/sft-train-collect.png",
    fullPage: true
  });
  console.log("✓ 已保存截图: screenshots/sft-train-collect.png");

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
    console.log(`\n正在打开页面: ${BASE_URL}/sft/train/collect`);
    await page.goto(`${BASE_URL}/sft/train/collect`);

    // 检查是否需要登录
    const currentUrl = page.url();
    if (currentUrl.includes("/login")) {
      console.log("需要登录...");
      await login(page);
      // 登录后重新导航到目标页面
      await page.goto(`${BASE_URL}/sft/train/collect`);
    }

    // 运行测试
    await testCollectPage(page);
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
