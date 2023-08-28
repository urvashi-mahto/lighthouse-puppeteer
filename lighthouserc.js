module.exports = {
  ci: {
    collect: {
      puppeteerScript: "tests/testWithLciAndTimeSpan.cjs",
      puppeteerLaunchOptions: {
        args: [
          "--allow-no-sandbox-job",
          "--allow-sandbox-debugging",
          "--no-sandbox",
          "--disable-gpu",
          "--disable-gpu-sandbox",
          "--display",
        ],
      }, //https://www.puppeteersharp.com/api/PuppeteerSharp.LaunchOptions.html            
      numberOfRuns: 1,
      disableStorageReset: true,
      settings: {
        // Don't clear localStorage/IndexedDB/etc before loading the page.
        disableStorageReset: true,
        // Wait up to 60s for the page to load
        maxWaitForLoad: 60000,
        // Use applied throttling instead of simulated throttling
        throttlingMethod: "devtools",
      },
      url: ["https://app.pt-opt.idfcfirstbank.com"],
    },
    upload: {
      target: "filesystem",
      outputDir: "./lhci_reports_IDFC2",
      reportFilenamePattern: "%%PATHNAME%%-%%DATETIME%%-report.%%EXTENSION%%",
      // token: '',
      // serverBaseUrl: ''
    },
    assert: {
      assertions: {
        "categories:performance": ["error", { minScore: 1 }],
        "categories:accessibility": ["error", { minScore: 1 }],
        "categories:best-practices": ["error", { minScore: 1 }],
        "categories:seo": ["error", { minScore: 1 }],
      },
    },
  },
};
