import { Page } from "playwright";
import "dotenv/config";

// @ts-ignore
export async function Login(page) {
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
}
