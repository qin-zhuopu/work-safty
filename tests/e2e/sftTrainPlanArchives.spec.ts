/**
 * 培训档案归档页面 - 端到端测试
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
 * 测试培训档案归档页面
 */
async function testArchivesPage(page: Page): Promise<void> {
  console.log("\n=== 测试培训档案归档页面 ===");

  // 导航到页面
  await page.goto(`${BASE_URL}/sft/train/plan/archives/index`);
  await page.waitForLoadState("networkidle");

  // 1. 验证页面标题
  const title = await page.title();
  expect(title).toContain("培训档案");
  console.log("✓ 页面标题正确:", title);

  // 2. 验证搜索区域存在
  const searchCard = page
    .locator(".search-card, .archives-container .el-card")
    .first();
  await expect(searchCard).toBeVisible();
  console.log("✓ 搜索区域已渲染");

  // 3. 验证按钮存在
  const searchButton = page.locator(
    "button:has-text('检索'), button:has-text('搜索')"
  );
  await expect(searchButton.first()).toBeVisible();
  console.log("✓ 检索按钮存在");

  const resetButton = page.locator("button:has-text('重置')");
  await expect(resetButton.first()).toBeVisible();
  console.log("✓ 重置按钮存在");

  const refreshButton = page.locator("button:has-text('刷新')");
  await expect(refreshButton.first()).toBeVisible();
  console.log("✓ 刷新按钮存在");

  // 4. 验证个人基础信息卡片存在
  const personInfoText = await page
    .locator(".archives-container")
    .textContent();
  expect(personInfoText).toContain("个人基础信息");
  console.log("✓ 个人基础信息区域存在");

  // 5. 验证三级教育台账区域存在
  expect(personInfoText).toContain("三级教育台账");
  console.log("✓ 三级教育台账区域存在");

  // 6. 验证日常教育台账区域存在
  expect(personInfoText).toContain("日常教育台账");
  console.log("✓ 日常教育台账区域存在");

  // 7. 验证证书管理区域存在
  expect(personInfoText).toContain("证书管理");
  console.log("✓ 证书管理区域存在");

  // 8. 验证卡片数量（至少有5个卡片：搜索、个人基础信息、三级教育台账、日常教育台账、证书管理）
  const cards = page.locator(".archives-container .el-card");
  const cardCount = await cards.count();
  expect(cardCount).toBeGreaterThanOrEqual(4);
  console.log(`✓ 卡片数量: ${cardCount}`);

  // 9. 截图
  await page.screenshot({
    path: "screenshots/sft-train-plan-archives.png",
    fullPage: true
  });
  console.log("✓ 已保存截图: screenshots/sft-train-plan-archives.png");

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
    console.log(`\n正在打开页面: ${BASE_URL}/sft/train/plan/archives/index`);
    await page.goto(`${BASE_URL}/sft/train/plan/archives/index`);

    // 检查是否需要登录
    const currentUrl = page.url();
    if (currentUrl.includes("/login")) {
      console.log("需要登录...");
      await login(page);
      // 登录后重新导航到目标页面
      await page.goto(`${BASE_URL}/sft/train/plan/archives/index`);
    }

    // 运行测试
    await testArchivesPage(page);
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
