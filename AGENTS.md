## Project

Static Astro 7 site for scrt.network, deployed on Vercel. Read `docs/00 Index.md` first; `docs/Architecture.md` and `docs/Design System.md` define the rules:

- Pages compose `components/sections/*`, sections compose `components/ui/*`.
- Content and links live in `src/config/site.ts`, `src/data/*.ts` and `src/content/` collections, never hardcoded in components.
- Colours, fonts and radii only via tokens in `src/styles/tokens.css` (Tailwind's default palette is disabled).
- No em dashes in visible copy. Privacy statements must follow `docs/Content/Privacy claims.md`.
- Update the matching note in `docs/` when you change how something works.

Run `npm run check` and `npm run build` before finishing.

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Astro docs: https://docs.astro.build

- [Routing](https://docs.astro.build/en/guides/routing/)
- [Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Content collections](https://docs.astro.build/en/guides/content-collections/)
- [Styling and Tailwind](https://docs.astro.build/en/guides/styling/)
