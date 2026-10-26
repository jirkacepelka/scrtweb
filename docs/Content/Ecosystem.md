---
tags: [content]
---

# Ecosystem

The `/ecosystem` page, the orbiting icons in the homepage hero, the "Use private apps" step on the homepage and the Ecosystem card in the About menu all use one list of apps.

## Where the list comes from

The source of truth is the official **Secret dApp registry**, the same list that powers dash.scrt.network/apps: [SecretFoundation/DappRegistry](https://github.com/SecretFoundation/DappRegistry) (`dAppRegistry.json`).

To refresh it:

```bash
node scripts/sync-ecosystem.mjs
```

The script:

1. downloads `dAppRegistry.json`
2. downloads every icon and normalises it to an opaque 256px WebP square in `public/ecosystem/<slug>.webp`. Transparent logos go on a light or dark tile depending on the logo's brightness; Secret's own products get an orange brand tile
3. writes `src/data/ecosystem.generated.json`

Never edit the generated JSON by hand: the next sync overwrites it. Commit both the JSON and the icons.

**New app?** The team adds it to the registry repo (pull request there), then runs the sync here. The app also appears in the Secret Dashboard.

## Editorial choices: `src/data/ecosystem.ts`

| Setting          | What it does                                                                                                                                             |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `hidden`         | Slugs not shown on the site (currently the testnet faucet, and Mintscan, which is retiring)                                                              |
| `spotlightSlugs` | The four large cards at the top of `/ecosystem`                                                                                                          |
| `heroSlugs`      | Which icons orbit the homepage hero, in placement order (18 slots). The first 15 also fill the "Use private apps" step, the first 18 the About menu card |
| `overrides`      | Per-app fixes: nicer name, rewritten description, category                                                                                               |
| `appCategories`  | The filter chips on `/ecosystem`                                                                                                                         |

Categories come from registry tags (`Wallet` → Wallets, `DeFi` → DeFi, `NFTs`/`Data` → Data & NFTs, otherwise Network tools) unless an override sets one.

## Page behaviour

- Spotlight cards, then a filterable grid of every app. Filtering is a tiny inline script; without JS all apps show.
- Every app links to its own site in a new tab.
- A note says listings are not an endorsement. Keep it.
