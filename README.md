# Secret Network website

The scrt.network website: a static Astro site deployed on Vercel. It explains what an ordinary user can do with SCRT (wallets, buying, staking), and has room for apps and confidential computing as they open up.

## Quick start

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # production build
npm run check    # type check
```

Requires Node.js 22.23 or newer.

## Documentation

Full documentation lives in [`docs/`](docs/00%20Index.md), an Obsidian vault. Open the folder as a vault in Obsidian, or read the Markdown on GitHub.

- [Architecture](docs/Architecture.md)
- [Design System](docs/Design%20System.md)
- [How to write a blog post](docs/Content/How%20to%20write%20a%20blog%20post.md)
- [Editing data](docs/Content/Editing%20data.md) (wallets, exchanges, figures, links)
- [Vercel](docs/Deployment/Vercel.md)
- [Launch checklist](docs/Launch%20checklist.md)

## Stack

Astro 7 (static) · Tailwind CSS v4 · MDX content collections · astro-icon (Phosphor) · Geist fonts · Vercel adapter
