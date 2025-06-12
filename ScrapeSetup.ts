/**
 * Initializes a Playwright Chromium browser session, logs into Instagram,
 * navigates to a specified post URL, and applies a filtering function to process recent posts.
 *
 * The function:
 * 1. Launches a persistent Chromium browser context using a local user data directory.
 * 2. Opens a new page and logs into Instagram using the `Login` function.
 * 3. Navigates to the given Instagram post URL.
 * 4. Waits for the page to settle.
 * 5. Calls `PostFilter` to find and process posts meeting date criteria.
 * 6. Closes the browser context.
 *
 * If any errors occur during the process, they are caught and printed to the console.
 *
 * @param {string} postURL - The Instagram profile or feed URL to scrape posts from.
 * @returns {Promise<void>} A promise that resolves once the scraping and filtering workflow completes.
 *
 * @throws {Error} Any error during browser launch, login, navigation, or post processing is logged.
 */

import { chromium } from "patchright";
import "dotenv/config";
import { Login } from "./Login.js";
import { PostFilter } from "./PostFilter.js";

export async function ScrapeSetup(postURL: string) {
  const userDataDir = "./chrome-user-data";
  try {
    const context = await chromium.launchPersistentContext(userDataDir, {
      channel: "chromium",
      headless: false,
      viewport: null,
    });
    const page = await context.newPage();
    await Login(page);
    await page.goto(postURL);
    await page.waitForTimeout(2000);
    await PostFilter(page, postURL);
    await context.close();
  } catch (error) {
    console.log("Error: ", error);
  }
}
