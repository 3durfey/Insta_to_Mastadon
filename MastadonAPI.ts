/**
 * Uploads an image and posts a status to a Mastodon account.
 *
 * This function uses the `masto` client to:
 * 1. Read an image file from the local filesystem.
 * 2. Upload it to Mastodon as a media attachment.
 * 3. Create a new public status that includes the uploaded image.
 *
 * Environment variables `URL` and `TOKEN` must be defined in a `.env` file or runtime environment:
 * - `URL`: The base URL of the Mastodon instance (e.g., "https://mastodon.social").
 * - `TOKEN`: The access token for the Mastodon API.
 *
 * @param {string} imageURL - The file path to the image to upload (e.g., "0.png").
 * @param {string} statusText - The text content of the Mastodon status.
 *
 * @returns {Promise<void>} A promise that resolves once the status is posted.
 *
 * @throws {Error} If the image cannot be read or the Mastodon API request fails.
 */

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
  console.log("Posted item.");
}
