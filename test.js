const { Builder, By, Key, until, FirefoxOptions} = require('selenium-webdriver');
const { expect } = require('jest');

describe('El Palacio de Hierro', () => {
  const TIMEOUT = 10000;
  let driver;

  beforeAll(async () => {
    // Definir la ruta del ejecutable de Firefox
    const options = new FirefoxOptions().setBinary('C:\\Driver');

    // Inicializar el driver de Selenium
    driver = await new Builder().forBrowser('firefox').setFirefoxOptions(options).build();
  });

  afterAll(async () => {
    // Cerrar el driver de Selenium
    await driver.quit();
  });

  test('debería mostrar el título correcto', async () => {
    // Cargar la página de El Palacio de Hierro
    await driver.get('https://www.elpalaciodehierro.com');

    // Obtener el título de la página
    const title = await driver.getTitle();

    // Comprobar que el título es correcto
    expect(title).toBe('El Palacio de Hierro | Tu estilo de vida');
  }, TIMEOUT);
});
