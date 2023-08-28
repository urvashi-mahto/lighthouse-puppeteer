const { default: puppeteer } = require("puppeteer");
let counter = 1;
const selector = {
  class(attribute, className) {
    return `${attribute}[class='${className}']`;
  },
  type(attribute, value) {
    return `${attribute}[type='${value}']`;
  },
  id(value) {
    return `#${value}`;
  },
};
async function doLogin(page) {
  const loginUrl = "https://app.pt-opt.idfcfirstbank.com/login";
  await page.waitForTimeout(2000);
  await page.goto(loginUrl);
  await page.waitForSelector('input[data-testid="phone-number-id"]');
  const phoneNumber = await page.$('input[data-testid="phone-number-id"]');
  await phoneNumber.type("9894224825");
  await page.click('button[type="submit"]');
  await page.waitForNavigation();
  const password = await page.$('input[name="login-password-input"]');
  await password.type("Idfc@2023");
  await page.click('button[type="submit"]');
  // await page.type(selector.id('input-email'), 'test1user@test.com');
  // await page.type(selector.id('input-password'), 'Mypassword@08');
  // console.log(`Entered user credentials`)
  // await page.click(selector.type('input', 'submit'));
  console.log(`Login is successful`);
}
async function setup(browser, context) {
  // launch browser for LHCI
  console.log(browser);
  console.log("Entered setup block", counter);
  browser = await puppeteer.launch({ headless: false, slowMo: 50 });
  console.log(browser);
  page = await browser.newPage();
  await page.setCacheEnabled(true);
  //console.log("context url",context.url);
  if (counter === 1) {
    await doLogin(page);
  }
  // else {
  //     await page.goto(context.url);    // }
  // close session for next run
  await browser.close();
  counter++;
}
setup();
module.exports = setup;
