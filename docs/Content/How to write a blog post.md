---
tags: [content]
---

# How to write a blog post

Posts are Markdown files in `src/content/blog/`. One file = one post. The file name becomes the URL:

`src/content/blog/secretvm-for-ai-agents.md` → `/blog/secretvm-for-ai-agents`

Use lowercase words joined by hyphens. Don't rename a published post (it changes the URL).

## Template

```markdown
---
title: "SecretVM now runs AI agents"
description: "One or two sentences. Shown on cards, in search results and social previews."
pubDate: 2026-11-03
tags: ["Announcements", "AI"]
# optional:
author: "Secret Network"
updatedDate: 2026-11-10
cover: ./images/secretvm-agents.jpg
coverAlt: "Describe the image for screen readers"
draft: true
---

Intro paragraph.

## A section heading

Text, **bold**, [links](/staking), lists, `code`, images…
```

## Fields

| Field         | Required     | Notes                                                                                                                                    |
| ------------- | ------------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `title`       | yes          | Max 90 characters                                                                                                                        |
| `description` | yes          | Max 200 characters                                                                                                                       |
| `pubDate`     | yes          | `YYYY-MM-DD`. Posts are sorted newest first                                                                                              |
| `tags`        | no           | Reuse existing tags where possible: `Announcements`, `Guides`, `Staking`, `Privacy`, `Learn`. Each tag gets a page at `/blog/tags/<tag>` |
| `author`      | no           | Defaults to "Secret Network"                                                                                                             |
| `updatedDate` | no           | Shown as "Updated …"                                                                                                                     |
| `cover`       | no           | Path relative to the post file. Put images in `src/content/blog/images/`. Astro optimises them automatically. Recommended 1600×1000      |
| `coverAlt`    | with `cover` | Alt text                                                                                                                                 |
| `draft`       | no           | `true` = visible in `npm run dev`, hidden from the built site, RSS and sitemap                                                           |

If a field is wrong or missing, **the build fails** and tells you which file and field. That's on purpose (schema in `src/content.config.ts`).

## Covers and table of contents

- No `cover`? The post gets a generated, on-brand cover automatically (see [[UI primitives#PostCover]]). Add a real image only when it adds information.
- Every `##` heading appears in the "On this page" list next to the post (desktop), once a post has two or more. Keep headings short.
- The newest post is shown large at the top of `/blog`.

## Writing tips

- Use `##` for section headings (the post title is already the `h1`).
- Link to site pages with relative links: `[staking guide](/staking)`.
- Follow the [[Design System#Copy rules]]: plain language, no em dashes, no hype.
- Anything about privacy must follow [[Privacy claims]].
- Use `.mdx` instead of `.md` if you need to embed an Astro component in the post.

## Writing in Obsidian

You can write posts in Obsidian too: add `src/content/blog/` as a separate vault, or symlink it. Stick to standard Markdown links (`[text](/url)`), not `[[wikilinks]]`, because the website doesn't understand wikilinks.

## Publishing

Commit and push. Vercel builds a preview for your branch; merging to `main` publishes it. See [[Vercel]].

The homepage shows the three newest posts automatically; the RSS feed at `/rss.xml` updates too.
