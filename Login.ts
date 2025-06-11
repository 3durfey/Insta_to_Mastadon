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
    await page.getByRole("textbox", { name: "Username" }).fill(username);
    await page.getByLabel("Password").fill(password);
    await page.locator('button[type="submit"]').click();
  }
  await page.waitForTimeout(5000);
}
