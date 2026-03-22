/**
 * 特殊作业移动监测监控页面 - 端到端测试
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
 * 测试监控页面
 */
async function testMonitorPage(page: Page): Promise<void> {
  console.log("\n=== 测试特殊作业移动监测监控页面 ===");

  // 导航到监控页面
  await page.goto(`${BASE_URL}/sft/work/doc/monitor`);
  await page.waitForLoadState("networkidle");

  // 1. 验证页面标题
  const title = await page.textContent(".card-header span, h1, h2");
  expect(title).toContain("特殊作业移动监测监控");
  console.log("✓ 页面标题正确");

  // 2. 验证屏幕切换按钮存在
  const mode4Btn = page.locator('button:has-text("2x2屏")');
  const mode9Btn = page.locator('button:has-text("3x3屏")');
  await expect(mode4Btn).toBeVisible();
  await expect(mode9Btn).toBeVisible();
  console.log("✓ 屏幕切换按钮存在");

  // 3. 验证设备列表存在
  const deviceList = page.locator(".device-list");
  await expect(deviceList).toBeVisible();
  console.log("✓ 设备列表已渲染");

  // 4. 验证视频播放区域存在
  const videoArea = page.locator(".video-area");
  await expect(videoArea).toBeVisible();
  console.log("✓ 视频播放区域已渲染");

  // 5. 验证设备列表项
  const deviceItems = await page.locator(".device-item").count();
  expect(deviceItems).toBeGreaterThan(0);
  console.log(`✓ 设备列表项数: ${deviceItems}`);

  // 6. 验证视频单元格数量（默认2x2屏）
  const videoCells = await page.locator(".video-cell").count();
  expect(videoCells).toBe(4);
  console.log(`✓ 视频单元格数: ${videoCells}`);

  // 7. 验证在线/离线状态标签
  const onlineStatus = page.locator(".device-status.online");
  const offlineStatus = page.locator(".device-status.offline");
  const onlineCount = await onlineStatus.count();
  const offlineCount = await offlineStatus.count();
  console.log(`✓ 在线设备: ${onlineCount}, 离线设备: ${offlineCount}`);

  // 8. 测试切换到3x3屏
  await mode9Btn.click();
  await page.waitForTimeout(500);
  const videoCells9 = await page.locator(".video-cell").count();
  expect(videoCells9).toBe(9);
  console.log("✓ 切换到3x3屏成功");

  // 9. 测试切换回2x2屏
  await mode4Btn.click();
  await page.waitForTimeout(500);
  const videoCells4 = await page.locator(".video-cell").count();
  expect(videoCells4).toBe(4);
  console.log("✓ 切换回2x2屏成功");

  // 10. 验证服务器信息
  const serverInfo = page.locator(".server-info");
  const hasServerInfo = await serverInfo.count();
  if (hasServerInfo > 0) {
    console.log("✓ 服务器信息已显示");
  }

  // 11. 截图
  await page.screenshot({
    path: "screenshots/sft-work-doc-monitor.png",
    fullPage: true
  });
  console.log("✓ 已保存截图: screenshots/sft-work-doc-monitor.png");

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
    console.log(`\n正在打开页面: ${BASE_URL}/sft/work/doc/monitor`);
    await page.goto(`${BASE_URL}/sft/work/doc/monitor`);

    // 检查是否需要登录
    const currentUrl = page.url();
    if (currentUrl.includes("/login")) {
      console.log("需要登录...");
      await login(page);
      // 登录后重新导航到目标页面
      await page.goto(`${BASE_URL}/sft/work/doc/monitor`);
    }

    // 运行测试
    await testMonitorPage(page);
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
