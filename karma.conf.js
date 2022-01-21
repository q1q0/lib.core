// karma.conf.js
const path = require("path");

process.env.CHROME_BIN = require("puppeteer").executablePath();

module.exports = function(config) {
  config.set({
    browsers: ["ChromeHeadless"], // You may use 'ChromeCanary', 'Chromium' or any other supported browser

    // you can define custom flags
    customLaunchers: {
      ChromeHeadlessCI: {
        base: "ChromeHeadless",
        flags: ["--no-sandbox", "--disable-gpu"]
      }
    },

    plugins: [
      "karma-coverage-istanbul-reporter"
    ],

    reporters: [
      "coverage-istanbul"
    ],

    coverageIstanbuilReporter: {
      reports: [
        "html",
        "lcovonly",
        "text-summary"
      ],

      dir: path.join(__dirname, "coverage"),

      combineBrowserReports: true,

      skipFilesWithNoCoverage: true,

      "report-config": {
        html: {
          subdir: "html"
        }
      }
    }
  });
};
