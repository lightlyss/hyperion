import Puppeteer from 'puppeteer';

const URL = 'http://localhost:3000/';
const DEBUG = false;
let browser = null, page = null;

// Tools

const waitOn = async selector => {
  return page.waitForSelector(selector, {
    visible: true,
    timeout: 10*1000
  });
};

// Framework

beforeAll(async () => {
  jest.setTimeout(5*60*1000);
  browser = await Puppeteer.launch({headless: !DEBUG});
  page = await browser.newPage();
  return page.setViewport({
    width: 1280,
    height: 720,
    isLandscape: true
  });
});

afterAll(async () => {
  return browser.close();
});

// Test scenario

test('loads canvas', async () => {
  await page.goto(URL);
  await waitOn('canvas');
  expect(page.url()).toBe(URL);
});

test('accepts query strings', async () => {
  await page.goto(`${URL}?model=seele`);
  await waitOn('canvas');
  expect(page.url()).toBe(`${URL}?model=seele`);
});
