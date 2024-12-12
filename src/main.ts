import { ScrapingService } from "src/services/ScrapingService";
import { PuppeteerFactory } from "src/factories/PuppeteerFactory";

export const handler = async (event: any) => {
  const { url, actions } = event;

  if (!url || !Array.isArray(actions) || actions.length === 0) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: "A URL e pelo menos uma ação são obrigatórias.",
      }),
    };
  }

  // Inicializa o PuppeteerFactory e o ScrapingService
  const puppeteerFactory = new PuppeteerFactory();
  const scrapingService = new ScrapingService(puppeteerFactory);

  try {
    await scrapingService.scrapeWebsite(url);

    const results = [];
    for (const action of actions) {
      const { actionType, elementId, selector, text, elementClass } = action;

      switch (actionType) {
        case "getElementTextById":
          if (!elementId) {
            results.push({
              actionType,
              error: "O ID do elemento é obrigatório para esta ação.",
            });
            break;
          }
          const textById = await scrapingService.getElementTextById(elementId);
          results.push({ actionType, elementId, result: textById });
          break;

        case "getElementTextByClass":
          if (!elementClass) {
            results.push({
              actionType,
              error: "A classe do elemento é obrigatório para esta ação.",
            });
            break;
          }
          const textByClass = await scrapingService.getElementTextByClass(
            elementClass
          );
          results.push({ actionType, elementClass, result: textByClass });
          break;

        case "clickElement":
          if (!selector) {
            results.push({
              actionType,
              error: "O seletor é obrigatório para esta ação.",
            });
            break;
          }
          await scrapingService.clickElement(selector);
          results.push({ actionType, selector, result: "Elemento clicado." });
          break;

        case "typeIntoField":
          if (!selector || !text) {
            results.push({
              actionType,
              error: "O seletor e o texto são obrigatórios para esta ação.",
            });
            break;
          }
          await scrapingService.typeIntoField(selector, text);
          results.push({ actionType, selector, result: "Texto inserido." });
          break;

        case "captureScreenshot":
          const screenshotBase64 = await scrapingService.captureScreenshot();
          results.push({ actionType, result: screenshotBase64 });
          break;

        default:
          results.push({
            actionType,
            error: `Ação desconhecida: ${actionType}`,
          });
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ results }),
    };
  } catch (error: any) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  } finally {
    // Fecha o navegador controlado pelo Puppeteer
    await scrapingService.close();
  }
};
