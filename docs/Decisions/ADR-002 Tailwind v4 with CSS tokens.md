---
tags: [decision]
status: accepted
date: 2026-10-25
---

# ADR-002 Tailwind v4 with CSS tokens

**Context.** The site needs a consistent look that other developers can extend without drifting off-brand.

**Decision.** Tailwind CSS v4 (via `@tailwindcss/vite`). All design decisions are CSS custom properties in a single `@theme` block in `src/styles/tokens.css`. Tailwind's default colour palette is disabled, so only brand colours can be used.

**Consequences.**

- One file to change colours, fonts, radii and motion. See [[Design System]].
- Utilities are self-documenting (`bg-accent`, `text-muted`) and common to most front-end developers.
- Off-brand colours are impossible by accident (`bg-blue-500` doesn't exist).
- Blog typography is a small hand-written `.prose-secret` block instead of the typography plugin, to keep it on-brand.
