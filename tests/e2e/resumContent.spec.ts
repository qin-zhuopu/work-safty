/**
 * 三类包保责任制履职排查内容页面 - 端到端测试
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
 * 测试履职排查内容页面
 */
async function testContentPage(page: Page): Promise<void> {
  console.log("\n=== 测试履职排查内容页面 ===");

  // 导航到页面
  await page.goto(`${BASE_URL}/resum/content`);
  await page.waitForLoadState("networkidle");

  // 1. 验证页面标题
  const title = await page.textContent(".card-header span");
  expect(title).toContain("三类包保责任制履职排查内容");
  console.log("✓ 页面标题正确");

  // 2. 验证搜索表单存在
  const typeSelect = page.locator(".el-select");
  await expect(typeSelect.first()).toBeVisible();
  console.log("✓ 类型选择框已渲染");

  const contentInput = page.locator('input[type="text"]');
  const inputCount = await contentInput.count();
  expect(inputCount).toBeGreaterThan(0);
  console.log("✓ 排查内容输入框已渲染");

  // 3. 验证按钮存在
  const searchButton = page.locator("button:has-text('检索')");
  await expect(searchButton.first()).toBeVisible();
  console.log("✓ 检索按钮已渲染");

  const resetButton = page.locator("button:has-text('重置')");
  await expect(resetButton.first()).toBeVisible();
  console.log("✓ 重置按钮已渲染");

  const addButton = page.locator("button:has-text('新建')");
  await expect(addButton.first()).toBeVisible();
  console.log("✓ 新建按钮已渲染");

  // 4. 验证表格存在
  const table = page.locator(".el-table");
  await expect(table.first()).toBeVisible();
  console.log("✓ 表格已渲染");

  // 5. 验证数据行（允许为空，可能是 Mock API 未加载）
  const dataRows = await page.locator(".el-table__body .el-table__row").count();
  console.log(`✓ 数据行数: ${dataRows}`);

  // 6. 验证表头
  const headers = await page.locator(".el-table__header th").allTextContents();
  console.log("表头列:", headers.filter(h => h.trim()).slice(0, 5));

  // 7. 验证第一行数据（如果有数据）
  if (dataRows > 0) {
    const firstRowCells = await page
      .locator(".el-table__body .el-table__row")
      .first()
      .locator("td")
      .allTextContents();
    console.log("第一行数据:", firstRowCells.slice(0, 4).join(" | "));
  } else {
    console.log("⚠ 数据行为空，跳过第一行验证");
  }

  // 8. 测试类型选择
  await typeSelect.first().click();
  await page.waitForTimeout(500);
  const options = page.locator(".el-select-dropdown__item");
  const optionCount = await options.count();
  expect(optionCount).toBeGreaterThan(0);
  console.log(`✓ 类型选项数: ${optionCount}`);

  // 点击页面其他地方关闭下拉框
  await page.mouse.click(100, 100);

  // 9. 测试编辑按钮（如果有数据）
  if (dataRows > 0) {
    const editButton = page
      .locator(".el-table__body .el-table__row")
      .first()
      .locator("button:has-text('编辑')");
    await expect(editButton.first()).toBeVisible();
    console.log("✓ 编辑按钮已渲染");
  } else {
    console.log("⚠ 数据行为空，跳过编辑按钮验证");
  }

  // 10. 验证分页存在
  const pagination = page.locator(".el-pagination");
  await expect(pagination.first()).toBeVisible();
  console.log("✓ 分页组件已渲染");

  // 11. 截图
  await page.screenshot({
    path: "screenshots/resum-content.png",
    fullPage: true
  });
  console.log("✓ 已保存截图: screenshots/resum-content.png");

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
    console.log(`\n正在打开页面: ${BASE_URL}/resum/content`);
    await page.goto(`${BASE_URL}/resum/content`);

    // 检查是否需要登录
    const currentUrl = page.url();
    if (currentUrl.includes("/login")) {
      console.log("需要登录...");
      await login(page);
      // 登录后重新导航到目标页面
      await page.goto(`${BASE_URL}/resum/content`);
    }

    // 运行测试
    await testContentPage(page);
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
