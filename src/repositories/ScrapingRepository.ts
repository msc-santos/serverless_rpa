export interface ScrapingRepository {
  scrapeWebsite(url: string): Promise<void>;
  getElementTextById(elementId: string): Promise<string | null>;
  clickElement(selector: string): Promise<void>;
  typeIntoField(selector: string, text: string): Promise<void>;
  captureScreenshot(): Promise<string>;
  close(): Promise<void>;
}
