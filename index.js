const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: true
  });
  const page = await browser.newPage();
  page.setViewport({
    width: 800,
    height: 800
  });

  await page.goto('https://www.bol.com/nl/p/tanden-schrobber-spul/9200000116834026/');
  await page.click('a[data-test=add-to-basket]');

  page.on('console', consoleObj => console.log(consoleObj.text()));
  await Promise.all([
    page.waitForNavigation(),
    page.goto('https://www.bol.com/nl/order/basket.html'),
  ])

  await Promise.all([
    page.waitForNavigation(),
    page.$eval('.shopping-cart__row form', form => {
      const input = document.createElement('input');
      input.value = 500;
      input.innerText = "500";
      input.name = 'quantity'
      form.appendChild(input)
    }),
    page.$eval('.shopping-cart__row form', form => form.submit())
  ])

  await page.screenshot({path: 'example.png'});
  await browser.close();
})();
