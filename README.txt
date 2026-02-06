Insta to Mastodon Reposter

This Node.js automation tool visits posts from specified Instagram accounts, takes a screenshot, and reposts it with a caption to a Mastodon account. It's designed to run daily and only repost content from the previous day.

Features

- Uses Patchwright — a drop-in replacement for Playwright with stealth patches to avoid bot detection
- Captures screenshots of Instagram posts instead of downloading media
- Filters for posts from yesterday only
- Reposts screenshot + caption to Mastodon
- Uses persistent browser data to reduce repeated logins
- Cron/launchd-compatible — can be automated daily

How to run

- Prerequisites: Node.js 20+, npm, Chrome installed (Playwright uses the system Chrome channel), and a writable `chrome-user-data/` directory in the repo (auto-created on first run).
- Install deps: `npm install`
- Create `.env` in the project root with:
  - `INSTA_USERNAME=...`
  - `INSTA_PASSWORD=...`
  - `URL=https://your-mastodon-instance`
  - `TOKEN=your-mastodon-access-token`
- Pick the Instagram accounts to scrape by editing `Pages.ts` (the `accounts` array).
- Run once: `npm start` (runs `Pages.ts` via ts-node with ESM loader).
- Alternative: `./run.sh` uses the pinned Node binary at `~/.nvm/versions/node/v20.17.0/bin/node`.
- Output: screenshots are created per-post (e.g., `6.png`) then removed after posting to Mastodon.

Automation

- Use cron or macOS launchd to call `npm start` (or `./run.sh`) once daily. Keep the `chrome-user-data` directory intact so login persists.
