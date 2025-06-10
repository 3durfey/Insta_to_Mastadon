import { chromium } from "patchright";
import fs from "fs";
import https from "https";
import path from "path";
import "dotenv/config";
import { addToMastadon } from "./MastadonAPI.js";
import { Login } from "./Login.js";
import { Page } from "playwright";
import { DateCompare } from "./DateCompare.js";
async function scrape(postURL: string) {
  // Set where to store session info.
  const userDataDir = "./chrome-user-data";

  // For anti scraping use chrome and headless false.
  const context = await chromium.launchPersistentContext(userDataDir, {
    channel: "chrome",
    headless: false,
    viewport: null,
  });

  // Open new page.
  const page = await context.newPage();

  // Log into account if necessary.
  //Login(page);
  // Go to login.
  await page.goto("https://www.instagram.com/accounts/login/");
  // Print username in correct field.
  const username = process.env.INSTA_USERNAME;
  if (!username) {
    throw new Error("Env variable username not set");
  }
  const password = process.env.INSTA_PASSWORD;
  if (!password) {
    throw new Error("Env variable password not set");
  }

  // Logging in
  if (await page.getByRole("textbox", { name: "Username" }).isVisible()) {
    await page.getByRole("textbox", { name: "Username" }).fill(username);
    await page.getByLabel("Password").fill(password);
    await page.locator('button[type="submit"]').click();
  }
  // Wait for login to be finished.
  await page.waitForTimeout(5000);
  //Go to specific page using function parameter postURL.
  await page.goto(postURL);
  await page.waitForTimeout(2000);

  for (let x = 8; x < 30; ++x) {
    const main = page.getByRole("main").locator("a").nth(x);
    await main.click();
    await page.waitForTimeout(5000);
    const timeElement = page.locator("time");
    if (!timeElement) {
      continue;
    } else {
      const datetimeAttr: string | null = await timeElement.getAttribute(
        "datetime"
      );
      if (datetimeAttr) {
        if (DateCompare(datetimeAttr)) {
          await page.screenshot({ path: `${x}.png` });
        }
      }
    }
    await page.goBack();
  }

  // Close chrome browser.
  await context.close();
}

scrape("https://www.instagram.com/memezar/");
