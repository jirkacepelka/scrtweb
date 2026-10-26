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
  privacyPolicy: "https://scrt.network/privacy/",
} as const;

/** External destinations used in several places. */
export const links = {
  docs: "https://docs.scrt.network/secret-network-documentation",
  github: "https://github.com/Secret3dev/SecretNetwork",
  bridge: "https://dash.scrt.network/bridge",
  secretVm: "https://secretai.scrtlabs.com/",
  whitepaper: "https://secret3.dev/whitepaper/",
  explorer: "https://secretnodes.com",
  devChat: "https://t.me/+ASezlJlMwPc2NzE5",
  /** Full logo pack maintained by the foundation (Google Drive). */
  mediaPack: "https://drive.google.com/drive/folders/1PllWzY7xyJOkCE0gM8vLo46Vo7zircG9?usp=sharing",
  /** Grants and general foundation contact (from the current scrt.network grants page). */
  contactEmail: "grants@secret3.dev",
} as const;

export interface NavLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface MenuLink extends NavLink {
  /** One short line under the label in the dropdown. */
  description: string;
  /** Phosphor icon name (ph:*), shown in a small tile next to the label. */
  icon: string;
}

/** Visual of the featured card on the right of a dropdown (rendered in Header.astro). */
export type MenuVisual = "dashboard" | "apps" | "code";

export interface NavGroup {
  label: string;
  /** One line under the group name inside the dropdown. */
  intro: string;
  /** Featured card on the right of the dropdown. */
  featured: { title: string; description: string; href: string; visual: MenuVisual };
  links: MenuLink[];
  /** Prepared but not shown yet (header, mobile menu and footer skip it). */
  hidden?: boolean;
}

/**
 * Header dropdowns (desktop mega menu, grouped list on mobile), in display order:
 * Use SCRT · Build · Provide (hidden until it opens) · About. Blog is a plain link after them.
 */
const allNavGroups: NavGroup[] = [
  {
    label: "Use SCRT",
    intro: "Everything you need to hold, stake and move SCRT.",
    featured: {
      title: "Secret Dashboard",
      description: "Stake, bridge and wrap SCRT in one place.",
      href: site.dashboardUrl,
      visual: "dashboard",
    },
    links: [
      {
        label: "Get SCRT",
        href: "/scrt#get-scrt",
        description: "Exchanges, card on-ramps and swaps.",
        icon: "ph:coins",
      },
      {
        label: "Wallets",
        href: "/wallets",
        description: "Pick a wallet and keep it safe.",
        icon: "ph:wallet",
      },
      {
        label: "Staking",
        href: "/staking",
        description: "Earn rewards and secure the network.",
        icon: "ph:plant",
      },
      {
        label: "Secret Bridge",
        href: links.bridge,
        description: "Bring assets from other chains.",
        icon: "ph:bridge",
        external: true,
      },
    ],
  },
  {
    label: "Build",
    intro: "Tools, funding and the next version of Secret.",
    featured: {
      title: "Builders",
      description: "Private apps on Secret. Docs, SDKs and help.",
      href: "/builders",
      visual: "code",
    },
    links: [
      {
        label: "Builders",
        href: "/builders",
        description: "Start building on Secret.",
        icon: "ph:code",
      },
      {
        label: "Secret 2.0",
        href: "/secret-2",
        description: "Confidential machines and Secret Money.",
        icon: "ph:cpu",
      },
      {
        label: "Grants",
        href: "/grants",
        description: "Funding for privacy-preserving apps.",
        icon: "ph:hand-coins",
      },
      {
        label: "Documentation",
        href: links.docs,
        description: "Guides, SDKs and node setup.",
        icon: "ph:book-open-text",
        external: true,
      },
      {
        label: "GitHub",
        href: links.github,
        description: "The chain and SDKs. Open source.",
        icon: "ph:github-logo",
        external: true,
      },
    ],
  },
  {
    // Opens with Secret 2.0: operators who run the network's machines and storage.
    // TODO: add a /provide page, then remove `hidden`.
    label: "Provide",
    intro: "Run the infrastructure Secret runs on.",
    hidden: true,
    featured: {
      title: "Provide",
      description: "Run validators, confidential machines or storage.",
      href: "/provide",
      visual: "code",
    },
    links: [
      {
        label: "Validators",
        href: "/provide#validators",
        description: "Produce blocks and secure the chain.",
        icon: "ph:shield-check",
      },
      {
        label: "Confidential machines",
        href: "/provide#machines",
        description: "Run private programs on admitted hardware.",
        icon: "ph:cpu",
      },
      {
        label: "Storage",
        href: "/provide#storage",
        description: "Store encrypted data for apps.",
        icon: "ph:hard-drives",
      },
    ],
  },
  {
    label: "About",
    intro: "The network, the people behind it and where it is heading.",
    featured: {
      title: "Ecosystem",
      description: "Private DeFi, wallets, AI and tools built on Secret.",
      href: "/ecosystem",
      visual: "apps",
    },
    links: [
      {
        label: "Ecosystem",
        href: "/ecosystem",
        description: "Every app on Secret, by category.",
        icon: "ph:squares-four",
      },
      {
        label: "SCRT",
        href: "/scrt",
        description: "The token: supply, staking and uses.",
        icon: "ph:currency-circle-dollar",
      },
      {
        label: "Roadmap",
        href: "/roadmap",
        description: "What is built and what comes next.",
        icon: "ph:path",
      },
      {
        label: "Secret Foundation",
        href: "/foundation",
        description: "Who looks after the network.",
        icon: "ph:bank",
      },
      {
        label: "Community",
        href: "/community",
        description: "Chats, forum and governance.",
        icon: "ph:users-three",
      },
      {
        label: "Brand assets",
        href: "/brand",
        description: "Logos, colours and usage.",
        icon: "ph:paint-brush",
      },
    ],
  },
];

