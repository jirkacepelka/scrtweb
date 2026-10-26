---
tags: [components]
---

# UI primitives

Location: `src/components/ui/`. Small, generic building blocks. They know nothing about Secret's content.

## Button

```astro
<Button href="/scrt#get-scrt">Get SCRT</Button>
<Button href="/staking" variant="secondary" size="lg">
  Start staking
</Button>
<Button href="https://dash.scrt.network" variant="ghost">
  Open Dashboard
</Button>
```

| Prop       | Values                               | Default                             |
| ---------- | ------------------------------------ | ----------------------------------- |
| `href`     | URL. Without it renders a `<button>` | none                                |
| `variant`  | `primary`, `secondary`, `ghost`      | `primary`                           |
| `size`     | `md` (40px), `lg` (48px)             | `md`                                |
| `external` | force new tab                        | auto when `href` starts with `http` |

## Card

Bordered container. With `href` the whole card is a link with a hover state.

```astro
<Card href="https://www.keplr.app/" tone="accent">
  …
</Card>
```

`tone`: `default` (surface), `accent` (orange tint, for the recommended option), `plain` (border only).

## Badge

Small mono label. `tone`: `neutral`, `accent`, `soon`.

```astro
<Badge tone="accent">Live</Badge>
```

## Section

Wraps every page section with consistent vertical padding and the page container.

```astro
<Section id="faq" spacing="md" class="border-t border-line">
  …
</Section>
```

## SectionHeading

Headline with optional intro and eyebrow, stacked vertically (never a left headline with a floating right paragraph).

```astro
<SectionHeading title="How to stake" intro="Four steps, about five minutes." />
```

Props: `title`, `intro?`, `eyebrow?` (rationed, see [[Design System#Eyebrows (small orange labels above headings)]]), `align` (`left`/`center`), `as` (`h1`/`h2`).

## BrowserFrame

A real screenshot in a minimal browser window (three dots, address bar). Uses `astro:assets` so the image is resized and served as WebP/AVIF automatically.

```astro
---
import dashboardStaking from "../assets/screens/dashboard-staking.png";
---

<BrowserFrame src={dashboardStaking} alt="…" url="dash.scrt.network/staking" />
```

Props: `src`, `alt`, `url?`, `eager?` (use for the hero image only), `class?`.

## Stat

One figure: `value`, `label`, `note?`. Used by [[Section components#StatStrip]].

## Logo

The Secret logo inlined as SVG, coloured with `currentColor`.

```astro
<Logo class="h-7 w-auto text-fg" />
<Logo variant="symbol" decorative class="size-14 text-accent" />
```

Path data lives in `logo-paths.ts` and is shared with the hero artwork and `scripts/generate-brand-assets.mjs`.

## BrandIcon

A third-party logo (wallet, exchange, on-ramp) in a rounded tile, so icons of different shapes sit consistently.

```astro
<BrandIcon src="/logos/keplr.png" size="lg" />
<BrandIcon src="/logos/ledger.png" onLight />
```

| Prop      | Values                                    | Default  |
| --------- | ----------------------------------------- | -------- |
| `src`     | path in `public/logos/`                   | required |
| `alt`     | empty when the name is printed next to it | `""`     |
| `size`    | `sm` (20px), `md` (44px), `lg` (64px)     | `md`     |
| `onLight` | light tile for dark logos (Ledger, Kado)  | `false`  |

To add a logo: save a square PNG (128px is plenty) to `public/logos/`. The official site's icon works well:

```bash
curl -L -o public/logos/<name>.png "https://www.google.com/s2/favicons?domain=<domain>&sz=128"
```

## CodeWindow

A real code sample in an editor-style frame, highlighted at build time by Shiki (no client JS).

```astro
<CodeWindow code={sample} filename="query-token.ts" lang="ts" />
```

`lang`: `ts`, `js`, `rust`, `bash`, `json`, `toml`. Only genuine, working snippets, under ~25 lines.

## PostCover

Generated cover for blog posts without an image: an orange glow, grid and the logo mark, placed differently for every post (seeded by the post id, so it never changes between builds). Used automatically by `PostCard`.

## RoadmapCard

Compact roadmap component card: name, status badge, readiness with a thin line, and an expand icon. It is a button that opens the component's dialog (handled by [[Section components#RoadmapTracks]]). Used in the track grids and inside dialogs, so both look the same. Props: `item`, `step?` (number before the title, used for the network rollout).

## ShowcaseCard

A floating panel for [[Section components#TabShowcase]] visuals: a title bar (`title`, `aside?`) and either `rows` (logo, label, meta, tag) or `icons` (a grid of app icons). Always filled from data files (wallets, venues, ecosystem), never invented entries.

## ArchDiagram

The simplified Secret 2.0 architecture (wallet → confidential machines with Secret Money and apps → public chain and encrypted storage). `highlight` (`chain` | `machines` | `money` | `storage`) lights one layer and dims the rest. Used as the visuals of "How it works" on `/secret-2`.
