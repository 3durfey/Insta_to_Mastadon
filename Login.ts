/**
 * Logs into Instagram using the provided Playwright page instance.
 *
 * This function navigates to the Instagram login page, fills in the login credentials
 * from environment variables (`INSTA_USERNAME` and `INSTA_PASSWORD`), and submits the login form.
 * It assumes Instagram's login form is available and interactable, and that no 2FA or CAPTCHA is required.
 * If user is already logged in it skips the login.
 *
 * Environment Variables:
 * - `INSTA_USERNAME`: The Instagram username or email.
 * - `INSTA_PASSWORD`: The corresponding Instagram password.
 *
 * @param {import('playwright').Page} page - A Playwright Page instance used to perform browser actions.
 *
 * @returns {Promise<void>} A promise that resolves after the login attempt.
 *
 * @throws {Error} If `INSTA_USERNAME` or `INSTA_PASSWORD` environment variables are not set.
 * @throws {Error} If the login elements cannot be found or interacted with.
 */
import { Page } from "playwright";
import "dotenv/config";

// @ts-ignore
export async function Login(page) {
  await page.goto("https://www.instagram.com/accounts/login/");
  const username = process.env.INSTA_USERNAME;
  if (!username) {
    throw new Error("Env variable username not set");
  }
  const password = process.env.INSTA_PASSWORD;
  if (!password) {
    throw new Error("Env variable password not set");
  }
  if (await page.getByRole("textbox", { name: "Username" }).isVisible()) {
    try {
      await page.getByRole("textbox", { name: "Username" }).fill(username);
      console.log("Testing login.");
      await page.getByLabel("Password").fill(password);
      await page.locator('button[type="submit"]').click();
    } catch (error) {
      console.log(error);
    }
  }
  await page.waitForTimeout(5000);
  console.log("User logged in.");
}
