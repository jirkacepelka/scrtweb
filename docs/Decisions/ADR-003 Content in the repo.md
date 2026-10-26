---
tags: [decision]
status: accepted
date: 2026-10-25
---

# ADR-003 Content in the repo

**Context.** The blog and roadmap need to be editable. Options were a headless CMS or Markdown in the repository.

**Decision.** Markdown/MDX in Astro content collections (`src/content/`), with Zod schemas. Structured lists (wallets, exchanges, figures) are typed TypeScript files in `src/data/`.

**Consequences.**

- No CMS account, cost or API dependency. Content is versioned with the code and reviewed in pull requests.
- Invalid content fails the build instead of breaking the live site.
- Editors need basic Git (or GitHub's web editor). Posts can be drafted in Obsidian.
- A CMS can be added later (for example a Git-based one like Decap or TinaCMS) on top of the same files without changing the site.
