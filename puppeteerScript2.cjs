const { default: puppeteer } = require("puppeteer");
const { default: startFlow } = require("lighthouse");
let counter = 1;
async function doLogin(page) {
  const IdfcURL = "https://app.pt-opt.idfcfirstbank.com/login";
  const submitButton = 'button[type="submit"]';
  const USER = { MOBILE: "9894224825", PASSWORD: "Idfc@2023" };
  const flow = await startFlow(page, { name: "IDFC First Bank" });
  await flow.navigate(IdfcURL, { stepName: "Cold Start" });
  // await flow.navigate(IdfcURL, {    //     stepName: 'Warm Start',    //     configContext: {    //         settingsOverrides: { disableStorageReset: true},    //     },    // });
  //  await flow.snapshot({stepName: "Login"});
  // await page.type(selector.id('input-email'), 'test1user@test.com');
  // await page.type(selector.id('input-password'), 'Mypassword@08');
  // console.log(`Entered user credentials`)    // await page.click(selector.type('input', 'submit'));
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
  // else {    //     await page.goto(context.url);    // }
  // close session for next run
  await browser.close();
  counter++;
}
setup();
module.exports = setup;
