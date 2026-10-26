## Project

Static Astro 7 site for scrt.network, deployed on Vercel. The `docs/` folder is an Obsidian vault that defines how the site is built and how it should look. **Read `docs/Working on this site.md` first**: it lists the notes to read, the rules, typical tasks and the definition of done. The key notes are `docs/Architecture.md`, `docs/Design System.md`, `docs/Style guardrails.md` and `docs/Pages.md`.

The rules in short:

- Pages compose section components and UI primitives. A block used on one page may be inline in that page; once a second page needs it, it becomes a component in `components/sections/`.
- Content and links live in `src/config/site.ts`, `src/data/*.ts` and `src/content/` collections, never hardcoded in components.
- Colours, fonts and radii only via tokens in `src/styles/tokens.css` (Tailwind's default palette is disabled).
- Never invent figures or facts. Figures come from the chain with a date; Secret 2.0 is always labelled as a draft.
- No em dashes in visible copy. Privacy statements must follow `docs/Content/Privacy claims.md`.
- Ask the owner before changing the look or structure; check `docs/Style guardrails.md` for directions already rejected.
- Update the matching note in `docs/` when you change how something works; record lasting decisions as ADRs in `docs/Decisions/`.

Run `npm run check` and `npm run build`, and look at the result at desktop and phone width, before finishing. Commit, push or deploy only when asked.

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
