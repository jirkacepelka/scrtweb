---
tags: [decision]
status: accepted
date: 2026-10-26
---

# ADR-006 Homepage as a hub

**Context.** The first homepage carried everything: stats, three steps, a privacy explainer, a bento grid of products, the blog, a roadmap teaser and a closing call to action. In review it read as a mess of topics, and the detail duplicated the inner pages.

**Decision.** The homepage is a short hub that sends people on:

1. **Hero** with orbiting app icons and partners.
2. **Get started**: a step switcher (wallet, get SCRT, stake, use apps), each step with one link and a visual made from real data.
3. **Explore Secret**: four cards (Ecosystem, Secret 2.0, Builders, Community).
4. **Latest**: three newest posts as compact rows and a roadmap card with the overall and per-track readiness.

No closing CtaBand, no figures strip, no privacy explainer on the homepage; those live on `/scrt`, `/staking` and `/builders`.

**Consequences.**

- New topics get a page and, if important, a card in Explore, not a new homepage section.
- The removed blocks' components were deleted when nothing else used them (`FeatureGrid`, the row layout of `StepList`, `homeStats`).
- Inner pages carry the depth, so they must stand on their own.
