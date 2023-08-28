import fs from "fs";
import puppeteer from "puppeteer";
import lighthouse from "lighthouse";
import { startFlow } from "lighthouse";
//import { startFlow } from "lighthouse/lighthouse-core/fraggle-rock/api.js";
import desktopConfig from "lighthouse";
//import desktopConfig from "lighthouse/lighthouse-core/config/desktop-config.js";
(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ["--start-fullscreen"],
  });
  const IdfcURL = "https://app.pt-opt.idfcfirstbank.com/login";
  const submitButton = 'button[type="submit"]';
  const USER = { MOBILE: "9894224825", PASSWORD: "Idfc@2023" };
  const page = await browser.newPage();
  const flow = await startFlow(page);
  await flow.navigate(IdfcURL, { stepName: "Cold Start" });
  await flow.navigate(IdfcURL, {
    stepName: "Warm Start",
    configContext: { settingsOverrides: { disableStorageReset: true } },
  });
  await flow.snapshot({ stepName: "Login" });
  //Login enter mobile number
  await flow.startTimespan({ stepName: "Login-Mobile Number" });
  const inputMobileNumber = await page.$(
    'input[data-testid="phone-number-id"]'
  );
  await inputMobileNumber.type(USER.MOBILE);
  await page.click(submitButton);
  await page.waitForNavigation();
  await flow.endTimespan();
  //Login - Enter Password
  await flow.startTimespan({ stepName: "Login - Enter Password" });
  const inputPassword = await page.$('input[name="login-password-input"]');
  await inputPassword.type(USER.PASSWORD);
  await page.click(submitButton);
  await page.waitForNavigation({ waitUntil: ["load", "networkidle2"] });
  await flow.endTimespan();
  await flow.startTimespan({ stepName: "Landed on Dashboard" });
  await flow.endTimespan();
  await flow.startTimespan({ stepName: "Navigate to Accounts" });
  await page.waitForSelector('span[data-testid="Accounts"]');
  await page.click('span[data-testid="Accounts"]');
  //  await page.waitForNavigation({waitUntil: ["load","networkidle2"]});
  await flow.endTimespan();
  await flow.snapshot({ stepName: "Account Page" });
  await browser.close();
  const report = await flow.generateReport();
  fs.writeFileSync("reports/flow_report6.html", report);
})();
