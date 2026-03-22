/**
 * 防汛物资台账页面 - 端到端测试
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
 * 测试防汛物资台账页面
 */
async function testFpPage(page: Page): Promise<void> {
  console.log("\n=== 测试防汛物资台账页面 ===");

  // 导航到页面
  await page.goto(`${BASE_URL}/sft/emerresour/fp/index`);
  await page.waitForLoadState("networkidle");

  // 1. 验证页面标题
  const title = await page.textContent(".card-header span, h1, h2");
  expect(title).toContain("防汛物资台账");
  console.log("✓ 页面标题正确");

  // 2. 验证搜索表单存在
  const deptSelect = page.locator(".el-select");
  await expect(deptSelect.first()).toBeVisible();
  console.log("✓ 搜索表单已渲染");

  // 3. 验证操作按钮存在
  const buttons = [
    "查询",
    "重置",
    "添加",
    "下载模板",
    "导入",
    "导出",
    "维护记录",
    "删除"
  ];
  for (const btnText of buttons) {
    const btn = page.locator(`.el-button:has-text("${btnText}")`);
    const count = await btn.count();
    if (count > 0) {
      console.log(`✓ 按钮"${btnText}"存在`);
    } else {
      console.log(`⚠ 按钮"${btnText}"未找到`);
    }
  }

  // 4. 验证表格存在
  const table = page.locator(".el-table");
  await expect(table.first()).toBeVisible();
  console.log("✓ 表格已渲染");

  // 5. 验证表头
  const headers = await page.locator(".el-table__header th").allTextContents();
  console.log("表头列:", headers.filter(h => h.trim()).slice(0, 8));

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
  console.log("第一行数据:", firstRowCells.slice(0, 5).join(" | "));

  // 8. 验证操作列按钮
  const firstRowOps = page
    .locator(".el-table__body .el-table__row")
    .first()
    .locator(".el-button");
  const opCount = await firstRowOps.count();
  expect(opCount).toBeGreaterThanOrEqual(3);
  console.log(`✓ 操作列按钮数: ${opCount}`);

  // 9. 测试搜索功能
  console.log("\n测试搜索功能...");
  const searchInput = page.locator('input[placeholder*="请输入名称"]');
  await searchInput.first().fill("沙袋");
  await page.click('.el-button:has-text("查询")');
  await page.waitForTimeout(500);
  console.log("✓ 搜索操作完成");

  // 10. 测试重置功能
  console.log("\n测试重置功能...");
  await page.click('.el-button:has-text("重置")');
  await page.waitForTimeout(500);
  console.log("✓ 重置操作完成");

  // 11. 验证分页器
  const pagination = page.locator(".el-pagination");
  const pagCount = await pagination.count();
  if (pagCount > 0) {
    console.log("✓ 分页器已渲染");
  }

  // 12. 截图
  await page.screenshot({
    path: "screenshots/sft-emerresour-fp.png",
    fullPage: true
  });
  console.log("✓ 已保存截图: screenshots/sft-emerresour-fp.png");

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
    console.log(`\n正在打开页面: ${BASE_URL}/sft/emerresour/fp/index`);
    await page.goto(`${BASE_URL}/sft/emerresour/fp/index`);

    // 检查是否需要登录
    const currentUrl = page.url();
    if (currentUrl.includes("/login")) {
      console.log("需要登录...");
      await login(page);
      // 登录后重新导航到目标页面
      await page.goto(`${BASE_URL}/sft/emerresour/fp/index`);
    }

    // 运行测试
    await testFpPage(page);
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
