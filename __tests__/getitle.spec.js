const { Builder, By, Key, until } = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');
const chrome = require('selenium-webdriver/chrome');
const edge = require('selenium-webdriver/edge');
const fs = require('fs');
const util = require('util');
const sleep = util.promisify(setTimeout);
const config = require('./config.json');

describe('El Palacio de Hierro search', () => {
const seleniumGridUrl = config.seleniumGridUrl;
let driverFirefox;
let driverChrome;
let driverEdge;

 beforeAll(async () => {
 let options;
 options = new firefox.Options();
 if (config.headless) {
 options.headless();
 }
 driverFirefox = await new Builder()
 .forBrowser('firefox')
 .setFirefoxOptions(options)
 .usingServer(seleniumGridUrl)
 .build();

 options = new chrome.Options();
 if (config.headless) {
 options.headless();
 }
 driverChrome = await new Builder()
 .forBrowser('chrome')
 .setChromeOptions(options)
 .usingServer(seleniumGridUrl)
 .build();

 options = new edge.Options();
 if (config.headless) {
 options.headless();
 }
 driverEdge = await new Builder()
 .forBrowser('MicrosoftEdge')
 .setEdgeOptions(options)
 .usingServer(seleniumGridUrl)
 .build();
 },125000);

 test('search for a term and check meta tags title', async () => {
 const searchTerm = config.searchTerm;
 const url = config.urlDev;
 
 await driverFirefox.get(url);
 const searchFieldFirefox = await driverFirefox.findElement(By.name('q'));
 await searchFieldFirefox.sendKeys(searchTerm, Key.RETURN);

 await sleep(6000);
 
 await driverChrome.get(url);
 const searchFieldChrome = await driverChrome.findElement(By.name('q'));
 await searchFieldChrome.sendKeys(searchTerm, Key.RETURN);
 
 await sleep(6000);

 await driverEdge.get(url);
 const searchFieldEdge = await driverEdge.findElement(By.name('q'));
 await searchFieldEdge.sendKeys(searchTerm, Key.RETURN);

 await sleep(6000);

 const titleFirefox = await driverFirefox.getTitle();
 expect(titleFirefox).toBe('Encuentra lo Mejor en ropa mujer | El Palacio de Hierro');

 await sleep(6000);

 const titleChrome = await driverChrome.getTitle();
 expect(titleChrome).toBe('Encuentra lo Mejor en ropa mujer | El Palacio de Hierro');

 await sleep(6000);

 const titleEdge = await driverEdge.getTitle();
 expect(titleEdge).toBe('Encuentra lo Mejor en ropa mujer | El Palacio de Hierro');

 },60000);
 
});
