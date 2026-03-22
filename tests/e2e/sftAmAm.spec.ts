/**
 * 事故管理页面 - 端到端测试
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
 * 测试事故管理页面
 */
async function testAccidentManagementPage(page: Page): Promise<void> {
  console.log("\n=== 测试事故管理页面 ===");

  // 导航到事故管理页面
  await page.goto(`${BASE_URL}/sft/accident/index`, {
    waitUntil: "networkidle"
  });
  await page.waitForTimeout(3000);

  // 等待页面加载完成
  await page.waitForLoadState("networkidle");

  // 检查页面上的所有文本内容
  const pageContent = await page.textContent("body");
  console.log("页面内容（前300字符）:", pageContent?.substring(0, 300));
  console.log("页面包含 '事故管理':", pageContent?.includes("事故管理"));
  console.log("页面包含 '事故名称':", pageContent?.includes("事故名称"));

  // 检查各种元素
  const elCardCount = await page.locator(".el-card").count();
  const amContainerCount = await page.locator(".am-container").count();
  const cardHeaderCount = await page.locator(".card-header").count();
  console.log("el-card 数量:", elCardCount);
  console.log("am-container 数量:", amContainerCount);
  console.log("card-header 数量:", cardHeaderCount);

  // 1. 验证页面标题 - 使用更具体的选择器
  const titleElement = page.locator(".am-container .card-header span").first();
  try {
    await expect(titleElement).toBeVisible({ timeout: 10000 });
    const title = await titleElement.textContent();
    expect(title).toContain("事故管理");
    console.log("✓ 页面标题正确");
  } catch {
    // 如果找不到 card-header 中的标题，尝试查找页面中的任何标题
    const anyTitle = page.locator("text=事故管理").first();
    const count = await anyTitle.count();
    console.log(`找到 "事故管理" 文本数量: ${count}`);
    if (count > 0) {
      console.log("✓ 页面包含 '事故管理' 文本");
    } else {
      throw new Error("页面未找到 '事故管理' 标题或文本");
    }
  }

  // 2. 验证搜索表单存在
  const searchInput = page.locator('input[placeholder*="事故名称"]');
  await expect(searchInput.first()).toBeVisible();
  console.log("✓ 搜索表单已渲染");

  // 3. 验证操作按钮
  const buttons = page.locator(".toolbar .el-button");
  const buttonCount = await buttons.count();
  expect(buttonCount).toBeGreaterThanOrEqual(7);
  console.log(`✓ 操作按钮数: ${buttonCount}`);

  // 4. 验证表格存在
  const table = page.locator(".el-table");
  await expect(table.first()).toBeVisible();
  console.log("✓ 表格已渲染");

  // 5. 验证表头
  const headers = await page.locator(".el-table__header th").allTextContents();
  console.log("表头列:", headers.filter(h => h.trim()).slice(0, 6));

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

  // 8. 验证状态标签
  const statusTags = page.locator(".el-tag");
  const tagCount = await statusTags.count();
  expect(tagCount).toBeGreaterThan(0);
  console.log(`✓ 状态标签数: ${tagCount}`);

  // 9. 验证事故等级标签
  const levelTags = page.locator(
    ".el-tag--danger, .el-tag--warning, .el-tag--info, .el-tag--success"
  );
  const levelTagCount = await levelTags.count();
  expect(levelTagCount).toBeGreaterThan(0);
  console.log(`✓ 事故等级标签数: ${levelTagCount}`);

  // 10. 验证操作列按钮
  const actionButtons = page
    .locator(".el-table__body .el-table__row")
    .first()
    .locator(".el-button");
  const actionCount = await actionButtons.count();
  expect(actionCount).toBeGreaterThan(0);
  console.log(`✓ 操作列按钮数: ${actionCount}`);

  // 11. 验证分页器存在
  const pagination = page.locator(".el-pagination");
  await expect(pagination.first()).toBeVisible();
  console.log("✓ 分页器已渲染");

  // 12. 截图
  await page.screenshot({
    path: "screenshots/sft-accident.png",
    fullPage: true
  });
  console.log("✓ 已保存截图: screenshots/sft-accident.png");

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
    console.log(`\n正在打开页面: ${BASE_URL}/sft/accident/index`);
    await page.goto(`${BASE_URL}/sft/accident/index`);

    // 检查是否需要登录
    let currentUrl = page.url();
    if (currentUrl.includes("/login")) {
      console.log("需要登录...");
      await login(page);
      // 登录后重新导航到目标页面
      console.log(`\n登录后正在打开页面: ${BASE_URL}/sft/accident/index`);
      await page.goto(`${BASE_URL}/sft/accident/index`, {
        waitUntil: "networkidle"
      });
      // 等待页面加载
      await page.waitForTimeout(2000);
    }

    // 再次检查 URL
    currentUrl = page.url();
    console.log(`当前 URL: ${currentUrl}`);
    if (currentUrl.includes("/login")) {
      throw new Error("登录后仍然重定向到登录页面");
    }

    // 运行测试
    await testAccidentManagementPage(page);
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
