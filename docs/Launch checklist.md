---
tags: [launch, todo]
---

# Launch checklist

Before this site replaces the current scrt.network.

## Content

- [ ] Review the roadmap figures and `roadmapAsOf` right before launch. See [[Roadmap items]]
- [ ] Review the three starter blog posts, or migrate the existing posts from the old blog. See [[How to write a blog post]]
- [ ] Confirm the **Live / Coming soon** status of each card in the homepage "What you can do on Secret" grid (`src/pages/index.astro`, `features`)
- [ ] Confirm the partner list (`src/data/partners.ts`) is current and approved
- [ ] Re-check network figures and update `statsAsOf`. See [[Editing data#Network figures]]
- [ ] Verify the YouTube channel URL in `src/config/site.ts`

## Pages that exist only on the old site

`legacyPages` in `src/config/site.ts` now links only to the privacy policy. Once this site is on scrt.network those URLs will 404 unless handled:

- [x] **Grants**: built as `/grants`, redirect from `/developers/grants/` (2026-10-26)
- [x] **Confidential computing** (`/confidential-computing-layer/`): covered by `/secret-2`, redirect added
- [x] **Media kit** (`/media-package/`) → `/brand`, **Secret³ Foundation** (`/about/secret-network-foundation/`) → `/foundation`: pages built, redirects added in `astro.config.mjs`
- [ ] Ask the foundation to confirm the copy on `/foundation`, `/grants` and `/community` (it only restates the old site; no team names or grant sizes were published there)
- [ ] **Privacy policy** (`/privacy/`): move the legal text to a page here
- [ ] Decide what to do with the other old URLs (media kit, Secret³ Foundation, builders, blog post URLs) and add redirects in `vercel.json`. See [[Vercel#vercel.json]]

## Technical

- [ ] Set `SITE_URL` on Vercel if the launch domain isn't `https://scrt.network`
- [ ] Add the domain in Vercel and switch DNS. See [[Vercel#Domain]]
- [ ] Decide on analytics (Vercel Web Analytics is privacy-friendly and cookie-free; it is off by default in `astro.config.mjs`)
- [ ] Test social previews (OG image) with a link preview tool after deploying
- [x] Security headers from `vercel.json` are served (verified on scrtweb.vercel.app, 2026-10-26). Re-check once on the final domain
- [x] Redirects work on the deployed site (`/get-scrt`, `/about/get-scrt`, `/ecosystem/exchanges`, `/ecosystem/wallets` all return 301; verified 2026-10-26)
