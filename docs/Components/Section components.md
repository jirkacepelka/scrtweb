---
tags: [components]
---

# Section components

Location: `src/components/sections/`. Each is one block of a page. Pages pass content in as props; sections never import page-specific data themselves.

Layout variety matters: on one page, avoid using the same section type twice in a row, and use at most one marquee.

## Hero

Homepage only, inspired by getartcraft.com. Full-bleed (edge to edge, no rounded corners, no bottom line), on a background a touch lighter than the page (`ShaderField base={0.03}`). It extends under the transparent header (`-mt-16 pt-16`); the orbit layer starts below the header so icons never pass behind the nav. [[#ShaderField]] (at `intensity={0.6}`) sits behind a centred `type-display` headline, subtitle and two CTAs.

- **Orbiting app icons:** real icons from the ecosystem travel slowly around the text on two rounded-rectangle paths (superellipses), all in the same direction, one lap every 180 s. Icons are shown as they are: no border, no blur, full opacity. Lower positions are slightly larger and drawn on top, for a hint of depth.
- **Constant speed:** each path is sampled by arc length, so icons never speed up on the long sides or slow down in corners. Time only advances while the hero is visible, so switching tabs never makes them jump.
- **Readability:** a dark radial gradient sits between the icons and the text, and another in the bottom-right corner behind the partner strip. Text and partners are always layered above the icons.
- **Partners:** a continuously scrolling strip of partner logos in the bottom-right corner (`partners` prop, from `data/partners.ts`).
- **Mobile:** the orbit is replaced by a row of six icons under the CTAs; partners show below.

```astro
<Hero
  title="Privacy for everyone.<br /><em>Start with SCRT.</em>"
  subtitle="…under 20 words…"
  primary={{ label: "Get SCRT", href: "/scrt#get-scrt" }}
  secondary={{ label: "Explore apps", href: "/ecosystem" }}
  apps={heroApps}
  partners={partners}
/>
```

Path sizes, lap time and icon sizes are the `rings` array in `Hero.astro`. Which apps appear is `heroSlugs` in `src/data/ecosystem.ts`.

## ShaderField

Animated WebGL background: a regular grid of small dots with a slow orange wave rolling through it (drifting noise plus a ripple from the bottom centre). Props: `intensity` (0..1, how orange the wave gets), `spacing` (dot distance in px) and `base` (background grey 0..1, default 0.02 = the page; the hero uses 0.03).

The pointer interacts with the wave itself, not just a highlight:

- the wave field bends around the cursor (a lens warp) and nearby dots are pushed away,
- light that is already there gets amplified and rippled; faster movement means a stronger effect (pointer "energy" decays when you stop),
- a click or tap sends a shockwave ring across the field,
- leaving the area fades the influence out smoothly. Fills its positioned parent; put it first inside a `relative isolate overflow-hidden` container.

| Prop        | Default |                                               |
| ----------- | ------- | --------------------------------------------- |
| `intensity` | `1`     | 0..1, how strongly the wave turns dots orange |
| `spacing`   | `14`    | distance between dots in CSS px               |
| `class`     | none    | extra classes on the wrapper                  |

Performance and accessibility:

- Renders at device resolution (DPR capped at 2) so dots stay crisp; the shader is cheap.
- Pauses when off-screen (`IntersectionObserver`) or the tab is hidden.
- `prefers-reduced-motion`: one still frame.
- No WebGL: the wrapper's CSS dot pattern stays as a fallback.
- Colours are in the fragment shader (grey dots, orange `vec3(1.,.22,.07)`, peach highlight).

## StepList

Ordered steps where the step title _is_ the label (no "Step 1").

- `layout="row"`: three columns with hairline dividers (homepage).
- `layout="stack"`: numbered vertical list with a connecting line (staking guide).

Each step: `{ title, body, icon?, href?, linkLabel? }`.

## PrivacySplit

Explainer on the left, "Encrypted" vs "Still public" lists on the right. Props: `eyebrow?`, `title`, `body`, `privateItems`, `publicItems`, `cta?`. Content must follow [[Privacy claims]].

## StatStrip

Row of figures with a source and date line. Props: `stats`, `asOf?`, `source?`. Data from `data/stats.ts`, see [[Editing data#Network figures]].

## FeatureGrid

Bento grid built for **exactly four** items: one wide, one tall, two normal. Each item: `{ title, body, icon, status: "live" | "soon", href?, visual?: "glow" | "grid" | "plain" }`. Give at least two cells a `visual` so the grid doesn't look flat.

## PostCard

Blog teaser. Uses the post's `cover`, or a generated [[UI primitives#PostCover]]. `variant`:

- `card` (default): compact vertical card for three-column grids (homepage, `/blog`).
- `featured`: horizontal, spans the grid row (newest post on `/blog`).
- `row`: small thumbnail + date + title, for the "Keep reading" list under a post.

## BlogIndex

Tag filter chips + post grid + empty state. Used by `/blog` and `/blog/tags/[tag]`.

## RoadmapSummary

Secret 2.0 readiness at a glance: "Overall" plus one figure per track, each with a thin progress line, and the date of the figures. Props: `overall`, `tracks` (both from `getRoadmap()`), `linkTracks` (link each figure to its section on `/roadmap`), `size` (`md` default; `sm` for sitting next to text on one row). Used on `/roadmap` (sm) and the homepage (md).

## RoadmapTracks

The full roadmap as collapsible tracks (native `<details>`, closed by default; `open` prop to start expanded). Inside each track, [[UI primitives#RoadmapCard]] cards. Clicking a card opens a native `<dialog>` with the summary, readiness and "Connects to" (the same cards, which open their own dialog). Props: `tracks` and `related` from `getRoadmap()`. Handles deep links (`#track-…`, `#arch-…`) and any `[data-open-tracks]` element (expands all tracks). Data: [[Roadmap items]].

## CtaBand

Closing call to action above the footer. **One per page.** Props: `title`, `body?`, `primary`, `secondary?`.

## TabShowcase

A step switcher, used for "Get started" on the homepage and "How it works" on `/secret-2`. Left: a numbered list; the active item expands with its text and a link, and the hairline above it fills in orange while it is shown. Right: one large visual on a dot-grid stage with a single orange light (below `lg` the visual sits under the active item).

- Moves to the next item on its own every `interval` seconds (default 8). Hovering or focusing the block pauses it; the round pause button next to the title stops it. With reduced motion it never advances on its own. It also pauses while off screen.
- Without JS every item is expanded.
- Visuals are named slots, one per item:

```astro
<TabShowcase id="start" title="Get started" items={items}>
  <Fragment slot="visual-0">
    <ShowcaseCard title="Wallets" rows={rows} />
  </Fragment>
</TabShowcase>
```

Inspired by the Akash homepage, deliberately not a copy: numbered steps, an orange progress hairline instead of a pill with dots, and the site's own dot grid instead of a gradient.
