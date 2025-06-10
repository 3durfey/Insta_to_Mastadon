import { chromium } from "patchright";
import "dotenv/config";
import { Login } from "./Login.js";
import { PostFilter } from "./PostFilter.js";

export async function ScrapeSetup(postURL: string) {
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
  await Login(page);

  //Go to specific page using function parameter postURL.
  await page.goto(postURL);
  await page.waitForTimeout(2000);

  //Filter through posts and post to Mastadon those that are a day old.
  await PostFilter(page);

  // Close chrome browser.
  await context.close();
}
