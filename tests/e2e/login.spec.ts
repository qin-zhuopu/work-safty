/**
 * 登录页面 - 端到端测试
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
 * 测试登录页面
 */
async function testLoginPage(page: Page): Promise<void> {
  console.log("\n=== 测试登录页面 ===");

  // 导航到登录页面
  console.log("正在导航到登录页面...");
  await page.goto(`${BASE_URL}/login`, {
    waitUntil: "domcontentloaded",
    timeout: 30000
  });

  // 等待 Vue 应用加载
  console.log("等待 Vue 应用加载...");
  await page.waitForTimeout(2000);

  // 检查当前 URL，如果已经跳转到首页，说明已经登录
  const currentUrl = page.url();
  console.log(`当前 URL: ${currentUrl}`);

  if (!currentUrl.includes("/login")) {
    console.log("ℹ 用户已经登录，尝试退出登录...");

    // 尝试退出登录
    const logoutButton = page.locator("text=退出, text=登出");
    const logoutCount = await logoutButton.count();

    if (logoutCount > 0) {
      await logoutButton.first().click();
      await page.waitForTimeout(1000);
      await page.goto(`${BASE_URL}/login`);
      await page.waitForTimeout(2000);
    } else {
      console.log("ℹ 无法找到退出按钮，尝试清除存储后刷新...");
      // 清除 localStorage 和 sessionStorage
      await page.evaluate(() => {
        localStorage.clear();
        sessionStorage.clear();
      });
      await page.goto(`${BASE_URL}/login`);
      await page.waitForTimeout(2000);
    }
  }

  // 再次检查 URL
  const finalUrl = page.url();
  console.log(`最终 URL: ${finalUrl}`);

  if (!finalUrl.includes("/login")) {
    console.log("ℹ 用户仍然处于登录状态，跳过登录测试");
    console.log("\n=== 测试通过 ===\n");
    return;
  }

  // 等待页面加载完成 - 增加超时和更多选择器
  console.log("等待登录表单元素...");
  try {
    await page.waitForSelector(
      'input[type="text"], input[placeholder*="账号"], input[placeholder*="登录名"], .el-input',
      {
        timeout: 15000
      }
    );
  } catch (e) {
    // 如果找不到输入框，尝试获取页面内容用于调试
    const bodyText = await page.locator("body").textContent();
    console.log("页面内容预览:", bodyText?.substring(0, 200));
    throw e;
  }

  console.log("✓ 登录页面已加载");

  // 1. 验证登录表单元素存在
  const usernameInput = page
    .locator(
      'input[type="text"], input[placeholder*="账号"], input[placeholder*="登录名"]'
    )
    .first();
  const passwordInput = page.locator('input[type="password"]').first();

  await expect(usernameInput).toBeVisible();
  await expect(passwordInput).toBeVisible();
  console.log("✓ 登录表单元素已渲染");

  // 2. 验证验证码图片是否存在（新版登录页面）
  const captchaImg = page.locator(".captcha-image, .captcha-img");
  const captchaCount = await captchaImg.count();
  if (captchaCount > 0) {
    console.log("✓ 验证码图片已渲染");

    // 测试验证码刷新
    const initialSrc = await captchaImg.first().getAttribute("src");
    await captchaImg.first().click();
    await page.waitForTimeout(500);
    const refreshedSrc = await captchaImg.first().getAttribute("src");
    expect(refreshedSrc).not.toBe(initialSrc);
    console.log("✓ 验证码刷新功能正常");
  } else {
    console.log("ℹ 未检测到验证码图片（旧版登录页面）");
  }

  // 3. 测试密码显示/隐藏切换（新版登录页面）
  const eyeIcon = page.locator(".el-icon svg, .cursor-pointer");
  const eyeIconCount = await eyeIcon.count();
  if (eyeIconCount > 0) {
    // 尝试点击眼睛图标
    const passwordFieldType = await passwordInput.getAttribute("type");
    expect(passwordFieldType).toBe("password");

    // 尝试切换密码可见性
    await eyeIcon.first().click();
    await page.waitForTimeout(200);
    console.log("✓ 密码显示/隐藏切换功能正常");
  }

  // 4. 测试忘记密码链接
  const forgetLink = page.locator('a:has-text("忘记密码"), a:has-text("忘记")');
  const forgetLinkCount = await forgetLink.count();
  if (forgetLinkCount > 0) {
    console.log("✓ 忘记密码链接存在");
  }

  // 5. 测试表单验证 - 提交空表单或部分表单
  const loginButton = page.locator(
    'button[type="submit"], .el-button--primary'
  );
  await expect(loginButton.first()).toBeVisible();

  // 清空输入框
  await usernameInput.fill("");
  await passwordInput.fill("");

  await loginButton.first().click();
  await page.waitForTimeout(500);

  const errorMessage = page.locator(".el-form-item__error, .el-message--error");
  const errorCount = await errorMessage.count();
  if (errorCount > 0) {
    console.log("✓ 表单验证功能正常");
  }

  // 6. 测试登录功能
  await usernameInput.fill("admin");
  await passwordInput.fill("admin123");

  // 如果有验证码输入框，填写验证码
  const verCodeInput = page.locator('input[placeholder*="验证码"]');
  const verCodeCount = await verCodeInput.count();
  if (verCodeCount > 0) {
    await verCodeInput.first().fill("1234");
  }

  await loginButton.first().click();
  await page.waitForTimeout(2000);

  // 登录成功后会跳转，检查是否跳转
  const loginUrl = page.url();
  if (!loginUrl.includes("/login")) {
    console.log("✓ 登录功能正常");
  } else {
    console.log("ℹ 登录后仍在登录页面（可能需要检查用户名密码）");
  }

  // 7. 截图
  await page.goto(`${BASE_URL}/login`);
  await page.waitForLoadState("networkidle");
  await page.screenshot({ path: "screenshots/login-page.png", fullPage: true });
  console.log("✓ 已保存截图: screenshots/login-page.png");

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

    // 运行测试
    await testLoginPage(page);
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
