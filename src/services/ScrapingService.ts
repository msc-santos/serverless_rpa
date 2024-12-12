import { PuppeteerFactory } from "src/factories/PuppeteerFactory";
import { ScrapingRepository } from "src/repositories/ScrapingRepository";

export class ScrapingService implements ScrapingRepository {
  private puppeteerFactory: PuppeteerFactory;

  constructor(puppeteerFactory: PuppeteerFactory) {
    this.puppeteerFactory = puppeteerFactory;
  }

  async scrapeWebsite(url: string): Promise<void> {
    await this.puppeteerFactory.initialize();
    await this.puppeteerFactory.navigateTo(url);
  }

  async getElementTextById(elementId: string): Promise<string | null> {
    return await this.puppeteerFactory.getElementById(elementId);
  }

  async getElementTextByClass(elementClass: string): Promise<string | null> {
    return await this.puppeteerFactory.getElementByClass(elementClass);
  }

  async clickElement(selector: string): Promise<void> {
    await this.puppeteerFactory.clickButton(selector);
  }

  async typeIntoField(selector: string, text: string): Promise<void> {
    await this.puppeteerFactory.typeIntoInput(selector, text);
  }

  async captureScreenshot(): Promise<string> {
    return await this.puppeteerFactory.takeScreenshotAsBase64();
  }

  async close(): Promise<void> {
    await this.puppeteerFactory.close();
  }
}
