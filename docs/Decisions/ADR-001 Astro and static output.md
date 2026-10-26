---
tags: [decision]
status: accepted
date: 2026-10-25
---

# ADR-001 Astro and static output

**Context.** The site is mostly content: guides, a blog, a roadmap. It must be fast, cheap to host, easy to maintain by a small team, and deploy on Vercel.

**Decision.** Astro with `output: "static"` and the `@astrojs/vercel` adapter. Every page is pre-rendered at build time. No client-side framework.

**Consequences.**

- Pages load as plain HTML with almost no JavaScript. Excellent performance and SEO.
- Nothing runs on a server, so nothing to patch or scale.
- Data shown on the site is as fresh as the last build. Live data (price, APR) would need either a scheduled rebuild or a small client-side fetch. Both fit later without changing the architecture.
- If a page ever needs server rendering, Astro allows opting a single route into it (`export const prerender = false`) with the same adapter.
