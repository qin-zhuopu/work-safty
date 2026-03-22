/**
 * 学习记录页面 - 端到端测试
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
 * 测试学习记录页面
 */
async function testLearnRecordPage(page: Page): Promise<void> {
  console.log("\n=== 测试学习记录页面 ===");

  // 导航到页面
  await page.goto(`${BASE_URL}/sft/train/pc/record/learn/index`);
  await page.waitForLoadState("networkidle");

  // 1. 验证页面标题
  const title = await page.textContent(".card-header span, h1, h2");
  expect(title).toContain("学习记录列表");
  console.log("✓ 页面标题正确");

  // 2. 验证表格存在
  const table = page.locator(".el-table");
  await expect(table.first()).toBeVisible();
  console.log("✓ 表格已渲染");

  // 3. 验证表头
  const headers = await page.locator(".el-table__header th").allTextContents();
  console.log(
    "表头列:",
    headers.filter(h => h.trim())
  );

  // 4. 等待数据加载
  await page.waitForTimeout(1000);

  // 5. 验证数据行
  const dataRows = await page.locator(".el-table__body .el-table__row").count();
  if (dataRows === 0) {
    // 检查是否有空数据提示
    const emptyText = await page.locator(".el-empty").count();
    if (emptyText > 0) {
      console.log("⚠ 数据为空，显示空状态");
    } else {
      console.log("⚠ 表格无数据行，请检查 Mock API 是否正确加载");
      console.log("   提示：可能需要重启开发服务器以加载新的 Mock 文件");
    }
  }
  expect(dataRows).toBeGreaterThan(0);
  console.log(`✓ 数据行数: ${dataRows}`);

  // 5. 验证第一行数据
  const firstRowCells = await page
    .locator(".el-table__body .el-table__row")
    .first()
    .locator("td")
    .allTextContents();
  console.log("第一行数据:", firstRowCells.join(" | "));

  // 6. 验证总学习时长显示
  const totalTimeTag = page.locator(".total-time .el-tag");
  const tagExists = await totalTimeTag.count();
  if (tagExists > 0) {
    const tagText = await totalTimeTag.textContent();
    expect(tagText).toContain("总学习时长");
    console.log(`✓ 总学习时长显示: ${tagText}`);
  }

  // 7. 截图
  await page.screenshot({
    path: "screenshots/sft-train-pc-record-learn.png",
    fullPage: true
  });
  console.log("✓ 已保存截图: screenshots/sft-train-pc-record-learn.png");

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
    console.log(`\n正在打开页面: ${BASE_URL}/sft/train/pc/record/learn/index`);
    await page.goto(`${BASE_URL}/sft/train/pc/record/learn/index`);

    // 检查是否需要登录
    const currentUrl = page.url();
    if (currentUrl.includes("/login")) {
      console.log("需要登录...");
      await login(page);
      // 登录后重新导航到目标页面
      await page.goto(`${BASE_URL}/sft/train/pc/record/learn/index`);
    }

    // 运行测试
    await testLearnRecordPage(page);
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
