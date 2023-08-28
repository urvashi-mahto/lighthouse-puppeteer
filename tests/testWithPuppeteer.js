import fs from "fs";
import puppeteer from "puppeteer";
import lighthouse from "lighthouse";
(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 50,
    defaultViewport: null,
    args: ["--start-fullscreen"],
  });
  //console.log(await browser.version());
  const page = await browser.newPage();
  await page.goto("https://app.pt-opt.idfcfirstbank.com/login", {
    waitUntil: "load",
  });
  await page.waitForSelector('input[data-testid="phone-number-id"]');
  const phoneNumber = await page.$('input[data-testid="phone-number-id"]');
  await phoneNumber.type("9894224825");
  await page.click('button[type="submit"]');
  await page.waitForNavigation();
  const password = await page.$('input[name="login-password-input"]');
  await password.type("Idfc@2023");
  await page.click('button[type="submit"]');
  await page.waitForNavigation();
  // await page.pdf({path: 'pdfs/report.pdf', format: 'A4'});
  // await page.waitForSelector('span[data-testid="Accounts"]');
  // await page.click('span[data-testid="Accounts"]');
  // await page.waitForResponse();// const cookieSet = await page.cookies();
  //console.log(cookieSet);// await page.setCookie({
  //     url: 'https://app.pt-opt.idfcfirstbank.com/account',
  //   });
  const url = "https://app.pt-opt.idfcfirstbank.com/account";
  const result = await lighthouse(
    url,
    { disableStorageReset: true, output: "html" },
    undefined,
    page
  );
  await browser.close();
  //console.log(JSON.stringify(result.lhr, null, 2));
  const lightHouseReport = result.report;
  fs.writeFileSync("reports/lightHouseReport.html", lightHouseReport);
})();
