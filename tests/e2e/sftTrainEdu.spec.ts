/**
 * 教育培训管理页面 - 端到端测试
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
 * 测试教育培训管理页面
 */
async function testEduPage(page: Page): Promise<void> {
  console.log("\n=== 测试教育培训管理页面 ===");

  // 设置控制台监听
  page.on("console", msg => {
    if (msg.type() === "error") {
      console.log("浏览器控制台错误:", msg.text());
    }
  });

  // 设置请求监听
  page.on("response", async response => {
    if (response.url().includes("/sft/train/edu")) {
      console.log("API 请求:", response.url(), "状态:", response.status());
      if (response.status() !== 200) {
        console.log("API 失败响应:", await response.text());
      }
    }
  });

  // 等待页面稳定
  await page.waitForTimeout(3000);

  // 检查当前 URL
  const currentUrl = page.url();
  console.log("当前 URL:", currentUrl);

  // 检查页面标题
  const pageTitle = await page.title();
  console.log("页面标题:", pageTitle);

  // 获取整个页面的 HTML
  const bodyHTML = await page.locator("body").innerHTML();
  console.log("body HTML 长度:", bodyHTML.length);
  console.log("HTML 包含 'el-card':", bodyHTML.includes("el-card"));
  console.log("HTML 包含 'el-table':", bodyHTML.includes("el-table"));
  console.log("HTML 包含 'el-button':", bodyHTML.includes("el-button"));

  // 获取 el-card 元素数量
  const cardCount = await page.locator(".el-card").count();
  console.log("el-card 元素数量:", cardCount);

  // 尝试找到输入框
  const allInputs = await page.locator("input").count();
  console.log("input 元素数量:", allInputs);

  // 获取页面上所有文本
  const pageText = await page.evaluate(() => document.body.innerText);
  console.log("页面文本:", pageText.substring(0, 500));

  // 先截图看看页面状态
  await page.screenshot({
    path: "screenshots/sft-train-edu-debug.png",
    fullPage: true
  });

  // 1. 验证页面标题
  expect(pageTitle).toContain("教育培训");
  console.log("✓ 页面标题正确");

  // 2. 验证搜索表单存在
  const searchInput = page.locator('input[placeholder*="标题"]');
  await expect(searchInput.first()).toBeVisible();
  console.log("✓ 搜索框存在");

  // 3. 验证按钮存在
  const searchBtn = page.locator('button:has-text("检索")');
  const resetBtn = page.locator('button:has-text("重置")');
  const addBtn = page.locator('button:has-text("添加")');
  await expect(searchBtn.first()).toBeVisible();
  await expect(resetBtn.first()).toBeVisible();
  await expect(addBtn.first()).toBeVisible();
  console.log("✓ 检索、重置、添加按钮存在");

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

  // 8. 测试搜索功能
  await searchInput.fill("双重预防");
  await page.waitForTimeout(500);
  await searchBtn.click();
  await page.waitForTimeout(500);
  console.log("✓ 搜索功能测试完成");

  // 9. 测试重置功能
  await resetBtn.click();
  await page.waitForTimeout(500);
  console.log("✓ 重置功能测试完成");

  // 10. 验证操作按钮存在
  const editBtns = page.locator(".el-table__body .el-button--primary");
  const deleteBtns = page.locator(".el-table__body .el-button--danger");
  const editCount = await editBtns.count();
  const deleteCount = await deleteBtns.count();
  expect(editCount).toBeGreaterThan(0);
  expect(deleteCount).toBeGreaterThan(0);
  console.log(`✓ 操作按钮数: 编辑=${editCount}, 删除=${deleteCount}`);

  // 11. 验证标签组件
  const tags = page.locator(".el-tag");
  const tagCount = await tags.count();
  expect(tagCount).toBeGreaterThan(0);
  console.log(`✓ 标签组件数: ${tagCount}`);

  // 12. 验证分页
  const pagination = page.locator(".el-pagination");
  if (await pagination.isVisible()) {
    console.log("✓ 分页组件存在");
  }

  // 13. 截图
  await page.screenshot({
    path: "screenshots/sft-train-edu.png",
    fullPage: true
  });
  console.log("✓ 已保存截图: screenshots/sft-train-edu.png");

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

    // 总是创建新标签页进行测试
    const context = browser.contexts()[0] || (await browser.newContext());
    console.log("创建新标签页进行测试");
    page = await context.newPage();
    await page.goto(`${BASE_URL}/sft/train/edu/index`);

    // 检查是否需要登录
    const currentUrl = page.url();
    if (currentUrl.includes("/login")) {
      console.log("需要登录...");
      await login(page);
      // 登录后重新导航到目标页面
      await page.goto(`${BASE_URL}/sft/train/edu/index`);
    }

    // 运行测试
    await testEduPage(page);
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
