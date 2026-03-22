/**
 * 承包商审批页面 - 端到端测试
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
 * 测试承包商审批页面
 */
async function testExaminePage(page: Page): Promise<void> {
  console.log("\n=== 测试承包商审批页面 ===");

  // 导航到页面
  await page.goto(`${BASE_URL}/sft/cont/manage/examinecont/index`);
  await page.waitForLoadState("networkidle");

  // 1. 验证页面标题
  const title = await page.textContent(".card-header span, h1, h2");
  expect(title).toContain("承包商审批");
  console.log("✓ 页面标题正确");

  // 2. 验证搜索表单存在
  const nameInput = page.locator('input[placeholder*="请输入名称"]');
  await expect(nameInput.first()).toBeVisible();
  console.log("✓ 名称输入框存在");

  // 3. 验证对接部门输入框
  const deptInput = page.locator('input[placeholder*="请输入对接部门"]');
  await expect(deptInput.first()).toBeVisible();
  console.log("✓ 对接部门输入框存在");

  // 4. 验证查询、重置按钮存在
  const searchButton = page.locator("button:has-text('查询')");
  const resetButton = page.locator("button:has-text('重置')");
  await expect(searchButton.first()).toBeVisible();
  await expect(resetButton.first()).toBeVisible();
  console.log("✓ 查询、重置按钮存在");

  // 5. 验证表格存在
  const table = page.locator(".el-table");
  await expect(table.first()).toBeVisible();
  console.log("✓ 表格已渲染");

  // 6. 验证表头
  const headers = await page.locator(".el-table__header th").allTextContents();
  console.log("表头列:", headers.filter(h => h.trim()).slice(0, 6));
  expect(headers.some(h => h.includes("承包商名称"))).toBeTruthy();
  expect(headers.some(h => h.includes("状态"))).toBeTruthy();
  expect(headers.some(h => h.includes("对接部门"))).toBeTruthy();
  console.log("✓ 表头正确");

  // 7. 验证数据行
  const dataRows = await page.locator(".el-table__body .el-table__row").count();
  expect(dataRows).toBeGreaterThan(0);
  console.log(`✓ 数据行数: ${dataRows}`);

  // 8. 验证第一行数据
  const firstRowCells = await page
    .locator(".el-table__body .el-table__row")
    .first()
    .locator("td")
    .allTextContents();
  console.log("第一行数据:", firstRowCells.slice(0, 4).join(" | "));

  // 9. 验证状态标签
  const statusTags = page.locator(".el-tag");
  const tagCount = await statusTags.count();
  expect(tagCount).toBeGreaterThan(0);
  console.log(`✓ 状态标签数: ${tagCount}`);

  // 10. 验证操作按钮
  const approvalButtons = page.locator("button:has-text('审批')");
  const fileButtons = page.locator("button:has-text('文件')");
  const personnelButtons = page.locator("button:has-text('人员')");
  const processButtons = page.locator("button:has-text('审批流')");

  const approvalCount = await approvalButtons.count();
  const fileCount = await fileButtons.count();
  const personnelCount = await personnelButtons.count();
  const processCount = await processButtons.count();

  console.log(`✓ 审批按钮数: ${approvalCount}`);
  console.log(`✓ 文件按钮数: ${fileCount}`);
  console.log(`✓ 人员按钮数: ${personnelCount}`);
  console.log(`✓ 审批流按钮数: ${processCount}`);

  // 11. 测试搜索功能
  await nameInput.fill("中建");
  await page.waitForTimeout(500);
  await searchButton.first().click();
  await page.waitForTimeout(500);
  console.log("✓ 搜索功能测试完成");

  // 12. 测试重置功能
  await resetButton.first().click();
  await page.waitForTimeout(500);
  console.log("✓ 重置功能测试完成");

  // 13. 测试分页
  const pagination = page.locator(".el-pagination");
  await expect(pagination.first()).toBeVisible();
  console.log("✓ 分页组件存在");

  // 14. 截图
  await page.screenshot({
    path: "screenshots/sft-cont-manage-examine.png",
    fullPage: true
  });
  console.log("✓ 已保存截图: screenshots/sft-cont-manage-examine.png");

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
    console.log(
      `\n正在打开页面: ${BASE_URL}/sft/cont/manage/examinecont/index`
    );
    await page.goto(`${BASE_URL}/sft/cont/manage/examinecont/index`);

    // 检查是否需要登录
    const currentUrl = page.url();
    if (currentUrl.includes("/login")) {
      console.log("需要登录...");
      await login(page);
      // 登录后重新导航到目标页面
      await page.goto(`${BASE_URL}/sft/cont/manage/examinecont/index`);
    }

    // 运行测试
    await testExaminePage(page);
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
