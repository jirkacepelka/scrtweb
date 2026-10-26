---
tags: [development]
---

# Local setup

## Requirements

- **Node.js 22.23+** (the minimum in `package.json` → `engines`; check with `node -v`)
- npm (comes with Node)
- Optional: Obsidian for this vault, VS Code with the Astro extension

## Commands

```bash
npm install          # once, after cloning
npm run dev          # dev server at http://localhost:4321, reloads on save
npm run build        # production build into dist/ and .vercel/output/
npm run preview      # serve the production build locally
npm run check        # TypeScript + Astro diagnostics (should report 0 errors)
npm run format       # format all files with Prettier
```

Run `npm run check` and `npm run build` before pushing. Vercel runs the same build.

## Regenerating brand assets

After changing the logo paths or brand colours:

```bash
node scripts/generate-brand-assets.mjs
```

This rewrites `public/favicon.svg`, `public/apple-touch-icon.png` and `public/og-default.png`.

## Refreshing ecosystem apps

```bash
node scripts/sync-ecosystem.mjs
```

See [[Ecosystem]].

## Troubleshooting

| Problem                                              | Fix                                                                                                              |
| ---------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Build error mentioning a blog post field             | The frontmatter doesn't match the schema. The message names the file and field. See [[How to write a blog post]] |
| An icon doesn't show                                 | Check the name exists in the Phosphor set (`ph:*`) at icones.js.org/collection/ph                                |
| A Tailwind colour class does nothing (`bg-blue-500`) | Only brand tokens exist. See [[Design System#Colour]]                                                            |
| Styles look stale                                    | Stop the dev server, delete `.astro/`, start again                                                               |

Related: [[Conventions]], [[Architecture]].
