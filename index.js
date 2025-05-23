import { createRestAPIClient } from "masto";
import "dotenv/config"; // if using ES module syntax

const masto = createRestAPIClient({
  url: process.env.URL,
  accessToken: process.env.TOKEN,
});

const status = await masto.v1.statuses.create({
  status: "Hello from #mastojs!",
});

console.log(status.url);
