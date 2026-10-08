---
title: "Post template (draft, never published)"
description: "Copy this file, give it a new name, and set draft to false when the post is ready."
pubDate: 2026-10-07
draft: true
---

This file is a starting point for new posts. It stays a draft, so it never appears on the website.

A draft is hidden from the website only. This repository is public, so the text of a draft can still be read on GitHub as soon as it is pushed. Write every draft as if it were already published.

## How to write a post

1. Copy this file inside `src/content/blog/` and name it after the topic, for example `redwood-regression-plan.md`. The file name becomes the web address.
2. Change the title, description and date at the top. Keep the field names exactly as they are; a misspelled one stops the build.
3. Write the post below the second line of three dashes, in Markdown.
4. Set `draft: false` when it is ready.
5. Push. The full check runs by itself before every push and blocks it if any file, draft or not, contains something that should not be public. To run it by hand: `npm run verify`.

## Rules for every post

- Only facts that are already in the resume or on LinkedIn.
- No client-internal problems, no people or candidate names, no vendor details of work that is still in progress.
- Plain words, US spelling.
