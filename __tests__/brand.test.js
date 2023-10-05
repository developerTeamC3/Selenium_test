const { Builder, By, Key, until } = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');
const chrome = require('selenium-webdriver/chrome');
const fs = require('fs');
const util = require('util');
const sleep = util.promisify(setTimeout);
const config = require('./config.json');

describe('El Palacio de Hierro search', () => {
  let driver;

  beforeAll(async () => {
    const browser = config.browser || 'firefox';
    let options;
    switch (browser) {
      case 'firefox':
        options = new firefox.Options();
        if (config.headless) {
            options.headless();
          }
        driver = await new Builder()
          .forBrowser('firefox')
          .setFirefoxOptions(options)
          .build();
        break;
      case 'chrome':
        options = new chrome.Options();
        options.headless();
        driver = await new Builder()
          .forBrowser('chrome')
          .setChromeOptions(options)
          .build();
        break;
      default:
        throw new Error(`Unsupported browser: ${browser}`);
      } });

  afterAll(async () => {
    await driver.quit();
  });
  test('search for a brand', async () => {
    const searchTerm = config.brand;
    const url = config.urlDemo;
    await driver.get(url);
    const searchField = await driver.findElement(By.name('q'));
    await searchField.sendKeys(searchTerm, Key.RETURN);
    await sleep(5000);
    
    const title = await driver.getTitle();
    expect(title).toBe(searchTerm);

    // Tomar una captura de pantalla y guardarla en un archivo
  const screenshot = await driver.takeScreenshot();
  fs.writeFileSync('mi-captura.png', screenshot, 'base64');
  
     
  },60000);
  test('search for a brand meta tags canonical', async () => {
    const searchTerm = config.brand;
    const url = config.urlDemo;
    await driver.get(url);
    const searchField = await driver.findElement(By.name('q'));
    await searchField.sendKeys(searchTerm, Key.RETURN);
    await sleep(5000);
       
  // Obtener el meta tag canónico
  const canonical = await driver.executeScript("return document.querySelector('link[rel=canonical]') ? document.querySelector('link[rel=canonical]').href : null");
  console.log(canonical);
  expect(canonical).toBe('https://bdkb-014.dx.commercecloud.salesforce.com/s/palacio-MX/marcas/michale-kors/');
     
  },60000);
});