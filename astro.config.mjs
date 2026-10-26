// @ts-check
import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";
import tailwindcss from "@tailwindcss/vite";

// Canonical URL used for sitemap, RSS and OG tags.
// Override per environment with SITE_URL (e.g. a Vercel preview domain).
const site = process.env.SITE_URL ?? "https://scrt.network";

// https://astro.build/config
export default defineConfig({
  site,
  output: "static",
  adapter: vercel({ webAnalytics: { enabled: false } }),
  integrations: [mdx(), sitemap(), icon()],
  // All redirects live here (old scrt.network URLs and renamed pages). The Vercel adapter writes
  // them into the deployment's routing, and they also work in `npm run dev`.
  redirects: {
    "/get-scrt": "/scrt",
    "/about/get-scrt": "/scrt",
    "/ecosystem/exchanges": "/scrt#get-scrt",
    "/ecosystem/wallets": "/wallets",
    "/developers/grants": "/grants",
    "/confidential-computing-layer": "/secret-2",
    "/media-package": "/brand",
    "/about/secret-network-foundation": "/foundation",
  },
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    shikiConfig: { theme: "github-dark-default" },
  },
});
