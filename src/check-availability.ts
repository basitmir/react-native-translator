// In unit test, we can't check the actual translation result because webview is mocked
// so periodically check url, query-selector and acture result using puppteer.

import _ from 'lodash';
import puppeteer from 'puppeteer';
import translators from './translators';

// testing multi-line input
const input = `hi how are you


what is your name?
`;
// check only core words
const output1 = /안녕/;
const output2 = /이름/;

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--no-first-run',
      '--no-zygote',
      '--disable-gpu',
    ],
  });

  for (const translator of _.values(translators)) {
    const url = translator.toUrl('en', 'ko', input);
    const selector = translator.selector;

    const page = await browser.newPage();
    await page.goto(url, {waitUntil: 'domcontentloaded', timeout: 60000});

    let count = 0;
    const maxCount = 10;
    const delay = 1000;
    async function validate() {
      try {
        await page.waitForFunction(
          (sel: string) => {
            const el = document.querySelector(sel);
            return el && (el as HTMLElement).innerText.trim().length > 0;
          },
          {timeout: 30000},
          selector,
        );
        const element = await page.$(selector);
        if (!element) {
          throw new Error('Selector is not valid');
        }
        const result = await element.evaluate((el: any) => el.innerText);
        if (!output1.test(result)) {
          //@ts-ignore
          throw new Error('Translation failed for hello', {cause: {result}});
        }
        if (!output2.test(result)) {
          //@ts-ignore
          throw new Error('Translation failed for name', {cause: {result}});
        }
      } catch (error) {
        if (count >= maxCount) {
          throw error;
        }
        count++;
        await new Promise(resolve => setTimeout(resolve, delay));
        await validate();
      }
    }

    await validate();
    console.log(`✅ ${translator.selector} — OK`);

    await page.close();
  }

  console.log('\n✅ All translators available');
  await browser.close();
})();
