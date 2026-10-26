/**
 * Copy and links for the About and Build pages that are mostly text: Secret Foundation,
 * Community, Grants and Brand assets.
 *
 * Sources (read 2026-10-26): scrt.network/about/secret-network-foundation/,
 * scrt.network/developers/grants/, scrt.network/media-package/ and the homepage footer.
 * Nothing here should go beyond what those pages state: no team names, grant sizes or review
 * timelines until the foundation publishes them.
 */
import { links, social } from "../config/site";
import { network } from "./stats";

// ---- Secret Foundation ----

export const foundationRoles: { title: string; body: string; icon: string; href?: string }[] = [
  {
    title: "Stewardship of the chain",
    body: "Looks after Secret Network's layer 1 on behalf of the community, on the same chain and with the same SCRT.",
    icon: "ph:shield-check",
  },
  {
    title: "Secret 2.0",
    body: "Publishes the design and the roadmap for moving private apps to confidential machines.",
    icon: "ph:cpu",
    href: "/secret-2",
  },
  {
    title: "Grants",
    body: "Funds teams building privacy-preserving apps, infrastructure and tooling on Secret.",
    icon: "ph:hand-coins",
    href: "/grants",
  },
  {
    title: "Network tools",
    body: "Keeps the everyday tools running: the Secret Dashboard, the bridges and the app registry.",
    icon: "ph:wrench",
    href: links.bridge,
  },
];

/** Milestones the foundation page mentions. No dates are given there, so none here. */
export const foundationNotes: { title: string; body: string }[] = [
  {
    title: "Community continuance",
    body: "The community voted for Secret Network's layer 1 to continue under community stewardship. The discussion and vote are on the forum.",
  },
  {
    title: "New explorer",
    body: "Mintscan is being retired. secretnodes.com is the explorer for Secret Network.",
  },
  {
    title: "Secret Zone",
    body: "The first Secret 2.0 experience, where apps run as confidential programs, is in private testing.",
  },
];

// ---- Community ----

export interface Channel {
  name: string;
  description: string;
  href: string;
  icon: string;
}

export const channels: Channel[] = [
  {
    name: "Telegram",
    description: "The main community chat. Questions, news and help.",
    href: social.telegram,
    icon: "ph:telegram-logo",
  },
  {
    name: "Forum",
    description: "Long-form discussion and every governance proposal before it goes on chain.",
    href: social.forum,
    icon: "ph:chats-circle",
  },
  {
    name: "X",
    description: "Announcements and updates.",
    href: social.x,
    icon: "ph:x-logo",
  },
  {
    name: "Developer chat",
    description: "Telegram group for builders and core developers.",
    href: links.devChat,
    icon: "ph:code",
  },
  {
    name: "YouTube",
    description: "Talks, guides and community calls.",
    href: social.youtube,
    icon: "ph:youtube-logo",
  },
  {
    name: "Instagram",
    description: "The visual side of Secret.",
    href: social.instagram,
    icon: "ph:instagram-logo",
  },
];

export const governanceSteps: { title: string; body: string }[] = [
  {
    title: "Discuss on the forum",
    body: "Ideas start as forum posts, so the community can shape them before anything is put to a vote.",
  },
  {
    title: "Submit on chain",
    body: "A proposal goes on chain with a deposit and is open for voting.",
  },
  {
    title: `Vote for ${network.votingPeriodDays} days`,
    body: `Everyone who stakes SCRT can vote. At least ${network.quorumPercent}% of staked SCRT has to take part for the result to count.`,
  },
];

export const contribute: { title: string; body: string; href: string; icon: string }[] = [
  {
    title: "Stake and vote",
    body: "Delegate to a validator outside the top few and vote on proposals.",
    href: "/staking",
    icon: "ph:check-square",
  },
  {
    title: "Build an app",
    body: "Ship something private. Grants are available.",
    href: "/builders",
    icon: "ph:code",
  },
  {
    title: "Report an issue",
    body: "Found a bug in the chain or the SDKs? Open an issue on GitHub.",
    href: `${links.github}/issues`,
    icon: "ph:bug",
  },
];

// ---- Grants ----

export const grantAreas: { title: string; body: string; icon: string }[] = [
  {
    title: "Secret apps",
    body: "Consumer apps where privacy is the point, not an add-on.",
    icon: "ph:squares-four",
  },
  {
    title: "DeFi",
    body: "Trading, lending and payments without exposing positions and balances.",
    icon: "ph:chart-line-up",
  },
  {
    title: "Infrastructure",
    body: "Nodes, indexers, explorers and the services other builders rely on.",
    icon: "ph:hard-drives",
  },
  {
    title: "Tooling",
    body: "SDKs, libraries and developer tools that make Secret easier to build on.",
    icon: "ph:wrench",
  },
  {
    title: "Private integrations",
    body: "Apps on other chains that call Secret over IBC or bridges for their private parts.",
    icon: "ph:plugs-connected",
  },
];

/** What a first email should cover. Guidance only, not an official form. */
export const grantProposal = [
  "What you are building, in two or three sentences",
  "Why it needs privacy, and what stays encrypted",
  "Who is on the team and what you have shipped before",
  "Milestones and the funding you are asking for",
];

// ---- Brand ----

export const logoFiles: { name: string; file: string; preview: "dark" | "light" }[] = [
  { name: "Wordmark, white", file: "secret-wordmark-white", preview: "dark" },
  { name: "Wordmark, black", file: "secret-wordmark-black", preview: "light" },
  { name: "Wordmark, orange", file: "secret-wordmark-orange", preview: "dark" },
  { name: "Symbol, white", file: "secret-symbol-white", preview: "dark" },
  { name: "Symbol, black", file: "secret-symbol-black", preview: "light" },
  { name: "Symbol, orange", file: "secret-symbol-orange", preview: "dark" },
];

/** Keep in sync with src/styles/tokens.css. */
export const brandColours: { name: string; hex: string; use: string; light?: boolean }[] = [
  { name: "Secret Orange", hex: "#FF3912", use: "Accent, calls to action" },
  { name: "Light Orange", hex: "#FF7D4A", use: "Highlights, gradients" },
  { name: "Black", hex: "#050505", use: "Backgrounds" },
  { name: "Charcoal", hex: "#222426", use: "Surfaces, cards" },
  { name: "White", hex: "#F4F3F1", use: "Text, logo on dark", light: true },
];

export const brandRules: { do: string[]; dont: string[] } = {
  do: [
    "Use the logo in white, black or Secret Orange",
    "Leave space around it at least the height of the symbol",
    "Place it on plain, high-contrast backgrounds",
  ],
  dont: [
    "Stretch, rotate or redraw the logo",
    "Add shadows, outlines or gradients to it",
    "Set the wordmark in another typeface",
  ],
};
