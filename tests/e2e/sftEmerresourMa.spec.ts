/**
 * 医疗救护台账页面 - 端到端测试
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
 * 测试医疗救护台账页面
 */
async function testMaPage(page: Page): Promise<void> {
  console.log("\n=== 测试医疗救护台账页面 ===");

  await page.goto(`${BASE_URL}/sft/emerresour/ma/index`);
  await page.waitForLoadState("networkidle");

  // 等待 Vue 应用加载完成
  await page.waitForTimeout(2000);

  // 1. 验证页面标题
  const title = await page.textContent(".card-header span, h1, h2");
  expect(title).toContain("医疗救护台账");
  console.log("✓ 页面标题正确");

  // 2. 验证表格存在
  const table = page.locator(".el-table");
  await expect(table.first()).toBeVisible();
  console.log("✓ 表格已渲染");

  // 3. 验证表头
  const headers = await page.locator(".el-table__header th").allTextContents();
  console.log("表头列:", headers.filter(h => h.trim()).slice(0, 6));
  expect(headers.some(h => h.includes("药品名称"))).toBeTruthy();

  // 4. 验证数据行
  const dataRows = await page.locator(".el-table__body .el-table__row").count();
  expect(dataRows).toBeGreaterThan(0);
  console.log(`✓ 数据行数: ${dataRows}`);

  // 5. 验证第一行数据
  const firstRowCells = await page
    .locator(".el-table__body .el-table__row")
    .first()
    .locator("td")
    .allTextContents();
  console.log("第一行数据:", firstRowCells.slice(0, 5).join(" | "));

  // 6. 验证查询表单元素
  const deptSelect = page.locator(".el-select, .el-tree-select");
  await expect(deptSelect.first()).toBeVisible();
  console.log("✓ 部门选择框存在");

  const fieldInput = page.locator('input[placeholder*="名称"]');
  await expect(fieldInput.first()).toBeVisible();
  console.log("✓ 药品名称输入框存在");

  // 7. 验证操作按钮
  const buttons = ["查询", "重置", "添加", "导入", "导出", "删除"];
  for (const btnText of buttons) {
    const button = page.locator(`.el-button:has-text("${btnText}")`);
    const count = await button.count();
    if (count > 0) {
      console.log(`✓ ${btnText}按钮存在`);
    }
  }

  // 8. 验证分页
  const pagination = page.locator(".el-pagination");
  await expect(pagination.first()).toBeVisible();
  console.log("✓ 分页组件存在");

  // 9. 验证操作列按钮
  const editBtn = page.locator(
    ".el-table__body .el-button--primary:has-text('编辑')"
  );
  const deleteBtn = page.locator(
    ".el-table__body .el-button--danger:has-text('删除')"
  );
  expect(await editBtn.count()).toBeGreaterThan(0);
  expect(await deleteBtn.count()).toBeGreaterThan(0);
  console.log("✓ 操作按钮存在");

  // 10. 截图
  await page.screenshot({
    path: "screenshots/sft-emerresour-ma.png",
    fullPage: true
  });
  console.log("✓ 已保存截图: screenshots/sft-emerresour-ma.png");

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

    console.log(`\n正在打开页面: ${BASE_URL}/sft/emerresour/ma/index`);
    await page.goto(`${BASE_URL}/sft/emerresour/ma/index`);

    const currentUrl = page.url();
    if (currentUrl.includes("/login")) {
      console.log("需要登录...");
      await login(page);
      await page.goto(`${BASE_URL}/sft/emerresour/ma/index`);
    }

    await testMaPage(page);
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
