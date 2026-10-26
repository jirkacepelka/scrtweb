---
tags: [deployment]
---

# Vercel

The site is static HTML built by Astro, deployed with the `@astrojs/vercel` adapter. There are no servers or functions to maintain.

## First-time setup

1. Push the repository to GitHub (or GitLab/Bitbucket).
2. In Vercel: **Add New → Project → Import** the repository.
3. Vercel detects **Astro** automatically (also set in `vercel.json`). Leave the defaults:
   - Build command: `npm run build`
   - Output: handled by the adapter (`.vercel/output`)
   - Node version: 22.x or newer (Project Settings → General), matching `engines` in `package.json`
4. Environment variables (optional):
   - `SITE_URL`: canonical domain, used for sitemap, RSS and social previews. Defaults to `https://scrt.network`. Set it to the preview domain while testing on a temporary domain.
5. Deploy.

Or from the command line:

```bash
npx vercel        # preview deployment
npx vercel --prod # production
```

## How deploys work

- Every push to a branch → **preview deployment** with its own URL. Share it for review.
- Merge to `main` → **production**.
- A failing build (for example a blog post with a missing field) never reaches production; the previous version stays live.

## Redirects and vercel.json

- **Redirects** live in `redirects` in `astro.config.mjs` (old scrt.network URLs such as `/about/get-scrt`, `/ecosystem/wallets`, `/ecosystem/exchanges`, and renamed pages such as `/get-scrt` → `/scrt`). The Vercel adapter turns them into permanent (301) redirects in the deployment, and they work in `npm run dev` too. Add more as you find old links worth keeping:

```js
redirects: {
  "/old/path": "/new-path",
},
```

- **Security headers** on every response (nosniff, referrer policy, frame denial, permissions policy).
- **Long-term caching** for `/_astro/*` (hashed file names, safe to cache forever).

## Domain

When moving scrt.network to Vercel: Project → Settings → Domains → add `scrt.network` and `www.scrt.network`, then update DNS as Vercel instructs. Do the [[Launch checklist]] first.

## Scheduled rebuilds

Not needed today: all data is static. If live figures are added (price, APR) and fetched at build time, add a Vercel **Deploy Hook** and call it daily from a cron job (for example a GitHub Action).
