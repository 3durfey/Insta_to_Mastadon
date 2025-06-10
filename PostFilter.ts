import { DateCompare } from "./DateCompare.js";
import { addToMastadon } from "./MastadonAPI.js";
import { unlink } from "fs/promises";

// @ts-ignore
export async function PostFilter(page) {
  for (let x = 8; x < 20; ++x) {
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
          addToMastadon(`${x}.png`, "");
          await page.waitForTimeout(2000);
          await unlink(`${x}.png`);
        }
      }
    }
    await page.goBack();
  }
}
