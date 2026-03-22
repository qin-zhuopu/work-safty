/**
 * 巡检记录管理页面 - 端到端测试
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
 * 测试巡检记录管理页面
 */
async function testRecordPage(page: Page): Promise<void> {
  console.log("\n=== 测试巡检记录管理页面 ===");

  // 导航到巡检记录页面
  await page.goto(`${BASE_URL}/sft/insp/record/index`);
  await page.waitForLoadState("networkidle");

  // 1. 验证页面标题
  const title = await page.textContent(".card-header span, h1, h2");
  expect(title).toContain("巡检记录管理");
  console.log("✓ 页面标题正确");

  // 2. 验证查询表单存在
  const queryForm = page.locator(".query-form");
  await expect(queryForm.first()).toBeVisible();
  console.log("✓ 查询表单已渲染");

  // 3. 验证日期选择器
  const datePickers = page.locator(".el-date-picker");
  const datePickerCount = await datePickers.count();
  expect(datePickerCount).toBeGreaterThanOrEqual(2);
  console.log("✓ 日期选择器已渲染");

  // 4. 验证巡检线路下拉框
  expect(
    await page
      .locator("select, .el-select")
      .filter({ hasText: /请选择巡检线路|巡检线路/ })
      .count()
  ).toBeGreaterThan(0);
  console.log("✓ 巡检线路选择器已渲染");

  // 5. 验证班组下拉框
  expect(
    await page
      .locator("select, .el-select")
      .filter({ hasText: /全部|甲|乙/ })
      .count()
  ).toBeGreaterThan(0);
  console.log("✓ 班组选择器已渲染");

  // 6. 验证状态下拉框
  expect(
    await page
      .locator("select, .el-select")
      .filter({ hasText: /全部|未巡检|指标异常/ })
      .count()
  ).toBeGreaterThan(0);
  console.log("✓ 状态选择器已渲染");

  // 7. 验证操作按钮
  const searchBtn = page.locator("button").filter({ hasText: "检索" });
  await expect(searchBtn.first()).toBeVisible();
  console.log("✓ 检索按钮已渲染");

  const resetBtn = page.locator("button").filter({ hasText: "重置" });
  await expect(resetBtn.first()).toBeVisible();
  console.log("✓ 重置按钮已渲染");

  const exportBtn = page.locator("button").filter({ hasText: "导出" });
  await expect(exportBtn.first()).toBeVisible();
  console.log("✓ 导出按钮已渲染");

  // 8. 验证表格存在
  const table = page.locator(".el-table");
  await expect(table.first()).toBeVisible();
  console.log("✓ 表格已渲染");

  // 9. 验证数据行
  const dataRows = await page.locator(".el-table__body .el-table__row").count();
  expect(dataRows).toBeGreaterThan(0);
  console.log(`✓ 数据行数: ${dataRows}`);

  // 10. 验证表头列
  const headers = await page.locator(".el-table__header th").allTextContents();
  const headerNames = headers.filter(h => h && h.trim());
  console.log("表头列:", headerNames.slice(0, 6).join(" | "));

  // 验证关键列存在
  const headerText = headers.join(" ");
  expect(headerText).toContain("计划日期");
  expect(headerText).toContain("巡检任务");
  expect(headerText).toContain("巡检点");
  console.log("✓ 表头列正确");

  // 11. 验证第一行数据
  const firstRowCells = await page
    .locator(".el-table__body .el-table__row")
    .first()
    .locator("td")
    .allTextContents();
  console.log("第一行数据:", firstRowCells.slice(0, 5).join(" | "));

  // 12. 验证状态标签
  const statusTags = page.locator(".el-tag");
  const tagCount = await statusTags.count();
  expect(tagCount).toBeGreaterThan(0);
  console.log(`✓ 状态标签数: ${tagCount}`);

  // 13. 验证指标数据按钮
  const quotaButtons = page.locator("button").filter({ hasText: /正常|异常/ });
  const quotaBtnCount = await quotaButtons.count();
  if (quotaBtnCount > 0) {
    console.log(`✓ 指标数据按钮数: ${quotaBtnCount}`);

    // 点击第一个指标数据按钮，测试弹窗
    await quotaButtons.first().click();
    const dialog = page
      .locator(".el-dialog")
      .filter({ hasText: "指标数据详情" });
    await expect(dialog.first()).toBeVisible({ timeout: 3000 });
    console.log("✓ 指标数据详情弹窗已打开");

    // 关闭弹窗
    const closeBtn = dialog.locator(".el-dialog__headerbtn").first();
    await closeBtn.click();
    await page.waitForTimeout(500);
  }

  // 14. 测试检索功能
  await searchBtn.first().click();
  await page.waitForTimeout(1000);
  console.log("✓ 检索功能已执行");

  // 15. 测试分页
  const pagination = page.locator(".el-pagination");
  if ((await pagination.count()) > 0) {
    await expect(pagination.first()).toBeVisible();
    console.log("✓ 分页组件已渲染");
  }

  // 16. 截图
  await page.screenshot({
    path: "screenshots/sft-insp-record.png",
    fullPage: true
  });
  console.log("✓ 已保存截图: screenshots/sft-insp-record.png");

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
    // 创建新页面
    page = await context.newPage();

    // 先打开目标页面
    console.log(`\n正在打开页面: ${BASE_URL}/sft/insp/record/index`);
    await page.goto(`${BASE_URL}/sft/insp/record/index`);

    // 检查是否需要登录
    const currentUrl = page.url();
    if (currentUrl.includes("/login")) {
      console.log("需要登录...");
      await login(page);
      // 登录后重新导航到目标页面
      await page.goto(`${BASE_URL}/sft/insp/record/index`);
    }

    // 运行测试
    await testRecordPage(page);
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
