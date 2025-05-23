import { createRestAPIClient } from "masto";
import "dotenv/config";
import fs from "node:fs";

const masto = createRestAPIClient({
  url: process.env.URL,
  accessToken: process.env.TOKEN,
});

// Create media from a local file
const attachment1 = await masto.v2.media.create({
  file: new Blob([fs.readFileSync("dog.jpeg")]),
  description: "Some image",
});

// Publish!
const status = await masto.v1.statuses.create({
  status: "Hello from #mastojs!",
  visibility: "public",
  mediaIds: [attachment1.id],
});

console.log(status);
