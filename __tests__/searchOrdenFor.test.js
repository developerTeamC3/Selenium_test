const { remote } = require('webdriverio');
const config = require('./config.json');

describe('El Palacio de Hierro search', () => {
  let browser;

  beforeAll(async () => {
    const browserName = config.browser || 'firefox';
    const options = {
      logLevel: 'error',
      capabilities: {
        browserName,
        'moz:firefoxOptions': {
          args: config.headless ? ['-headless'] : [],
        },
        'goog:chromeOptions': {
          args: config.headless ? ['--headless'] : [],
        },
      },
    };
    browser = await remote(options);
  }, 70000);

  afterAll(async () => {
    await browser.deleteSession();
  });

  test('search for a term and check meta tags Robots index,follow', async () => {
    const searchTerm = config.searchTerm;
    const url = config.urlDev;
    await browser.url(url);
    const searchField = await browser.$('[name="q"]');
    await searchField.setValue(searchTerm);
    await searchField.keys('Enter');
    await browser.waitUntil(async () => {
      const resultElement = await browser.$('.b-results_found');
      const resultText = await resultElement.getText();
      const resultCount = parseInt(resultText.match(/\d+/)[0]);
      console.log('ResultCount: ' + resultCount);
      return resultCount === 6;
    }, 70000, 'Expected result count to be 6');
  }, 70000);
});