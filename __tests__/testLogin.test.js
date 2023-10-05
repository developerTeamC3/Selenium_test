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
 
  test('Loguin Palacio de Hierro DEMO', async () => {
    const urlLoguin = config.urlLoguinDev;
    
    await driver.get(urlLoguin);
    await sleep(10000);

    const mailDemoSinCompra = config.mailDemoSinCompra
    await driver.findElement(By.name("dwfrm_profile_login_email")).sendKeys(mailDemoSinCompra,Key.RETURN);
    expect(mailDemoSinCompra).toBe("german.mendoza72@gmail.com");
     
    const passDemoSinCompra = config.passDemoSinCompra
    await driver.findElement(By.name("dwfrm_profile_login_password")).sendKeys(passDemoSinCompra,Key.RETURN);
    expect(passDemoSinCompra).toBe("Pochoclo88");
  
    const btnSubmit = await driver. findElement(By.css('[type="submit"].b-login_form-btn')); 
    await btnSubmit.click();
    await sleep(10000);
    element = await driver.findElement(By.className("b-account_login-link m-single"));
    text = await element.getText();
    console.log("The text is: " + text);
    expect(text).toBe("BIENVENIDO, DOS-SIETE")

    // Tomar una captura de pantalla y guardarla en un archivo
  const screenshot = await driver.takeScreenshot();
  fs.writeFileSync('mi-captura.png', screenshot, 'base64');
     
  },70000);
});