---
tags: [decision]
status: accepted
date: 2026-10-26
---

# ADR-008 Figures from the chain

**Context.** The site shows network and token figures (supply, staked share, inflation, staking rewards, unbonding, validators, governance thresholds). Third-party dashboards sometimes show different numbers; for example, a dashboard showed 9% inflation while the chain reported 5%.

**Decision.**

- Every figure is read from the Secret Network mainnet (`secret-4`) public API, as listed in [[Editing data#Network figures]], and stored statically in `src/data/stats.ts` with the date it was read (`statsAsOf`).
- When a dashboard and the chain disagree, the site uses the chain.
- No live data (price, APR) for now. If it is added, it is fetched at build time and refreshed by a scheduled rebuild (see [[Vercel#Scheduled rebuilds]]), not in the visitor's browser.
- Facts about organisations (team, grant sizes, processes) are only published once the organisation has published them.

**Consequences.**

- Figures can be out of date; the date next to them says so. Refresh them before launch and when parameters change.
- Nobody may round up, estimate or copy a number from a third-party site.