export const navGroups = allNavGroups.filter((g) => !g.hidden);

/** Plain header links after the dropdowns. */
export const navLinks: NavLink[] = [{ label: "Blog", href: "/blog" }];

/** Header buttons: a quiet one and the primary one. */
export const headerActions: { secondary: NavLink; primary: NavLink } = {
  secondary: { label: "Get SCRT", href: "/scrt#get-scrt" },
  primary: { label: "Open Dashboard", href: site.dashboardUrl, external: true },
};

export const social = {
  x: "https://x.com/secretrebooted",
  telegram: "https://t.me/SCRTCommunity",
  forum: "https://forum.scrt.network",
  github: links.github,
  youtube: "https://www.youtube.com/@SecretNetwork",
  instagram: "https://www.instagram.com/scrtnetwork/",
} as const;

export const socialLinks: { label: string; href: string; icon: string }[] = [
  { label: "X (Twitter)", href: social.x, icon: "ph:x-logo" },
  { label: "Telegram", href: social.telegram, icon: "ph:telegram-logo" },
  { label: "Forum", href: social.forum, icon: "ph:chats-circle" },
  { label: "GitHub", href: social.github, icon: "ph:github-logo" },
  { label: "YouTube", href: social.youtube, icon: "ph:youtube-logo" },
];

/** Footer columns: one per visible nav group, with a few extras. */
export const footerNav: { title: string; links: NavLink[] }[] = navGroups.map((g) => ({
  title: g.label,
  links: [
    ...g.links,
    ...(g.label === "Use SCRT"
      ? [{ label: "Dashboard", href: site.dashboardUrl, external: true }]
      : []),
    ...(g.label === "About"
      ? [
          { label: "Blog", href: "/blog" },
          { label: "Explorer", href: links.explorer, external: true },
        ]
      : []),
  ],
}));

export const legalLinks: NavLink[] = [
  { label: "Privacy", href: legacyPages.privacyPolicy, external: true },
];
