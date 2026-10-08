# joseaeduru.github.io

Personal website of Jose Aeduru, Lead Oracle Cloud HCM Consultant. Built with [Astro](https://astro.build) and hosted on GitHub Pages.

## Run it

```bash
npm install
npm run dev
```

Then open http://localhost:4321.

## Where things are

| What | Where |
|---|---|
| Every fact on the site (roles, skills, certifications, contact) | `src/data/profile.mjs` |
| Blog posts | `src/content/blog/` (copy `post-template.md`) |
| Pages | `src/pages/` |
| Styles | `src/styles/global.css` |

## Before every push

Nothing to remember: a git hook (`.githooks/pre-push`, switched on by `npm install`) runs the full check before every push and blocks the push if it fails. To run it by hand:

```bash
npm run verify
```

It runs the tests, builds the site, and scans for content that must not be public:

- Public rules in `scripts/check-content.mjs`, applied to the built pages: no phone numbers, no em dashes, only the approved email address and LinkedIn URL.
- Private terms in `banned-terms.local.txt`, applied to the built pages and to every file in this repository, drafts and tests included. That file is kept off GitHub on purpose and must be saved as UTF-8. Without it, the check fails.

This repository is public. A draft post is hidden from the website, not from GitHub.

## Deploy

Pushing to `main` builds and deploys the site through `.github/workflows/deploy.yml`.
