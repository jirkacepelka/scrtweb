---
tags: [components]
---

# Layouts

Location: `src/layouts/` and `src/components/layout/`.

## BaseLayout

The HTML document. Every page goes through it.

- Imports `global.css` (tokens, fonts, Tailwind).
- Renders `Seo`, `Header`, `<main id="main">`, `Footer`.
- Adds the `js` class to `<html>` (so reveal animations only hide content when JS runs).
- Runs the `IntersectionObserver` that reveals `[data-reveal]` elements.

Props are the SEO props below.

## PageLayout

For standard inner pages, in the Aero style:

- a large dark panel (rounded, no border, slightly lighter than the page, dot field + orange glow rising from the bottom),
- the **page name** as a big `type-display` title on the left, a short `intro` and optional CTAs on the right,
- the page content on a sheet that rises over the lower part of the panel (rounded top corners).

```astro
<PageLayout title="Staking" intro="One or two sentences." description="SEO description">
  <Fragment slot="actions">
    <Button href="…">Open Dashboard</Button>
  </Fragment>
  <Section>…</Section>
</PageLayout>
```

**Rule: the visible title is the page's name, exactly as it appears in the navigation** (Ecosystem, Get SCRT, Wallets, Staking, Builders, Roadmap, Blog), so a link, a button and the heading it leads to always match. Put the selling line in `intro`, not in the title. `heading` exists only for pages whose name is dynamic (a blog tag).

## PostLayout

Blog post template: back link, title, description, author/date/reading time/tags, optional cover, prose body (`.prose-secret` in `global.css`), then up to two related posts.

## Seo

Outputs `<title>`, description, canonical URL, Open Graph and Twitter tags.

| Prop          | Default                                         |
| ------------- | ----------------------------------------------- |
| `title`       | none → "Secret Network \| Privacy for everyone" |
| `description` | `site.description` from `config/site.ts`        |
| `image`       | `/og-default.png`                               |
| `type`        | `website` (posts use `article`)                 |
| `noindex`     | `false` (the 404 page sets it)                  |

Page titles render as "`<title>` \| Secret Network".

## Header

Aero-style, full width, sticky. Logo, then the navigation right after it, buttons on the right.

- **Dropdowns** (`navGroups`): opening one expands the header into a full-width sheet with rounded bottom corners. Left: "Related" cards, the group's `featured` card (visual: `dashboard` screenshot, `apps` icon collage or `code` pattern) and, if set, a `relatedPost` from the blog. Right: large links with a one-line description, separated by hairlines; the current page gets an orange square.
- While a dropdown is open, the page behind dims and blurs (`menu-scrim`).
- Opens on hover (mouse) or click. Closes on Escape (focus returns to the trigger), outside click, or when keyboard focus leaves the sheet.
- **Plain links** (`navLinks`) follow the dropdowns. **Buttons** (`headerActions`): a quiet text button and the orange primary.
- Below `lg`: a menu button opens every link, grouped by section.

## Footer

Logo, short description, social icons, three link columns from `footerNav`, legal row.

All header and footer links are edited in `config/site.ts`, see [[Editing data#Navigation, footer and social links]].
