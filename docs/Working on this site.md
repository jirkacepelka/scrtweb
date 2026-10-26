---
tags: [index, development]
---

# Working on this site

The playbook for anyone who changes this site, human or AI agent. Read it before your first change; it links to the notes that hold the detail.

## Read first, in this order

1. [[Architecture]]: how the code is organised and the rules that keep it that way.
2. [[Design System]]: tokens, type, radius, panels, motion.
3. [[Style guardrails]]: what the site should and should not look like, including directions that were tried and rejected.
4. [[Pages]]: every page, what it is for and what it is built from.
5. The note for the area you are touching: [[UI primitives]], [[Section components]], [[Layouts]], [[Editing data]], [[Roadmap items]], [[Ecosystem]], [[How to write a blog post]].

When notes and code disagree, the code is the truth: fix the note in the same change.

## Golden rules

1. **Copy what exists.** Before building something, find the closest existing page or component and follow its pattern. New patterns need a reason.
2. **Content lives in data.** Text that may change, links and figures go in `src/config/site.ts`, `src/data/*.ts` or `src/content/`. Components get them as props.
3. **Tokens only.** Colours, fonts and radii come from `src/styles/tokens.css`. No raw hex in components. Tailwind's default palette does not exist here.
4. **The page name is the heading.** The `title` of a page equals its label in the navigation and on every button that leads to it.
5. **Never invent facts.** Figures come from the chain with a date ([[ADR-008 Figures from the chain]]). Organisation facts come from published sources. Unknown means left out, not guessed.
6. **Be precise about privacy.** Follow [[Privacy claims]]. Secret 2.0 is a draft and is always labelled as one ([[ADR-007 Secret 2.0 shown as a draft]]).
7. **No em dashes in visible copy.** Use a full stop, comma, colon or parentheses.
8. **Ask before you change direction.** If a request is ambiguous or would change the look or structure of the site, ask the owner first. Small fixes inside the existing style can go ahead.

## Typical tasks

| Task                                     | Where                             | Note                                                 |
| ---------------------------------------- | --------------------------------- | ---------------------------------------------------- |
| Change a link, nav item or footer column | `src/config/site.ts`              | [[Editing data#Navigation, footer and social links]] |
| Add a wallet, exchange or partner        | `src/data/*.ts`                   | [[Editing data]]                                     |
| Refresh network figures                  | `src/data/stats.ts`               | [[Editing data#Network figures]]                     |
| Publish a blog post                      | `src/content/blog/`               | [[How to write a blog post]]                         |
| Update the roadmap                       | `src/content/roadmap.yaml`        | [[Roadmap items]]                                    |
| Refresh ecosystem apps                   | `node scripts/sync-ecosystem.mjs` | [[Ecosystem]]                                        |
| Add a page                               | `src/pages/` + nav entry          | [[Adding a page]]                                    |
| Add or change a component                | `src/components/`                 | [[UI primitives]], [[Section components]]            |
| Add a redirect                           | `astro.config.mjs` → `redirects`  | [[Vercel#Redirects and vercel.json]]                 |

## Definition of done

A change is finished when all of these hold:

- [ ] `npm run check` reports 0 errors, 0 warnings, and `npm run build` completes.
- [ ] You looked at the result in a browser at desktop width (1440px) and phone width (390px): no horizontal scroll, nothing clipped, text readable.
- [ ] Interactive parts work with a keyboard and with `prefers-reduced-motion`.
- [ ] Copy follows [[Design System#Copy rules]]: plain English, no em dashes, no hype, privacy claims accurate.
- [ ] Every figure or fact you added has a source; dated figures have their `asOf` date updated.
- [ ] The matching note in this vault is updated in the same commit. A new lasting decision gets an ADR in `Decisions/`.
- [ ] Nothing in the change contradicts [[Style guardrails]].

## Checking your work visually

`npm run dev` serves the site at http://localhost:4321. For screenshots without a visible browser (useful for agents), Chrome headless works:

```bash
chrome --headless=new --hide-scrollbars --window-size=1440,900 --screenshot=home.png http://localhost:4321/
```

Content with `data-reveal` fades in on scroll, so a full-page screenshot may show it hidden. Animations run only in a visible tab; measure them in a real or headless window, not in a background tab.

## Committing and deploying

- Commit messages: imperative, short subject (`Add Leap wallet`, `Update staking figures (2026-11)`). See [[Conventions#Git]].
- Every push to `main` deploys to production on Vercel; other branches get preview URLs. See [[Vercel]].
- Commit, push or deploy only when the owner asks.

Related: [[00 Index]], [[Conventions]], [[Launch checklist]].
