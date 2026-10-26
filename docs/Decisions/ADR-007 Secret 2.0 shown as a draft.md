---
tags: [decision]
status: accepted
date: 2026-10-26
---

# ADR-007 Secret 2.0 shown as a draft

**Context.** Secret plans to replace Secret contracts (CosmWasm running in SGX enclaves on validators) with confidential programs on confidential virtual machines (CVMs), and sSCRT and other SNIP-20 tokens with Secret Money. The design is published at secret3.dev as a draft that governance has not ratified. The site needs to prepare users and builders without presenting a plan as fact.

**Decision.**

- A dedicated page, `/secret-2`, explains the plan: how it works, what it means for SCRT holders, private token holders and builders, the rollout and the design's stated limits.
- It carries a visible **Draft** label and the notice in `draftNotice` (`src/data/secret2.ts`). All copy says "planned", never describes it as how mainnet works today.
- Other pages that touch the topic (Builders, Grants) link to it with a short "Planning for Secret 2.0?" note instead of repeating it.
- Rollout readiness comes from the `networks` track in `src/content/roadmap.yaml`, so it always matches `/roadmap`.
- The rest of the site (Wallets, Staking, Builders, Privacy claims) still describes the current network.

**Consequences.**

- When governance ratifies the design: remove the draft wording, update [[Privacy claims]] first, then Builders and the pages that describe contracts.
- When CVM apps appear in the dApp registry, they show on `/ecosystem` like any other app.
- When operators can sign up, open the Provide navigation group ([[ADR-005 Navigation structure]]).
