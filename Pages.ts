/**
 * Instagram Scraper Runner
 *
 * This script imports and runs the `ScrapeSetup` function on a list of Instagram account URLs.
 * Each URL is passed individually to `ScrapeSetup`, which handles:
 *   - Logging into Instagram
 *   - Navigating to the account feed
 *   - Filtering and processing recent posts
 *
 * Accounts to scrape can be added to the `accounts` array.
 * Currently, the script runs sequentially through the list using a simple for-loop.
 *
 * @module InstaScraperRunner
 */
import { ScrapeSetup } from "./ScrapeSetup.js";

let accounts: string[] = [
  "https://www.instagram.com/bikepartyindianapolis/",
  //"https://www.instagram.com/fuckjerry/",
];
for (let x = 0; x < accounts.length; x++) {
  ScrapeSetup(accounts[x]);
}
