---
tags: [decision]
status: accepted
date: 2026-10-25
---

# ADR-004 Dark-only theme

**Context.** The brand is black, orange and white. A light mode would double the design and QA work.

**Decision.** The site is dark only (`color-scheme: dark`). Every section uses the same dark theme; sections don't switch to light backgrounds.

**Consequences.**

- One set of tokens to tune and test for contrast.
- The orange accent reads strongly on near-black, which suits the brand.
- If a light theme is wanted later, the token structure allows it: redefine the colour tokens under a `[data-theme="light"]` selector. Components don't need to change, because they only use token names.
