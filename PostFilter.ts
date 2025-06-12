/**
 * Filters Instagram posts by publication date and publishes matching posts to Mastodon.
 *
 * This function performs the following steps:
 * 1. Loops through a range of Instagram posts on a specified page.
 * 2. Clicks on each post to view its details.
 * 3. Checks whether a <time> element is present in the post.
 *    (Due to the difficulty of scraping Instagram, this implementation loops through all <a> tags starting at index 6.
 *    This accounts for extra links in a user's profile, such as bio links, which may appear before actual posts.)
 * 4. If the <time> element contains a valid `datetime` attribute (it must then be a post), and it passes the `DateCompare` check:
 *    - Takes a screenshot of the post.
 *    - Saves it as a PNG file.
 *    - Uploads it to Mastodon via `addToMastadon`.
 *    - Waits briefly, then deletes the screenshot file.
 * 5. Returns to the original post feed to continue processing the next post.
 *
 * @param {import('@playwright/test').Page} page - The Playwright page instance.
 * @param {string} postURL - The URL of the Instagram feed or profile from which to filter posts.
 *
 * @returns {Promise<void>} A promise that resolves when all posts have been processed.
 *
 * @throws {Error} May throw if any issues occur during element selection, navigation, or file handling.
 */
import { DateCompare } from "./DateCompare.js";
import { addToMastadon } from "./MastadonAPI.js";
import { unlink } from "fs/promises";

// @ts-ignore
export async function PostFilter(page, postURL) {
  for (let x = 6; x < 20; ++x) {
    try {
      const main = page.getByRole("main").locator("a").nth(x);
      await main.click();
      await page.waitForTimeout(5000);
      const timeElement = page.locator("time");
      if ((await timeElement.count()) > 0) {
        const datetimeAttr: string = await timeElement.getAttribute("datetime");
        if (DateCompare(datetimeAttr)) {
          await page.screenshot({ path: `${x}.png` });
          addToMastadon(`${x}.png`, "");
          await page.waitForTimeout(2000);
          await unlink(`${x}.png`);
        }
      }
    } catch (error) {
      console.log(error);
    }
    await page.goto(postURL);
  }
}
