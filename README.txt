# 📸 Insta to Mastodon Reposter

This Node.js automation tool visits specific **Instagram posts**, takes a **screenshot**, and reposts it with a caption to a **Mastodon** account. It's designed to run daily and only repost content from the **previous day**.

## ✨ Features

- Uses [**Patchwright**](https://github.com/patchwright/patchwright) — a drop-in replacement for Playwright with stealth patches to avoid bot detection
- Captures **screenshots** of Instagram posts instead of downloading media
- Filters for posts from **yesterday** only
- Reposts screenshot + caption to **Mastodon**
- Uses persistent browser data to reduce repeated logins
- Cron/launchd-compatible — can be automated daily

