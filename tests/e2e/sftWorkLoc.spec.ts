/**
 * 特殊工管理页面 - 端到端测试
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
 * 测试特殊工管理页面
 */
async function testLocPage(page: Page): Promise<void> {
  console.log("\n=== 测试特殊工管理页面 ===");

  await page.goto(`${BASE_URL}/sft/work/loc/index`);
  await page.waitForLoadState("networkidle");

  // 1. 验证页面标题
  const title = await page.textContent(".card-header span, h1, h2");
  expect(title).toContain("特殊工管理");
  console.log("✓ 页面标题正确");

  // 2. 验证表格存在
  const table = page.locator(".el-table");
  await expect(table.first()).toBeVisible();
  console.log("✓ 表格已渲染");

  // 3. 验证表头
  const headers = await page.locator(".el-table__header th").allTextContents();
  console.log("表头列:", headers.filter(h => h.trim()).slice(0, 6));

  // 4. 验证数据行
  const dataRows = await page.locator(".el-table__body .el-table__row").count();
  expect(dataRows).toBeGreaterThan(0);
  console.log(`✓ 数据行数: ${dataRows}`);

  // 5. 验证筛选条件
  const typeSelect = page.locator('label:has-text("报警类型")');
  await expect(typeSelect).toBeVisible();
  console.log("✓ 报警类型筛选存在");

  const statusSelect = page.locator('label:has-text("消警状态")');
  await expect(statusSelect).toBeVisible();
  console.log("✓ 消警状态筛选存在");

  // 6. 验证操作按钮
  const searchBtn = page.locator('button:has-text("检索")');
  await expect(searchBtn).toBeVisible();
  console.log("✓ 检索按钮存在");

  const resetBtn = page.locator('button:has-text("重置")');
  await expect(resetBtn).toBeVisible();
  console.log("✓ 重置按钮存在");

  const clearBtn = page.locator('.el-form button:has-text("消警")');
  await expect(clearBtn).toBeVisible();
  console.log("✓ 消警按钮存在");

  // 7. 验证消警状态标签
  const statusTags = page.locator(".el-tag");
  const tagCount = await statusTags.count();
  expect(tagCount).toBeGreaterThan(0);
  console.log(`✓ 消警状态标签数: ${tagCount}`);

  // 8. 验证分页器
  const pagination = page.locator(".el-pagination");
  if ((await pagination.count()) > 0) {
    console.log("✓ 分页器已渲染");
  }

  // 9. 截图
  await page.screenshot({
    path: "screenshots/sft-work-loc.png",
    fullPage: true
  });
  console.log("✓ 已保存截图: screenshots/sft-work-loc.png");

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

    console.log(`\n正在打开页面: ${BASE_URL}/sft/work/loc/index`);
    await page.goto(`${BASE_URL}/sft/work/loc/index`);

    const currentUrl = page.url();
    if (currentUrl.includes("/login")) {
      console.log("需要登录...");
      await login(page);
      await page.goto(`${BASE_URL}/sft/work/loc/index`);
    }

    await testLocPage(page);
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
