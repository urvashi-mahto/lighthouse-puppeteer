import fs from "fs";
import lighthouse from "lighthouse";
import chromeLauncher from "chrome-launcher";
const chrome = await chromeLauncher.launch();
const options = {
  logLevel: "info",
  output: "html",
  onlyCategories: ["performance"],
  port: chrome.port,
};
const runnerResult = await lighthouse(
  "https://app.pt-opt.idfcfirstbank.com",
  options
);
// `.report` is the HTML report as a string
const reportHtml = runnerResult.report;
fs.writeFileSync("reports/lhreport.html", reportHtml);
// `.lhr` is the Lighthouse Result as a JS object
console.log("Report is done for", runnerResult.lhr.finalDisplayedUrl);
console.log(
  "Performance score was",
  runnerResult.lhr.categories.performance.score * 100
);
await chrome.kill();
