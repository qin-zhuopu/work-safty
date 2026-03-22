/**
 * 事故奖惩页面 - 端到端测试
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
 * 设置认证令牌 - 直接设置 localStorage 和 Cookie 跳过登录
 */
async function authenticate(page: Page): Promise<void> {
  await page.goto(`${BASE_URL}/login`);

  // 设置必要的认证信息
  await page.evaluate(() => {
    // 设置 Cookie（需要 document.cookie）
    const tokenData = {
      accessToken: "eyJhbGciOiJIUzUxMiJ9.admin",
      refreshToken: "eyJhbGciOiJIUzUxMiJ9.adminRefresh",
      expires: "2030/10/30 00:00:00"
    };
    // 设置 Cookie
    document.cookie =
      "authorized-token=" + JSON.stringify(tokenData) + "; path=/";
    document.cookie = "multiple-tabs=true; path=/";

    // 设置 localStorage
    const userInfo = {
      accessToken: "eyJhbGciOiJIUzUxMiJ9.admin",
      refreshToken: "eyJhbGciOiJIUzUxMiJ9.adminRefresh",
      expires: 1735584000000, // 2030/10/30 的时间戳
      avatar: "https://avatars.githubusercontent.com/u/44761321",
      username: "admin",
      nickname: "管理员",
      roles: ["admin"],
      permissions: ["*:*:*"]
    };
    localStorage.setItem("user-info", JSON.stringify(userInfo));
  });

  // 刷新页面
  await page.reload();
  await page.waitForTimeout(1000);
}

/**
 * 测试事故奖惩页面
 */
async function testRewardPage(page: Page): Promise<void> {
  console.log("\n=== 测试事故奖惩页面 ===");

  // 导航到页面
  await page.goto(`${BASE_URL}/sft/am/reward/index`);
  await page.waitForLoadState("networkidle");
  await page.waitForTimeout(2000); // 额外等待确保 Vue 组件渲染

  // 调试：打印页面 URL 和部分内容
  console.log("当前 URL:", page.url());
  const bodyText = await page.locator("body").textContent();
  console.log("页面包含文本预览:", bodyText?.slice(0, 200));

  // 检查各种元素
  const elCardCount = await page.locator(".el-card").count();
  const cardHeaderCount = await page.locator(".card-header").count();
  console.log("el-card 数量:", elCardCount);
  console.log("card-header 数量:", cardHeaderCount);

  // 1. 验证页面标题 - 使用更健壮的选择器
  const titleElement = page
    .locator(".reward-container .card-header span")
    .first();
  try {
    await expect(titleElement).toBeVisible({ timeout: 10000 });
    const title = await titleElement.textContent();
    expect(title).toContain("事故奖惩");
    console.log("✓ 页面标题正确");
  } catch {
    // 如果找不到 card-header 中的标题，尝试查找页面中的任何标题
    const anyTitle = page.locator("text=事故奖惩").first();
    const count = await anyTitle.count();
    console.log(`找到 "事故奖惩" 文本数量: ${count}`);
    if (count > 0) {
      console.log("✓ 页面包含 '事故奖惩' 文本");
    } else {
      throw new Error("页面未找到 '事故奖惩' 标题或文本");
    }
  }

  // 2. 验证查询表单存在
  const nameInput = page.locator('input[placeholder*="事故名称"]');
  await expect(nameInput.first()).toBeVisible();
  console.log("✓ 事故名称输入框存在");

  const persInput = page.locator('input[placeholder*="奖惩人员"]');
  await expect(persInput.first()).toBeVisible();
  console.log("✓ 奖惩人员输入框存在");

  // 3. 验证操作按钮
  const searchBtn = page.locator("button:has-text('查询')");
  await expect(searchBtn.first()).toBeVisible();
  console.log("✓ 查询按钮存在");

  const resetBtn = page.locator("button:has-text('重置')");
  await expect(resetBtn.first()).toBeVisible();
  console.log("✓ 重置按钮存在");

  const addBtn = page.locator("button:has-text('添加')");
  await expect(addBtn.first()).toBeVisible();
  console.log("✓ 添加按钮存在");

  const exportBtn = page.locator("button:has-text('导出')");
  await expect(exportBtn.first()).toBeVisible();
  console.log("✓ 导出按钮存在");

  // 4. 验证表格存在
  const table = page.locator(".el-table");
  await expect(table.first()).toBeVisible();
  console.log("✓ 表格已渲染");

  // 5. 验证表头
  const headers = await page.locator(".el-table__header th").allTextContents();
  console.log("表头列:", headers.filter(h => h.trim()).slice(0, 5));

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

  // 8. 验证分页存在
  const pagination = page.locator(".el-pagination");
  const paginationCount = await pagination.count();
  if (paginationCount > 0) {
    console.log("✓ 分页组件存在");
  }

  // 9. 截图
  await page.screenshot({
    path: "screenshots/sft-am-reward.png",
    fullPage: true
  });
  console.log("✓ 已保存截图: screenshots/sft-am-reward.png");

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

    // 设置认证
    console.log("\n正在设置认证...");
    await authenticate(page);

    // 导航到目标页面
    console.log(`\n正在打开页面: ${BASE_URL}/sft/am/reward/index`);
    await page.goto(`${BASE_URL}/sft/am/reward/index`);

    // 运行测试
    await testRewardPage(page);
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
