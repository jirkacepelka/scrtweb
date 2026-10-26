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

`legacyPages` in `src/config/site.ts` links to three old pages. Once this site is on scrt.network those URLs will 404 unless handled:

- [ ] **Grants** (`/developers/grants/`): build a page, or link to an external grants page
- [ ] **SecretVM / confidential computing** (`/confidential-computing-layer/`): build a page (fits the planned apps/CVM section), or link to the docs
- [ ] **Privacy policy** (`/privacy/`): move the legal text to a page here
- [ ] Decide what to do with the other old URLs (media kit, Secret³ Foundation, builders, blog post URLs) and add redirects in `vercel.json`. See [[Vercel#vercel.json]]

## Technical

- [ ] Set `SITE_URL` on Vercel if the launch domain isn't `https://scrt.network`
- [ ] Add the domain in Vercel and switch DNS. See [[Vercel#Domain]]
- [ ] Decide on analytics (Vercel Web Analytics is privacy-friendly and cookie-free; it is off by default in `astro.config.mjs`)
- [ ] Test social previews (OG image) with a link preview tool after deploying
- [ ] After the first deploy, check the security headers from `vercel.json` are served (`curl -I https://<domain>/` should show `X-Frame-Options`, `Referrer-Policy`…). They are not part of the adapter's build output, so confirm Vercel applies them
- [ ] Check the redirects work on the deployed site: `/get-scrt`, `/about/get-scrt`, `/ecosystem/exchanges`, `/ecosystem/wallets`
