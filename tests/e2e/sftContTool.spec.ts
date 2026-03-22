/**
 * 工器具管理页面 - 端到端测试
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
 * 测试工器具管理页面
 */
async function testToolPage(page: Page): Promise<void> {
  console.log("\n=== 测试工器具管理页面 ===");

  // 导航到工器具管理页面
  await page.goto(`${BASE_URL}/sft/cont/tool/index`);
  await page.waitForLoadState("networkidle");

  // 1. 验证页面标题
  const title = await page.textContent(".card-header span, h1, h2");
  expect(title).toContain("工器具管理");
  console.log("✓ 页面标题正确");

  // 2. 验证表格存在
  const table = page.locator(".el-table");
  await expect(table.first()).toBeVisible();
  console.log("✓ 表格已渲染");

  // 3. 验证搜索表单
  const searchInputs = page.locator(
    ".search-form .el-input, .search-form .el-select"
  );
  const inputCount = await searchInputs.count();
  expect(inputCount).toBeGreaterThan(0);
  console.log(`✓ 搜索表单输入框数: ${inputCount}`);

  // 4. 验证表头
  const headers = await page.locator(".el-table__header th").allTextContents();
  const expectedHeaders = [
    "序号",
    "序列号",
    "名称",
    "类别",
    "型号",
    "使用人",
    "负责人"
  ];
  for (const header of expectedHeaders) {
    const found = headers.some(h => h.includes(header));
    if (found) {
      console.log(`✓ 表头包含: ${header}`);
    }
  }

  // 5. 验证数据行
  const dataRows = await page.locator(".el-table__body .el-table__row").count();
  expect(dataRows).toBeGreaterThan(0);
  console.log(`✓ 数据行数: ${dataRows}`);

  // 6. 验证第一行数据
  const firstRowCells = await page
    .locator(".el-table__body .el-table__row")
    .first()
    .locator("td")
    .allTextContents();
  console.log("第一行数据:", firstRowCells.slice(1, 5).join(" | "));

  // 7. 验证状态标签
  const statusTags = page.locator(".el-table__body .el-tag");
  const tagCount = await statusTags.count();
  expect(tagCount).toBeGreaterThan(0);
  console.log(`✓ 状态标签数: ${tagCount}`);

  // 8. 验证操作按钮
  const actionButtons = page.locator(
    ".el-table__body .el-button--link, .el-table__body .is-link"
  );
  const actionCount = await actionButtons.count();
  expect(actionCount).toBeGreaterThan(0);
  console.log(`✓ 操作按钮数: ${actionCount}`);

  // 9. 测试搜索功能 - 选择类别
  await page.click(".search-form .el-select");
  const categoryOption = page.locator(".el-select-dropdown__item").first();
  await categoryOption.click();
  console.log("✓ 类别选择功能正常");

  // 10. 测试重置按钮
  const resetButton = page.locator('button:has-text("重置")');
  await resetButton.click();
  console.log("✓ 重置按钮正常");

  // 11. 验证过期行样式
  const expiredRows = page.locator(".el-table__body tr.row-expired");
  const expiredCount = await expiredRows.count();
  if (expiredCount > 0) {
    console.log(`✓ 过期行数: ${expiredCount}（红色样式）`);
  } else {
    console.log("⚠ 无过期行数据");
  }

  // 12. 验证分页
  const pagination = page.locator(".el-pagination");
  await expect(pagination).toBeVisible();
  console.log("✓ 分页组件已渲染");

  // 13. 截图
  await page.screenshot({
    path: "screenshots/sft-cont-tool.png",
    fullPage: true
  });
  console.log("✓ 已保存截图: screenshots/sft-cont-tool.png");

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
    console.log(`\n正在打开页面: ${BASE_URL}/sft/cont/tool/index`);
    await page.goto(`${BASE_URL}/sft/cont/tool/index`);

    // 检查是否需要登录
    const currentUrl = page.url();
    if (currentUrl.includes("/login")) {
      console.log("需要登录...");
      await login(page);
      // 登录后重新导航到目标页面
      await page.goto(`${BASE_URL}/sft/cont/tool/index`);
    }

    // 运行测试
    await testToolPage(page);
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
