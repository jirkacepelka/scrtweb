---
tags: [development]
---

# Conventions

## Files and naming

| Thing         | Convention                            | Example                              |
| ------------- | ------------------------------------- | ------------------------------------ |
| Components    | PascalCase `.astro`                   | `StatStrip.astro`                    |
| Pages         | kebab-case, matches the URL           | `ecosystem.astro` → `/ecosystem`     |
| Data files    | kebab-case `.ts`, export typed arrays | `get-scrt.ts` exports `acquirePaths` |
| Blog posts    | kebab-case slug                       | `how-to-stake-scrt.md`               |
| Roadmap items | `YYYY-qN-short-name.md`               | `2027-q1-apps.md`                    |

## Code

- Every component starts with a short `/** … */` comment saying what it is and when to use it.
- Props are typed with an `interface Props`.
- Styling with Tailwind utilities using **token names only** (`text-muted`, `bg-surface`). No inline hex colours in components. Hex values are allowed only in `tokens.css`, SVG artwork and the brand asset script.
- Arbitrary values (`text-[0.9375rem]`) are fine for one-offs; if one repeats, make it a token.
- Interactive elements: real `<a>` and `<button>`, visible focus (global `:focus-visible` ring), `aria-*` where state changes.
- External links: `target="_blank" rel="noopener noreferrer"` and screen-reader text ("opens in a new tab"). `Button` and `Card` handle this automatically.
- Images: `astro:assets` `<Image>` for anything in `src/`, always with `alt` (empty `alt=""` only if decorative).
- No client JS frameworks. Small inline `<script>` blocks only, no scroll listeners.

## Formatting

Prettier with the Astro and Tailwind plugins (`.prettierrc.json`). Tailwind classes are sorted automatically.

```bash
npm run format
```

## Git

- `main` = production. Work on branches; each gets a Vercel preview.
- Commit messages: imperative, short subject, for example `Add Leap wallet`, `Update staking figures (2026-11)`.
- Content-only changes (posts, data) can go straight to a branch and PR without code review from a developer.

## Docs

When you change how something works, update the matching note in this vault in the same commit. New decisions get an ADR in `Decisions/`.
