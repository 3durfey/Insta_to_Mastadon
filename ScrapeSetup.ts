import { chromium } from "patchright";
import "dotenv/config";
import { Login } from "./Login.js";
import { PostFilter } from "./PostFilter.js";

export async function ScrapeSetup(postURL: string) {
  const userDataDir = "./chrome-user-data";
  try {
    const context = await chromium.launchPersistentContext(userDataDir, {
      channel: "chrome",
      headless: false,
      viewport: null,
    });
    const page = await context.newPage();
    await Login(page);
    await page.goto(postURL);
    await page.waitForTimeout(2000);
    await PostFilter(page);
    await context.close();
  } catch (error) {
    console.log("Error: ", error);
  }
}
