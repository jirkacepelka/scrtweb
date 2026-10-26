/**
 * Ecosystem apps. The list itself comes from the official Secret dApp registry
 * (src/data/ecosystem.generated.json, refreshed by `node scripts/sync-ecosystem.mjs`).
 * This file only adds editorial choices on top: what to hide, what to feature, nicer copy.
 */
import registry from "./ecosystem.generated.json";

export interface App {
  name: string;
  slug: string;
  link: string;
  description: string;
  icon: string;
  category: AppCategory;
}

export const appCategories = [
  "DeFi",
  "Wallets",
  "Privacy tools",
  "Data & NFTs",
  "Network tools",
] as const;
export type AppCategory = (typeof appCategories)[number];

/** Not shown on the public site (developer-only or retired). */
const hidden = new Set(["testnet-faucet", "mintscan"]);

/** Shown large at the top of /ecosystem. */
export const spotlightSlugs = ["secretvm", "shade-protocol", "silent-swap", "alter"];

/** App icons floating around the homepage hero (order = placement order). */
export const heroSlugs = [
  "shade-protocol",
  "keplr-wallet",
  "secretvm",
  "alter",
  "silent-swap",
  "stashh",
  "leap-wallet",
  "amberdao",
  "certup",
  "serenity-shield",
  "secret-tokens",
  "starshell-wallet",
  "erth-network",
  "prifi-labs",
  "restake",
  "secret-bridges",
  "citadel-one",
  "pagedao",
];

/** Copy fixes and category choices per app (registry tags are inconsistent). */
const overrides: Record<string, Partial<Pick<App, "name" | "description" | "category">>> = {
  "secret-ai": { category: "Privacy tools" },
  secretvm: { category: "Privacy tools" },
  "silent-swap": {
    description: "Private cross-chain swaps that hide the link between sender and receiver.",
    category: "Privacy tools",
  },
  alter: { category: "Privacy tools" },
  "serenity-shield": { category: "Privacy tools" },
  "erth-network": {
    description: "A DeFi protocol that splits profits among verified humans.",
    category: "DeFi",
  },
  "secret-tokens": { name: "Secret Tokens", category: "Privacy tools" },
  "secret-bridges": { category: "Network tools" },
  "secret-dashboard": { category: "Network tools" },
  pagedao: { category: "Data & NFTs" },
  "starshell-wallet": { name: "StarShell" },
  "keplr-wallet": { name: "Keplr" },
  "leap-wallet": { name: "Leap" },
};

function categoryFromTags(tags: string[]): AppCategory {
  if (tags.includes("Wallet")) return "Wallets";
  if (tags.includes("DeFi")) return "DeFi";
  if (tags.includes("NFTs") || tags.includes("Data")) return "Data & NFTs";
  if (tags.includes("Communications")) return "Privacy tools";
  return "Network tools";
}

export const apps: App[] = registry
  .filter((a) => !hidden.has(a.slug))
  .map((a) => ({
    name: a.name,
    slug: a.slug,
    link: a.link,
    description: a.description,
    icon: a.icon,
    category: categoryFromTags(a.tags),
    ...overrides[a.slug],
  }));

const bySlug = new Map(apps.map((a) => [a.slug, a]));
const pick = (slugs: string[]) => slugs.map((s) => bySlug.get(s)).filter((a): a is App => !!a);

export const spotlightApps = pick(spotlightSlugs);
export const heroApps = pick(heroSlugs);
