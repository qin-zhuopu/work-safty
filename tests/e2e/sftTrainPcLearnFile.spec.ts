/**
 * 学习资料页面 - 端到端测试
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
 * 测试学习资料页面
 */
async function testLearnFilePage(page: Page): Promise<void> {
  console.log("\n=== 测试学习资料页面 ===");

  await page.goto(`${BASE_URL}/sft/train/pc/learn/file/index`);
  await page.waitForLoadState("networkidle");

  // 1. 验证页面标题
  const title = await page.textContent(".card-header span, h1, h2");
  expect(title).toContain("学习资料");
  console.log("✓ 页面标题正确");

  // 2. 验证搜索框存在
  const searchInput = page.locator(
    '.search-bar input, input[placeholder*="学习资料"]'
  );
  await expect(searchInput.first()).toBeVisible();
  console.log("✓ 搜索框已渲染");

  // 3. 验证表格存在
  const table = page.locator(".el-table");
  await expect(table.first()).toBeVisible();
  console.log("✓ 表格已渲染");

  // 4. 验证表头
  const headers = await page
    .locator(".el-table__header th .cell")
    .allTextContents();
  console.log("表头列:", headers.filter(h => h.trim()).slice(0, 5));
  expect(headers.some(h => h.includes("课件名称"))).toBeTruthy();
  expect(headers.some(h => h.includes("课件类型"))).toBeTruthy();

  // 5. 验证数据行
  const dataRows = await page.locator(".el-table__body .el-table__row").count();
  expect(dataRows).toBeGreaterThan(0);
  console.log(`✓ 数据行数: ${dataRows}`);

  // 6. 验证第一行数据
  const firstRowCells = await page
    .locator(".el-table__body .el-table__row")
    .first()
    .locator("td .cell")
    .allTextContents();
  console.log("第一行数据:", firstRowCells.slice(0, 3).join(" | "));

  // 7. 验证课件类型标签存在
  const tags = page.locator(".el-tag");
  const tagCount = await tags.count();
  expect(tagCount).toBeGreaterThan(0);
  console.log(`✓ 课件类型标签数: ${tagCount}`);

  // 8. 验证收藏开关存在
  const switches = page.locator(".el-switch");
  const switchCount = await switches.count();
  expect(switchCount).toBeGreaterThan(0);
  console.log(`✓ 收藏开关数: ${switchCount}`);

  // 9. 测试搜索功能
  console.log("\n--- 测试搜索功能 ---");
  await searchInput.first().fill("pdf");
  await page.waitForTimeout(500);

  // 搜索后应该有结果或显示无数据
  const searchResultCount = await page
    .locator(".el-table__body .el-table__row")
    .count();
  console.log(`搜索 'pdf' 结果数: ${searchResultCount}`);

  // 清除搜索
  await page.locator(".search-bar .el-icon, .el-input__clear").first().click();
  await page.waitForTimeout(300);

  const afterClearCount = await page
    .locator(".el-table__body .el-table__row")
    .count();
  console.log(`清除后数据行数: ${afterClearCount}`);

  // 10. 截图
  await page.screenshot({
    path: "screenshots/sft-train-pc-learn-file.png",
    fullPage: true
  });
  console.log("✓ 已保存截图: screenshots/sft-train-pc-learn-file.png");

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

    console.log(`\n正在打开页面: ${BASE_URL}/sft/train/pc/learn/file/index`);
    await page.goto(`${BASE_URL}/sft/train/pc/learn/file/index`);

    const currentUrl = page.url();
    if (currentUrl.includes("/login")) {
      console.log("需要登录...");
      await login(page);
      await page.goto(`${BASE_URL}/sft/train/pc/learn/file/index`);
    }

    await testLearnFilePage(page);
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
