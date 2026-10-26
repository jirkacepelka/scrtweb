---
tags: [design]
---

# Design System

The direction: **a dark, calm infrastructure site that explains things simply.** Layout clarity from aero.xyz (one big message per section, plenty of air), the technical credibility of Akash, and the existing Secret brand colours. Orange is the accent, used sparingly.

All tokens live in `src/styles/tokens.css`. Tailwind v4 turns each one into utilities automatically: `--color-accent` → `bg-accent`, `text-accent`, `border-accent`…

## Colour

Taken from the current scrt.network CSS (`--orange #ff3912`, `--secondary-orange #ff7d4a`, `--near-black #050505`, `--charcoal #222426`).

| Token         | Hex       | Use                                         |
| ------------- | --------- | ------------------------------------------- |
| `ink`         | `#050505` | Page background                             |
| `surface`     | `#0d0d0d` | Cards, raised blocks                        |
| `surface-2`   | `#161616` | Hover state of cards                        |
| `surface-3`   | `#222426` | Strong fills                                |
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
| `type-display` | Homepage hero `h1` only               | 44 → 92px    | 400        |
| `type-h1`      | Inner page `h1`, post title           | 40 → 72px    | 400        |
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
- Every multi-column layout collapses to one column below `md` (768px) or `lg` (1024px).

## Buttons

`<Button>` has three variants. Use **one primary per view**.

| Variant     | Looks like                     | For                          |
| ----------- | ------------------------------ | ---------------------------- |
| `primary`   | Orange pill, black text, arrow | The main action of a section |
| `secondary` | Outline pill                   | The alternative action       |
| `ghost`     | Text + arrow                   | "Learn more" style links     |

External links (starting with `http`) automatically open in a new tab and get an ↗ arrow and screen-reader text.

**One label per intent.** If "Get SCRT" means "go to /scrt#get-scrt", use exactly "Get SCRT" everywhere, not "Buy SCRT" in one place and "Get tokens" in another.

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

The signature element: an **inset, rounded panel** (`rounded-[2.25rem]`, a few px from the viewport edge) filled with a live WebGL dot grid (`ShaderField`): small grey dots with a slow orange wave passing through them, which bends and ripples around the pointer.

It appears in exactly three places:

| Where                             | Intensity                      |
| --------------------------------- | ------------------------------ |
| Homepage hero (full-bleed)        | 0.6                            |
| Inner page headers (`PageLayout`) | 0.55, darkened toward the text |
| Closing `CtaBand` on every page   | 0.75                           |

Panels have **no border**. They read as shapes because they are slightly lighter than the page (`bg-surface-2`) and carry an orange glow at the bottom. Don't add the panel to ordinary sections; its value comes from being rare. See [[Section components#ShaderField]] for performance details.

## Imagery

- **App icons** from the ecosystem are the main imagery: floating in the homepage hero and in the Ecosystem menu card. They come from the official registry, see [[Ecosystem]].
- **Real product screenshots** carry the story: what the user will actually see. They live in `src/assets/screens/` and are shown in `BrowserFrame`. Never build fake UI from divs.
- To refresh a screenshot, capture the live page with headless Chrome at 2x and crop away banners and widgets:

```bash
chrome --headless=new --hide-scrollbars --force-device-scale-factor=2 --window-size=1440,900 --virtual-time-budget=25000 --screenshot=dash-staking.png https://dash.scrt.network/staking
```

- Partner logos are monochrome SVGs from Simple Icons in `public/partners/`.
- Blog covers are optional; without one, the card shows a branded placeholder.
- Grain: a fixed noise layer (`body::after`) prevents banding in the dark orange gradients. Don't remove it.

Related: [[UI primitives]], [[Section components]].
