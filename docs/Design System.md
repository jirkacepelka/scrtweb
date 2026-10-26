---
tags: [design]
---

# Design System

The direction: **a dark, calm infrastructure site that explains things simply.** Layout clarity from aero.xyz (one big message per section, plenty of air), the technical credibility of Akash, and the existing Secret brand colours. Orange is the accent, used sparingly. References are inspiration, never templates: see [[Style guardrails]] for the concrete do's and don'ts and the directions that were rejected.

All tokens live in `src/styles/tokens.css`. Tailwind v4 turns each one into utilities automatically: `--color-accent` → `bg-accent`, `text-accent`, `border-accent`…

## Colour

Taken from the current scrt.network CSS (`--orange #ff3912`, `--secondary-orange #ff7d4a`, `--near-black #050505`, `--charcoal #222426`).

| Token         | Hex       | Use                                         |
| ------------- | --------- | ------------------------------------------- |
| `ink`         | `#050505` | Page background                             |
| `surface`     | `#0d0d0d` | Cards, raised blocks                        |
| `surface-2`   | `#161616` | Panels (page headers, CtaBand), card hover  |
| `surface-3`   | `#222426` | Strong fills (open nav trigger)             |
| `line`        | white 9%  | Hairlines and borders                       |
| `line-strong` | white 16% | Button outlines, emphasised borders         |
| `fg`          | `#f4f3f1` | Primary text                                |
| `muted`       | `#a3a3a3` | Body text, secondary text                   |
| `faint`       | `#8a8a8a` | Meta text (dates, sources). Still passes AA |
| `accent`      | `#ff3912` | Primary buttons, highlights, focus ring     |
| `accent-300`  | `#ff7d4a` | Accent text and icons on dark, button hover |
| `accent-200`  | `#ffc4ad` | Text on orange-tinted backgrounds           |
| `accent-900`  | `#3a1206` | Orange-tinted card backgrounds              |
| `on-accent`   | `#0a0a0a` | Text on orange buttons                      |

**Rules**

- **Text on orange is black (`on-accent`), never white.** White on `#ff3912` is about 3.6:1 and fails WCAG AA for normal text. Black passes easily.
- Orange text uses `accent-300`, not `accent`: it reads better on near-black.
- No pure `#000` or `#fff`. No second accent colour. No purple or blue glows.
- Tailwind's default palette is switched off (`--color-*: initial`), so `bg-blue-500` does not exist. That is intentional.

## Typography

| Token          | Font                | Use                                            |
| -------------- | ------------------- | ---------------------------------------------- |
| `font-sans`    | Geist Variable      | Everything by default                          |
| `font-display` | Geist Variable      | Headings (tight tracking, set in `global.css`) |
| `font-mono`    | Geist Mono Variable | Labels, dates, numbers, code                   |

### Type scale

Headings use named utilities from `global.css`. Don't combine size, weight and tracking by hand on a heading.

| Class          | Use                                   | Size (fluid) | Weight     |
| -------------- | ------------------------------------- | ------------ | ---------- |
| `type-display` | Hero `h1` and inner page titles       | 44 → 92px    | 400        |
| `type-h1`      | Blog post title, 404 page             | 40 → 72px    | 400        |
| `type-h2`      | Section headings, CTA band, big stats | 32 → 56px    | 400        |
| `type-h3`      | Card and step titles                  | 22px         | 500        |
| `type-lead`    | Intro paragraphs under headings       | 17 → 20px    | 400, muted |

Large headings are **light (400) with tight negative tracking**. That's what makes them read as calm and confident (the Aero feel). Bold is reserved for small sizes.

**Muted second half.** Wrap the second part of a heading in `<em>` and it renders in `faint` grey, not italic:

```astro
<SectionHeading title="Three steps to your first SCRT. <em>No experience needed.</em>" />
```

Use it on at most two or three headings per page.

Body text: base size for cards, `text-sm` for meta.

To switch fonts: install the Fontsource package, change the `@import` in `global.css` and the `--font-*` values in `tokens.css`. Nothing else.

## Radius

One system, applied everywhere:

| Element                      | Radius    | Token          |
| ---------------------------- | --------- | -------------- |
| Buttons, chips, icon buttons | full pill | `rounded-pill` |
| Cards, panels, images        | 20px      | `rounded-xl`   |
| Icon tiles                   | 14px      | `rounded-lg`   |
| Badges, inline code          | 8px       | `rounded-md`   |

## Spacing and layout

- **Global scale:** `html { font-size: 90% }` in `global.css`. Every rem-based size (type, spacing, containers) follows it, so the whole site can be made larger or smaller in one place. Pixel sizes (app icons, dot spacing) don't scale.

- Content width: `container-page` utility (max 76rem, 16px gutter on mobile, 32px from `md`).
- Section rhythm: `<Section>` gives `py-20 md:py-32` (`spacing="lg"`) or `py-16 md:py-20` (`spacing="md"`).
- Separate sections with `border-t border-line` rather than changing background colour. The page has one theme; sections never invert.
- Inside the content sheet of an inner page, nothing runs edge to edge: no full-width tinted bands or borders. Group things in a rounded card within the content width instead.
- Every multi-column layout collapses to one column below `md` (768px) or `lg` (1024px).

