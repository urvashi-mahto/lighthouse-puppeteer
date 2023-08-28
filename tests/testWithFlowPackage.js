import fs from "fs";
import open from "open";
import puppeteer from "puppeteer";
import { startFlow } from "lighthouse/lighthouse-core/fraggle-rock/api.js";
async function captureReport() {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ["--start-fullscreen"],
  });
  const page = await browser.newPage();
  // Get a session handle to be able to send protocol commands to the page.
  const session = await page.target().createCDPSession();
  const testUrl = "https://app.pt-opt.idfcfirstbank.com/login";
  const flow = await startFlow(page, { name: "Login Dashboard Flow" });
  // Regular Lighthouse navigation.
  await flow.navigate(testUrl, { stepName: "Enter Phone Number" });
  await page.goto(testUrl, { waitUntil: "networkidle2" });
  await page.waitForSelector('input[data-testid="phone-number-id"]');
  const phoneNumber = await page.$('input[data-testid="phone-number-id"]');
  await phoneNumber.type("9894224825");
  await page.click('button[type="submit"]');
  await page.waitForNavigation();
  await flow.snapshot({ stepName: "Enter Password" });
  const password = await page.$('input[name="login-password-input"]');
  await password.type("Idfc@2023");
  await page.click('button[type="submit"]');
  await page.waitForNavigation();
  await flow.snapshot({ stepName: "DashboardLoaded" });
  await browser.close();
  const report = await flow.generateReport();
  fs.writeFileSync("reports/flow.report.html", report);
  // open('flow.report.html', {wait: false});
}
captureReport();
