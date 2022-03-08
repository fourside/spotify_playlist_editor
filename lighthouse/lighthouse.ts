import puppeteer from "puppeteer";
import type { Browser, Page } from "puppeteer";
// @ts-ignore
import lighthouse from "lighthouse";
import * as fs from "fs";

const SPOTIFY_USER_NAME = process.env.SPOTIFY_USER_NAME;
const SPOTIFY_PASSWORD = process.env.SPOTIFY_PASSWORD;

const SPOTIFY_EDITOR_URL = process.env.SPOTIFY_EDITOR_URL;
const PORT = 8041;

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

  let browser: Browser | undefined;
  let newPage: Page | undefined;
  try {
    browser = await puppeteer.launch({
      headless: false,
      args: [`--remote-debugging-port=${PORT}`],
    });
    newPage = await browser.newPage();
    await newPage.goto(`${SPOTIFY_EDITOR_URL}/`);
    await newPage.click("button");
    await newPage.waitForNavigation();
    await newPage.click("button");
    await newPage.waitForNavigation();
    await newPage.type("#login-username", SPOTIFY_USER_NAME);
    await newPage.type("#login-password", SPOTIFY_PASSWORD);
    await newPage.click("#login-button");
    await newPage.waitForNavigation();

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
    fs.writeFileSync("lighthouse.html", result.report);
  } catch (error) {
    console.error(error);
  } finally {
    await browser?.close();
  }
}

(async () => {
  await main();
})();
