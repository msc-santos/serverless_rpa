import puppeteer, { Browser, Page } from "puppeteer";

export class PuppeteerFactory {
  private browser: Browser | null = null;
  private page: Page | null = null;

  async initialize(): Promise<void> {
    this.browser = await puppeteer.launch();
    this.page = await this.browser.newPage();
  }

  async navigateTo(url: string): Promise<void> {
    if (!this.page) throw new Error("Page is not initialized");
    await this.page.goto(url);
  }

  async typeIntoInput(inputSelector: string, text: string): Promise<void> {
    if (!this.page) throw new Error("Page is not initialized");
    await this.page.type(inputSelector, text);
  }

  async clickButton(buttonSelector: string): Promise<void> {
    if (!this.page) throw new Error("Page is not initialized");
    await this.page.click(buttonSelector);
  }

  async getElementById(elementId: string): Promise<string | null> {
    if (!this.page) throw new Error("Page is not initialized");
    return await this.page.$eval(`#${elementId}`, (el) => el.textContent);
  }

  async getElementByClass(className: string): Promise<string | null> {
    if (!this.page) throw new Error("Page is not initialized");
    return await this.page.$eval(`.${className}`, (el) => el.textContent);
  }

  async takeScreenshotAsBase64(): Promise<string> {
    if (!this.page) throw new Error("Page is not initialized");
    const screenshotBuffer = await this.page.screenshot({ encoding: "base64" });
    return screenshotBuffer;
  }

  async close(): Promise<void> {
    if (this.browser) await this.browser.close();
  }
}
