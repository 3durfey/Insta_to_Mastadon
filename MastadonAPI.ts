import { createRestAPIClient } from "masto";
import "dotenv/config";
import fs from "node:fs";

export async function addToMastadon(imageURL: string, statusText: string) {
  const masto = createRestAPIClient({
    url: process.env.URL as string,
    accessToken: process.env.TOKEN,
  });
  const attachment1 = await masto.v2.media.create({
    file: new Blob([fs.readFileSync(imageURL)]),
    description: "Some image",
  });
  const status = await masto.v1.statuses.create({
    status: statusText,
    visibility: "public",
    mediaIds: [attachment1.id],
  });
}
