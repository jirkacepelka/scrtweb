---
tags: [content, development]
---

# Adding a page

Example: an `/apps` page.

1. **Data first.** If the page lists things, create `src/data/apps.ts` with a typed array (copy the pattern from `wallets.ts`).
2. **Create the page** `src/pages/apps.astro`:

```astro
---
import PageLayout from "../layouts/PageLayout.astro";
import Section from "../components/ui/Section.astro";
import SectionHeading from "../components/ui/SectionHeading.astro";
import CtaBand from "../components/sections/CtaBand.astro";
import { apps } from "../data/apps";
---

<PageLayout
  title="Apps"
  intro="One sentence that says what the visitor can do here."
  description="SEO description, around 150 characters."
>
  <Section>
    <SectionHeading title="…" />
    <!-- reuse section components; build a new one in components/sections/ if needed -->
  </Section>

  <CtaBand title="…" primary={{ label: "…", href: "…" }} />
</PageLayout>
```

3. **Add it to navigation** in `src/config/site.ts` (a `navGroups` entry, `navLinks` and/or `footerNav`).
4. **Check** with `npm run dev`, at desktop and phone width.
5. **Document** any new section component in [[Section components]].

The sitemap picks the page up automatically.

## Checklist for a good page

- The title is the page's name, exactly as in the navigation. The pitch goes in `intro`.
- One primary action.
- Different section layouts in sequence, not the same card grid three times.
- At most one eyebrow per three sections, one `CtaBand` at the end.
- Copy follows [[Design System#Copy rules]].
