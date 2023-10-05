const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

test('example test', async () => {
 const seleniumGridUrl = 'https://4444-seleniumhq-dockerseleni-0mq3svh89j5.ws-us97.gitpod.io/';
 let options;
 options = new chrome.Options();
 options.headless();
 const driver = await new Builder()
 .forBrowser('chrome')
 .setFirefoxOptions(options)
 .usingServer(seleniumGridUrl)
 .build();

 try {
 await driver.get('http://www.google.com/ncr');
 const title = await driver.getTitle();
 expect(title).toBe('Google');
 } finally {
 await driver.quit();
 }
});
