import { chromium } from "patchright";
import fs from "fs";
import https from "https";
import path from "path";
import "dotenv/config";
import { addToMastadon } from "./MastadonAPI.js";
import { Login } from "./Login.js";
import { Page } from "playwright";
import { PostFilter } from "./PostFilter.js";

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
  await Login(page);
  //Go to specific page using function parameter postURL.
  await page.goto(postURL);
  await page.waitForTimeout(2000);

  await PostFilter(page);

  // Close chrome browser.
  await context.close();
}

scrape("https://www.instagram.com/memezar/");
