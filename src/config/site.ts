/**
 * Global site settings: name, navigation, footer and social links.
 * Every link that appears in the header or footer is defined here and nowhere else.
 */

export const site = {
  name: "Secret Network",
  shortName: "Secret",
  description:
    "Secret Network is a privacy-first blockchain. Get SCRT, choose a wallet, stake to secure the network and use apps that keep your data encrypted.",
  ogImage: "/og-default.png",
  /** External app most CTAs point to (staking, bridging, wrapping). */
  dashboardUrl: "https://dash.scrt.network",
} as const;

/**
 * Pages that exist only on the CURRENT scrt.network and have no equivalent here yet.
 * TODO before launch on scrt.network: build these pages or point them to their new home,
 * otherwise these links break once this site replaces the old one.
 */
export const legacyPages = {
  grants: "https://scrt.network/developers/grants/",
  secretVm: "https://scrt.network/confidential-computing-layer/",
  privacyPolicy: "https://scrt.network/privacy/",
} as const;

export interface NavLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface MenuLink extends NavLink {
  /** One short line under the label in the dropdown. */
  description: string;
}

/** Visual of the large card on the left of a dropdown (rendered in Header.astro). */
export type MenuVisual = "dashboard" | "apps" | "code";

export interface NavGroup {
  label: string;
  /** Large card on the left of the dropdown. */
  featured: { title: string; description: string; href: string; visual: MenuVisual };
  /** Optional blog post id shown as a second "related" card next to the featured one. */
  relatedPost?: string;
  links: MenuLink[];
}

/** Header dropdowns (desktop mega menu, grouped list on mobile). Keep to three groups. */
export const navGroups: NavGroup[] = [
  {
    label: "Use SCRT",
    featured: {
      title: "Secret Dashboard",
      description: "Stake, bridge and wrap SCRT in one place.",
      href: site.dashboardUrl,
      visual: "dashboard",
    },
    relatedPost: "how-to-stake-scrt",
    links: [
      { label: "SCRT", href: "/scrt", description: "The coin: facts, uses and where to get it." },
      { label: "Wallets", href: "/wallets", description: "Pick a wallet and keep it safe." },
      { label: "Staking", href: "/staking", description: "Earn rewards and secure the network." },
    ],
  },
  {
    label: "Ecosystem",
    featured: {
      title: "Ecosystem",
      description: "Private DeFi, wallets, AI and tools built on Secret.",
      href: "/ecosystem",
      visual: "apps",
    },
    relatedPost: "what-is-private-on-secret",
    links: [
      { label: "Ecosystem", href: "/ecosystem", description: "Every app on Secret, by category." },
      {
        label: "SecretVM",
        href: "https://secretai.scrtlabs.com/",
        description: "Confidential VMs for any workload.",
        external: true,
      },
      {
        label: "Secret Bridge",
        href: "https://dash.scrt.network/bridge",
        description: "Bring assets from other chains.",
        external: true,
      },
    ],
  },
  {
    label: "Build",
    featured: {
      title: "Builders",
      description: "Encrypted contracts in Rust. Docs, grants and help.",
      href: "/builders",
      visual: "code",
    },
    links: [
      {
        label: "Documentation",
        href: "https://docs.scrt.network/secret-network-documentation",
        description: "Guides for contracts, secret.js and nodes.",
        external: true,
      },
      {
        label: "Grants",
        href: legacyPages.grants,
        description: "Funding for privacy-preserving apps.",
        external: true,
      },
      {
        label: "GitHub",
        href: "https://github.com/Secret3dev/SecretNetwork",
        description: "The chain and SDKs. Open source.",
        external: true,
      },
    ],
  },
];

/** Plain header links after the dropdowns. */
export const navLinks: NavLink[] = [
  { label: "Roadmap", href: "/roadmap" },
  { label: "Blog", href: "/blog" },
];

/** Header buttons: a quiet one and the primary one. */
export const headerActions: { secondary: NavLink; primary: NavLink } = {
  secondary: { label: "Get SCRT", href: "/scrt#get-scrt" },
  primary: { label: "Open Dashboard", href: site.dashboardUrl, external: true },
};

export const social = {
  x: "https://x.com/secretrebooted",
  telegram: "https://t.me/SCRTCommunity",
  forum: "https://forum.scrt.network",
  github: "https://github.com/Secret3dev/SecretNetwork",
  youtube: "https://www.youtube.com/@SecretNetwork",
} as const;

export const socialLinks: { label: string; href: string; icon: string }[] = [
  { label: "X (Twitter)", href: social.x, icon: "ph:x-logo" },
  { label: "Telegram", href: social.telegram, icon: "ph:telegram-logo" },
  { label: "Forum", href: social.forum, icon: "ph:chats-circle" },
  { label: "GitHub", href: social.github, icon: "ph:github-logo" },
  { label: "YouTube", href: social.youtube, icon: "ph:youtube-logo" },
];

export const footerNav: { title: string; links: NavLink[] }[] = [
  {
    title: "Use SCRT",
    links: [
      { label: "SCRT", href: "/scrt" },
      { label: "Wallets", href: "/wallets" },
      { label: "Staking", href: "/staking" },
      { label: "Dashboard", href: site.dashboardUrl, external: true },
    ],
  },
  {
    title: "Build",
    links: [
      { label: "Builders", href: "/builders" },
      {
        label: "Documentation",
        href: "https://docs.scrt.network/secret-network-documentation",
        external: true,
      },
      { label: "GitHub", href: social.github, external: true },
      { label: "Grants", href: legacyPages.grants, external: true },
    ],
  },
  {
    title: "Network",
    links: [
      { label: "Ecosystem", href: "/ecosystem" },
      { label: "Roadmap", href: "/roadmap" },
      { label: "Blog", href: "/blog" },
      { label: "Explorer", href: "https://secretnodes.com", external: true },
      { label: "Governance forum", href: social.forum, external: true },
    ],
  },
];

export const legalLinks: NavLink[] = [
  { label: "Privacy", href: legacyPages.privacyPolicy, external: true },
];
