---
tags: [content]
---

# Editing data

Everything that isn't long-form text lives in typed TypeScript files. Edit the array, save, done. TypeScript (and `npm run check`) catches typos in field names.

| File                    | Controls                                                                                                                                     |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/config/site.ts`    | Site name, description, header nav, header button, footer columns, socials, shared external links, legacy links                              |
| `src/data/about.ts`     | Copy for /foundation, /community, /grants and /brand (roles, channels, governance steps, grant areas, logo files, brand colours, logo rules) |
| `src/data/secret2.ts`   | Copy for /secret-2: draft notice, how it works, impact per audience, known limits                                                            |
| `src/data/wallets.ts`   | Wallet cards on `/wallets`                                                                                                                   |
| `src/data/get-scrt.ts`  | Exchanges, card on-ramps, DEX and bridge ("Get SCRT" on `/scrt`)                                                                             |
| `src/data/stats.ts`     | Network and token figures (`/scrt`, `/staking`, governance figures on `/community`)                                                          |
| `src/data/builders.ts`  | Resources and feature list on `/builders`                                                                                                    |
| `src/data/partners.ts`  | Partner strip in the homepage hero                                                                                                           |
| `src/data/ecosystem.ts` | Editorial choices on top of the dApp registry, see [[Ecosystem]]                                                                             |
| `src/data/roadmap.ts`   | Roadmap intro, track names and `roadmapAsOf`; the components are in `src/content/roadmap.yaml`, see [[Roadmap items]]                        |

## Wallets

```ts
{
  name: "Keplr",
  href: "https://www.keplr.app/",
  description: "…one or two sentences…",
  platforms: ["Extension", "Mobile"],   // Extension | Mobile | Desktop | Hardware
  bestFor: "Most people",
  logo: "/logos/keplr.png",             // square PNG in public/logos/
  recommended: true,                    // shown large; use for one wallet only
}
```

Order in the array = order on the page.

## Exchanges and other ways to buy

In `get-scrt.ts`, each path (exchange, card, DEX, bridge) has a `venues` list. To add an exchange:

```ts
venues: [
  { name: "Kraken", href: "https://www.kraken.com/", logo: "/logos/kraken.png" },
  { name: "New Exchange", href: "https://…", logo: "/logos/new-exchange.png" },
],
```

Only list venues that actually support SCRT on the Secret network (not only a wrapped version), and link to the official domain.

## Network figures

`src/data/stats.ts` holds every number shown on the site, plus `statsAsOf`, the date they were read.

They come from the public mainnet API (chain `secret-4`). To refresh, query any public LCD endpoint, for example:

```bash
curl -s https://rest.lavenderfive.com:443/secretnetwork/cosmos/staking/v1beta1/params
curl -s https://rest.lavenderfive.com:443/secretnetwork/cosmos/slashing/v1beta1/params
curl -s https://rest.lavenderfive.com:443/secretnetwork/cosmos/gov/v1/params/tallying
curl -s "https://rest.lavenderfive.com:443/secretnetwork/cosmos/staking/v1beta1/validators?status=BOND_STATUS_BONDED&pagination.limit=200"
```

| Figure                       | Where it comes from                                                                                                 |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `unbondingDays`              | `unbonding_time` ÷ 86400 (1814400s = 21 days)                                                                       |
| `maxValidators`              | `max_validators`                                                                                                    |
| `activeValidators`           | number of bonded validators                                                                                         |
| `slashDoubleSignPercent`     | `slash_fraction_double_sign` × 100                                                                                  |
| `slashDowntimePercent`       | `slash_fraction_downtime` × 100                                                                                     |
| `downtimeJailMinutes`        | `downtime_jail_duration` ÷ 60                                                                                       |
| `votingPeriodDays`           | `voting_period` ÷ 86400                                                                                             |
| `quorumPercent`              | `quorum` × 100                                                                                                      |
| `token.totalSupply`          | `/cosmos/bank/v1beta1/supply/by_denom?denom=uscrt` ÷ 1,000,000                                                      |
| `token.staked`               | `bonded_tokens` from `/cosmos/staking/v1beta1/pool` ÷ 1,000,000                                                     |
| `token.inflationPercent`     | `/cosmos/mint/v1beta1/inflation` × 100                                                                              |
| `token.communityTaxPercent`  | `community_tax` from `/cosmos/distribution/v1beta1/params` × 100                                                    |
| `token.stakingRewardPercent` | `annual_provisions` (`/cosmos/mint/v1beta1/annual_provisions`) ÷ `bonded_tokens` × 100, before validator commission |
| `network.blockTimeSeconds`   | 31,536,000 ÷ `blocks_per_year` from `/cosmos/mint/v1beta1/params`                                                   |

The staked share is computed (`stakedPercent`). Third-party dashboards may show different inflation or APR figures; the site uses what the chain itself reports.

Update the numbers **and** `statsAsOf` together. Never put an estimated or rounded-up number on the site.

Live figures (price, APR) are deliberately not shown yet. If added later, fetch them at build time and rebuild daily on Vercel (see [[Vercel#Scheduled rebuilds]]).

## Partners

Add the logo first: download a monochrome SVG from Simple Icons into `public/partners/`:

```bash
curl -o public/partners/<slug>.svg https://cdn.simpleicons.org/<slug>/a3a3a3
```

Then add `{ name, slug }` to `partners.ts`. Only list real, current partners.

## Navigation, footer and social links

All in `src/config/site.ts`:

- `navGroups`: header dropdowns, built from `allNavGroups`. Each has an `intro` line, a `featured` card (`title`, `description`, `href`, `visual`: `dashboard` | `apps` | `code`) and `links` with a short `description` and an `icon` (`ph:*`). Up to six links fit. A group with `hidden: true` (currently **Provide**) is skipped everywhere until its page exists
- `links`: external destinations used in several places (docs, GitHub, bridge, whitepaper, media pack, contact email). Change a URL here once
- `navLinks`: plain header links after the dropdowns
- `headerActions`: the two header buttons
- `footerNav`: footer columns, generated from the visible `navGroups` (plus Dashboard, Blog and Explorer)
- `socialLinks`: footer icons (icon names from the Phosphor set, `ph:*`, browse at icones.js.org/collection/ph)
- `legacyPages`: links to pages that exist only on the old site. See [[Launch checklist]]

## Logos for wallets and exchanges

Wallets (`logo`, `logoOnLight`) and venues in `get-scrt.ts` (`logo`, `logoOnLight`) point to PNGs in `public/logos/`. Set `logoOnLight: true` when the logo is dark and would disappear on the dark site. See [[UI primitives#BrandIcon]] for how to download one.

The recommended wallet (`recommended: true`) is shown large at the top of `/wallets` with its `highlights` list (three short reasons). Use it for one wallet only.

Each way to buy in `get-scrt.ts` also has `goodIf`: one short line saying who that route suits.

## Secret 2.0 and the move to confidential machines

Secret 2.0 replaces Secret contracts (CosmWasm on validators) with confidential programs on confidential virtual machines (CVMs), and sSCRT with Secret Money. The design is a **draft that governance has not ratified**, so:

- Every page that mentions it says "planned" and links to `/secret-2`, which shows the draft notice (`draftNotice` in `src/data/secret2.ts`).
- Rollout figures on `/secret-2` come from the `networks` track in `src/content/roadmap.yaml`, so they always match `/roadmap`.
- Builders and Grants carry a short "Planning for Secret 2.0?" box pointing to `/secret-2`.

When governance ratifies it, remove the draft wording in `secret2.ts`, update [[Privacy claims]] first, then the pages. When CVM operators can sign up, add a `/provide` page and remove `hidden` from the Provide group in `src/config/site.ts`.

## Brand assets

Logo files live in `public/brand/` as `secret-{wordmark,symbol}-{white,black,orange}.svg`. PNGs are rendered from them by `node scripts/generate-logo-pngs.mjs`; run it after changing an SVG. The colour list in `about.ts` (`brandColours`) must match `src/styles/tokens.css`.
