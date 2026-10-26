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

**Rule: the visible title is the page's name, exactly as it appears in the navigation** (for example SCRT, Wallets, Staking, Builders, Secret 2.0, Grants, Ecosystem, Roadmap, Secret Foundation, Community, Brand assets, Blog; the list is in [[Pages]]), so a link, a button and the heading it leads to always match. Put the selling line in `intro`, not in the title. `heading` exists only for pages whose name is dynamic (a blog tag).

## PostLayout

Blog post template, styled like [[#PageLayout]]: a lighter header panel (dot field, orange glow from the bottom) with the back link, title, description and author/date/reading time/tags; then the article on a dark sheet that overlaps the bottom of the panel, so the header and the text read as two separate layers. The sheet holds the optional cover, the prose body (`.prose-secret` in `global.css`) and the sticky "On this page" list. Up to two related posts follow.

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

- **At the top of the page** the bar is transparent with no bottom line (the homepage hero runs underneath it). Once the page scrolls, it gets a dark blurred background and a hairline (`data-scrolled`, set by an IntersectionObserver on a sentinel at the top of the page).

- **Order:** Use SCRT · Build · (Provide, prepared but hidden) · About, then Blog as a plain link. See [[ADR-005 Navigation structure]].
- **Dropdowns** (`navGroups`): opening one expands the header into a full-width sheet with a rounded bottom. Contents:
  - the group name and its one-line `intro` (from `xl`; hidden below),
  - the links in two columns: small icon tile, label, one-line description, an arrow for external links,
  - one `featured` card (visual: `dashboard` screenshot, `apps` icon grid or `code` pattern).
- **Alignment:** columns keep fixed widths. The intro sits under the logo, the links right next to it, and the featured card is pushed to the right edge under the header buttons.
- **Motion:** one shared backdrop (`data-menu-backdrop`) sits behind all dropdowns and animates its height. Moving between dropdowns slides the old content out and the new content in from the side it is on (`--menu-shift`), instead of closing one and opening the next.
- Small type and quiet hover states on purpose; see [[Style guardrails#Header]].
- While a dropdown is open, the page behind dims (`menu-scrim`, no blur).
- Opens on hover (mouse) or click. Closes on Escape (focus returns to the trigger), outside click, or when keyboard focus leaves the sheet.
- **Plain links** (`navLinks`) follow the dropdowns. **Buttons** (`headerActions`): a quiet text button and the orange primary.
- Below `lg`: a menu button opens every link, grouped by section.

## Footer

Logo, short description, social icons, one link column per visible nav group (`footerNav`, derived from `navGroups`), legal row.

All header and footer links are edited in `config/site.ts`, see [[Editing data#Navigation, footer and social links]].