## Buttons

`<Button>` has three variants. Use **one primary per view**.

| Variant     | Looks like                     | For                          |
| ----------- | ------------------------------ | ---------------------------- |
| `primary`   | Orange pill, black text, arrow | The main action of a section |
| `secondary` | Outline pill                   | The alternative action       |
| `ghost`     | Text + arrow                   | "Learn more" style links     |

External links (starting with `http`) automatically open in a new tab and get an ↗ arrow and screen-reader text.

**One label per intent.** If "Get SCRT" means "go to /scrt#get-scrt", use exactly "Get SCRT" everywhere, not "Buy SCRT" in one place and "Get tokens" in another. A button that names its destination uses the page name exactly ("Roadmap", "Grants", "Explore Ecosystem"); an action button may pair a verb with it ("Start staking", "Choose a wallet").

## Copy rules

- Plain English for people new to crypto. Explain terms the first time (validator, unbonding).
- Short: section intros under ~25 words, hero subtitle under 20.
- **No em dashes (—)** anywhere. Use a full stop, comma, colon or parentheses.
- No hype verbs ("revolutionize", "unleash", "seamless").
- Never claim more privacy than exists. See [[Privacy claims]].
- Figures must come from a real source with a date. See [[Editing data#Network figures]].

## Eyebrows (small orange labels above headings)

Rationed: **at most one in every three sections**. A heading alone is usually enough.

## Panels and the shader

The signature element: an **inset, rounded panel** (`rounded-[2.25rem]`, a few px from the viewport edge) filled with a live WebGL dot grid ([[Section components#ShaderField]]): small grey dots with a slow orange wave passing through them, which bends and ripples around the pointer.

It appears in exactly these places, and nowhere else:

| Where                             | Shape                                                                   | Shader                                                       |
| --------------------------------- | ----------------------------------------------------------------------- | ------------------------------------------------------------ |
| Homepage hero                     | Full-bleed (no panel, no corners), extends under the transparent header | `intensity 0.6`, `base 0.03` (a touch lighter than the page) |
| Inner page headers (`PageLayout`) | Rounded panel, content sheet overlaps its bottom                        | `intensity 0.45` at 50% opacity                              |
| Blog post headers (`PostLayout`)  | Same as inner pages                                                     | `intensity 0.45` at 50% opacity                              |
| Closing `CtaBand` on inner pages  | Rounded panel                                                           | `intensity 0.75` at 60% opacity                              |

Panels have **no border**. They read as shapes because they are slightly lighter than the page (`bg-surface-2`) and carry an orange glow at the bottom. Don't add the panel to ordinary sections; its value comes from being rare. The step switcher's stage (`TabShowcase`) uses a static CSS dot grid, not the shader.

## Recurring patterns

Reuse these instead of inventing new ones:

| Pattern               | Classes / component                                                                                              | Used on                                             |
| --------------------- | ---------------------------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| Card                  | `Card` (`rounded-xl border border-line bg-surface`), link cards get a hover state                                | Explore, Foundation, Community, Builders            |
| Icon tile             | `inline-flex size-10 items-center justify-center rounded-lg border border-line-strong bg-ink` + Phosphor icon    | Cards, nav dropdown (smaller: `size-9 rounded-md`)  |
| Hairline grid         | `grid gap-px overflow-hidden rounded-xl border border-line bg-line`, cells `bg-ink`                              | Grants areas, Secret 2.0 impact                     |
| Numbered list         | `divide-y divide-line border-y border-line`, mono `01` numbers in `accent-300`                                   | Builders, Grants, Secret 2.0 rollout                |
| Info box              | Card with a `Badge` and a secondary `Button` on the right                                                        | Secret 2.0 notices (Builders, Grants), Draft notice |
| Figures               | `StatStrip` inside a card; always with a source and date                                                         | Staking                                             |
| Orange icon on a card | `size-6 text-accent-300` icon, then `type-h3` title at a fixed distance (`mt-10`, not `mt-auto`) so titles align | Foundation, Community, Grants                       |

## Imagery

- **App icons** from the ecosystem are the main imagery: orbiting in the homepage hero, in the About menu card and in the Get started switcher. They come from the official registry, see [[Ecosystem]].
- **Real product screenshots** carry the story: what the user will actually see. They live in `src/assets/screens/` and are shown in `BrowserFrame`. Never imitate a product's UI with divs.
- **Data panels** are allowed where no screenshot exists: [[UI primitives#ShowcaseCard]] (lists of real wallets, venues or apps) and [[UI primitives#ArchDiagram]] (the Secret 2.0 layers). They show only entries from the data files, never invented ones.
- To refresh a screenshot, capture the live page with headless Chrome at 2x and crop away banners and widgets:

```bash
chrome --headless=new --hide-scrollbars --force-device-scale-factor=2 --window-size=1440,900 --virtual-time-budget=25000 --screenshot=dash-staking.png https://dash.scrt.network/staking
```

- Partner logos are monochrome SVGs from Simple Icons in `public/partners/`.
- Blog covers are optional; without one, the card shows a branded placeholder.
- Grain: a fixed noise layer (`body::after`) prevents banding in the dark orange gradients. Don't remove it.

Related: [[UI primitives]], [[Section components]].
