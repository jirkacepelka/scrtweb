---
tags: [architecture, content]
---

# Pages

Every page on the site: where it sits in the navigation, what it is for, what it is built from and where its content comes from. Update this note when you add, remove or restructure a page.

Inner pages use [[Layouts#PageLayout]] and end with one [[Section components#CtaBand]]. The visible title equals the nav label.

## Use SCRT

| URL        | Purpose                                                | Sections, in order                                                                                                                                                    | Content from                                      |
| ---------- | ------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| `/scrt`    | The token: facts and every way to get it (`#get-scrt`) | Coin and network facts · What you can do with SCRT · Get SCRT (exchanges, card, DEX, bridge) · withdraw tip · CtaBand                                                 | `data/stats.ts` (`scrtFacts`), `data/get-scrt.ts` |
| `/wallets` | Choose a wallet and keep it safe                       | Recommended wallet · other wallets · "Not sure which one?" · safety rules · CtaBand                                                                                   | `data/wallets.ts`                                 |
| `/staking` | Stake step by step                                     | How to stake ([[Section components#StepList]]) · dashboard screenshot · figures card ([[Section components#StatStrip]]) · Choosing a validator · governance · CtaBand | `data/stats.ts`, `assets/screens/`                |

## Build

| URL         | Purpose                                                                    | Sections, in order                                                                                                                                             | Content from                                               |
| ----------- | -------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| `/builders` | Start building on Secret                                                   | What you get + code sample · Secret 2.0 notice · privacy boundary ([[Section components#PrivacySplit]]) · Resources · CtaBand                                  | `data/builders.ts`                                         |
| `/secret-2` | The planned move to confidential machines and Secret Money, labelled Draft | Draft notice · How it works ([[Section components#TabShowcase]] with [[UI primitives#ArchDiagram]]) · What it means for you · Rollout + Known limits · CtaBand | `data/secret2.ts`, `content/roadmap.yaml` (networks track) |
| `/grants`   | What is funded and how to apply                                            | What we fund · How to apply · Secret 2.0 note · CtaBand                                                                                                        | `data/about.ts`, `links.contactEmail`                      |

## About

| URL           | Purpose                                                 | Sections, in order                                                 | Content from                                                     |
| ------------- | ------------------------------------------------------- | ------------------------------------------------------------------ | ---------------------------------------------------------------- |
| `/ecosystem`  | Every app on Secret                                     | Start here (spotlight) · All apps (filterable) · CtaBand           | `data/ecosystem.ts` + generated registry, see [[Ecosystem]]      |
| `/roadmap`    | Secret 2.0 progress                                     | Intro + readiness summary · tracks (collapsible, popups) · CtaBand | `content/roadmap.yaml`, `data/roadmap.ts`, see [[Roadmap items]] |
| `/foundation` | Who looks after the network (title "Secret Foundation") | What the foundation does · Recent changes · CtaBand                | `data/about.ts`                                                  |
| `/community`  | Channels, governance and how to help                    | Where to find us · How governance works · Ways to help · CtaBand   | `data/about.ts`, `data/stats.ts`                                 |
| `/brand`      | Logos, colours and usage (title "Brand assets")         | Logo downloads · Colours · Typography · Using the logo · CtaBand   | `data/about.ts`, `public/brand/`                                 |

## Blog

| URL                | Purpose                    | Built from                          |
| ------------------ | -------------------------- | ----------------------------------- |
| `/blog`            | All posts, newest featured | [[Section components#BlogIndex]]    |
| `/blog/<id>`       | One post                   | [[Layouts#PostLayout]]              |
| `/blog/tags/<tag>` | Posts with a tag           | BlogIndex, `heading` set to the tag |
| `/rss.xml`         | RSS feed                   | `pages/rss.xml.ts`                  |

## Homepage and system pages

| URL                                 | Built from                                                                                                                                                                                                                                                     |
| ----------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/`                                 | [[Section components#Hero]] · Get started ([[Section components#TabShowcase]] with [[UI primitives#ShowcaseCard]] and a dashboard screenshot) · Explore Secret (four cards) · Latest (three posts as rows + a roadmap card). See [[ADR-006 Homepage as a hub]] |
| `/404`                              | `BaseLayout`, `noindex`                                                                                                                                                                                                                                        |
| `/robots.txt`, `/sitemap-index.xml` | `pages/robots.txt.ts`, `@astrojs/sitemap`                                                                                                                                                                                                                      |

## Prepared, not live

- **Provide** (`/provide`): a nav group for validators, confidential machine operators and storage providers. It is defined in `src/config/site.ts` with `hidden: true` and has no page yet. See [[ADR-005 Navigation structure]].

## Redirects

Old scrt.network URLs and renamed pages redirect (301) to the pages above. The list is `redirects` in `astro.config.mjs`; see [[Vercel#Redirects and vercel.json]].

Related: [[Architecture]], [[Adding a page]].
