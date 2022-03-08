import puppeteer from "puppeteer";
import type { Browser, Page } from "puppeteer";
import lighthouse from "lighthouse";
import * as fs from "fs";
import * as path from "path";

const SPOTIFY_USER_NAME = process.env.SPOTIFY_USER_NAME;
const SPOTIFY_PASSWORD = process.env.SPOTIFY_PASSWORD;

const SPOTIFY_EDITOR_URL = process.env.SPOTIFY_EDITOR_URL;
const PR_NUMBER = process.env.PR_NUMBER;
const PORT = 8041;
const REPORTS_DIR = path.join(__dirname, "reports");

async function main(): Promise<void> {
  if (SPOTIFY_USER_NAME === undefined) {
    throw new Error("Please set SPOTIFY_USER_NAME");
  }
  if (SPOTIFY_PASSWORD === undefined) {
    throw new Error("Please set SPOTIFY_PASSWORD");
  }
  if (SPOTIFY_EDITOR_URL === undefined) {
    throw new Error("Please set SPOTIFY_EDITOR_URL");
  }
  if (PR_NUMBER === undefined) {
    throw new Error("Please set PR_NUMBER");
  }

  let browser: Browser | undefined;
  let newPage: Page | undefined;
  try {
    browser = await puppeteer.launch({
      headless: true,
      args: [`--remote-debugging-port=${PORT}`],
    });
    newPage = await browser.newPage();
    console.log("goto / ...");
    await newPage.goto(SPOTIFY_EDITOR_URL);
    await newPage.waitForNetworkIdle();
    await newPage.click("button");
    console.log("click the first button ...");
    await newPage.waitForNavigation();
    await newPage.click("button");
    console.log("click the second button ...");
    await newPage.waitForNavigation();
    await newPage.type("#login-username", SPOTIFY_USER_NAME);
    await newPage.type("#login-password", SPOTIFY_PASSWORD);
    await newPage.click("#login-button");
    console.log("click the third button ...");
    await newPage.waitForNavigation({
      timeout: 60_000,
      waitUntil: "domcontentloaded",
    });
    console.log("navigated to a authenticated page ...");

    const lhOptions = { logLevel: "info", output: "html", port: PORT };
    const lhConfig = {
      extends: "lighthouse:default",
      settings: {
        formFactor: "desktop",
        screenEmulation: {
          mobile: false,
          width: 1920,
          height: 1080,
        },
        throttling: {
          rttMs: 40,
          throughputKbps: 10 * 1024,
          cpuSlowdownMultiplier: 1,
          requestLatencyMs: 0,
          downloadThroughputKbps: 0,
          uploadThroughputKbps: 0,
        },
      },
    };
    const result = await lighthouse(newPage.url(), lhOptions, lhConfig);
    if (!fs.existsSync(REPORTS_DIR)) {
      fs.mkdirSync(REPORTS_DIR);
    }
    fs.writeFileSync(path.join(REPORTS_DIR, `pr${PR_NUMBER}_report.html`), result.report);
  } catch (error) {
    if (newPage !== undefined) {
      await newPage.screenshot({ path: path.join(REPORTS_DIR, "error.png") });
    }
    console.error(error);
  } finally {
    await browser?.close();
  }
}

(async () => {
  await main();
})();
