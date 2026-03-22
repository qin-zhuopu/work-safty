/**
 * 隐患管理页面 - 端到端测试
 * 使用 Playwright CDP 连接已有的 Chrome 实例
 */

import { chromium, type Page } from "playwright";
import { expect } from "@playwright/test";

const DEFAULT_CDP_PORT = 9223;
const BASE_URL = "http://localhost:8848";

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
 * 测试隐患管理页面
 */
async function testDangerPage(page: Page): Promise<void> {
  console.log("\n=== 测试隐患管理页面 ===");

  // 导航到目标页面
  await page.goto(`${BASE_URL}/sft/danger/danger/index`);

  // 等待页面加载
  await page.waitForLoadState("domcontentloaded", { timeout: 10000 });
  await page.waitForTimeout(3000);

  // 1. 验证页面 URL
  expect(page.url()).toContain("/sft/danger/danger/index");
  console.log("✓ 页面 URL 正确");

  // 2. 验证页面标题
  const title = await page.title();
  expect(title).toContain("隐患管理");
  console.log("✓ 页面标题正确");

  // 3. 验证页面有一些内容
  const body = page.locator("body");
  await expect(body).toBeAttached();
  console.log("✓ 页面 body 存在");

  // 4. 检查是否有输入框或按钮
  const inputs = await page.locator("input").count();
  const buttons = await page.locator("button").count();
  console.log(`✓ 输入框数量: ${inputs}`);
  console.log(`✓ 按钮数量: ${buttons}`);

  // 5. 查找关键文本
  const hasText = await page.locator("text=隐患").count();
  console.log(`✓ 包含"隐患"的文本数量: ${hasText}`);

  // 6. 截图
  await page.screenshot({
    path: "screenshots/sft-danger-page.png",
    fullPage: true
  });
  console.log("✓ 已保存截图: screenshots/sft-danger-page.png");

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
    const context = browser.contexts()[0] || (await browser.newContext());
    page = await context.newPage();

    await testDangerPage(page);
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
