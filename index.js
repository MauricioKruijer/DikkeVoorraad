const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.bol.com/nl/p/tanden-schrobber-spul/9200000116834026/');

  await page.evaluate(() => {
    document.querySelector('#quantityDropdown > option').value = 500
    document.querySelector('#quantityDropdown > option').text = 500
    return document.querySelector('#quantityDropdown > option').value
  });
  await page.click('a[data-test=add-to-basket]');

  await page.screenshot({path: 'example.png'});
  await browser.close();
})();
