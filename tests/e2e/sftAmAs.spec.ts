/**
 * 外部事故共享管理 - 端到端测试
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
 * 测试外部事故共享管理页面
 */
async function testAmAsPage(page: Page): Promise<void> {
  console.log("\n=== 测试外部事故共享管理页面 ===");

  await page.goto(`${BASE_URL}/sft/am/as/index`);
  await page.waitForLoadState("networkidle");

  // 1. 验证页面标题
  const title = await page.textContent(".card-header span, h1, h2");
  expect(title).toContain("外部事故共享管理");
  console.log("✓ 页面标题正确");

  // 2. 验证搜索表单存在
  const nameInput = page.locator('input[placeholder*="事故名称"]');
  await expect(nameInput.first()).toBeVisible();
  console.log("✓ 搜索表单已渲染");

  // 3. 验证操作按钮
  const buttons = {
    search: page.locator('button:has-text("查询")'),
    reset: page.locator('button:has-text("重置")'),
    add: page.locator('button:has-text("添加")'),
    export: page.locator('button:has-text("导出")'),
    delete: page.locator('button:has-text("删除")')
  };

  for (const [_key, button] of Object.entries(buttons)) {
    await expect(button.first()).toBeVisible();
  }
  console.log("✓ 操作按钮已渲染");

  // 4. 验证表格存在
  const table = page.locator(".el-table");
  await expect(table.first()).toBeVisible();
  console.log("✓ 表格已渲染");

  // 5. 验证表头
  const headers = await page.locator(".el-table__header th").allTextContents();
  const expectedHeaders = [
    "序号",
    "事故名称",
    "事故类型",
    "事故相关资料",
    "查看人数",
    "关联培训",
    "上传时间",
    "操作"
  ];
  for (const header of expectedHeaders) {
    const found = headers.some(h => h.includes(header));
    expect(found).toBe(true);
  }
  console.log("✓ 表头正确");

  // 6. 验证数据行
  const dataRows = await page.locator(".el-table__body .el-table__row").count();
  expect(dataRows).toBeGreaterThan(0);
  console.log(`✓ 数据行数: ${dataRows}`);

  // 7. 验证第一行数据
  const firstRowCells = await page
    .locator(".el-table__body .el-table__row")
    .first()
    .locator("td")
    .allTextContents();
  console.log("第一行数据:", firstRowCells.slice(0, 4).join(" | "));

  // 8. 测试搜索功能
  await nameInput.first().fill("爆炸");
  await page.click('button:has-text("查询")');
  await page.waitForTimeout(500);
  const filteredRows = await page
    .locator(".el-table__body .el-table__row")
    .count();
  console.log(`✓ 搜索后数据行数: ${filteredRows}`);

  // 9. 测试重置功能
  await page.click('button:has-text("重置")');
  await page.waitForTimeout(500);
  const nameValue = await nameInput.first().inputValue();
  expect(nameValue).toBe("");
  console.log("✓ 重置功能正常");

  // 10. 验证分页
  const pagination = page.locator(".el-pagination");
  await expect(pagination.first()).toBeVisible();
  console.log("✓ 分页组件已渲染");

  // 11. 截图
  await page.screenshot({ path: "screenshots/sft-am-as.png", fullPage: true });
  console.log("✓ 已保存截图: screenshots/sft-am-as.png");

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

    console.log(`\n正在打开页面: ${BASE_URL}/sft/am/as/index`);
    await page.goto(`${BASE_URL}/sft/am/as/index`);

    const currentUrl = page.url();
    if (currentUrl.includes("/login")) {
      console.log("需要登录...");
      await login(page);
      await page.goto(`${BASE_URL}/sft/am/as/index`);
    }

    await testAmAsPage(page);
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
