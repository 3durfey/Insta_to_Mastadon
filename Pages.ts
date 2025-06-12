import { ScrapeSetup } from "./ScrapeSetup.js";

let accounts: string[] = [
  "https://www.instagram.com/bikepartyindianapolis/",
  //"https://www.instagram.com/fuckjerry/",
];
for (let x = 0; x < accounts.length; x++) {
  ScrapeSetup(accounts[x]);
}
