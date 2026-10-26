/** Developer resources on the Builders page. */
import { links } from "../config/site";

export interface Resource {
  title: string;
  description: string;
  href: string;
  icon: string;
  cta: string;
}

export const builderResources: Resource[] = [
  {
    title: "Documentation",
    description:
      "Guides for Secret contracts in Rust, secret.js, permits, viewing keys and running a node.",
    href: links.docs,
    icon: "ph:book-open-text",
    cta: "Read the docs",
  },
  {
    title: "GitHub",
    description: "The chain, the SDKs and example contracts. Open source.",
    href: links.github,
    icon: "ph:github-logo",
    cta: "View source",
  },
  {
    title: "Grants",
    description: "Funding for teams building privacy-preserving apps and infrastructure.",
    href: "/grants",
    icon: "ph:hand-coins",
    cta: "See grants",
  },
  {
    title: "Developer chat",
    description: "Ask questions and get help from core developers and other builders.",
    href: links.devChat,
    icon: "ph:telegram-logo",
    cta: "Join on Telegram",
  },
];

export const builderPrimitives: { title: string; body: string }[] = [
  {
    title: "Encrypted contract state",
    body: "Contracts run inside secure enclaves. Inputs, outputs and stored state stay encrypted, even to node operators.",
  },
  {
    title: "Private tokens (SNIP-20)",
    body: "Balances and transfer amounts are hidden. Users reveal them only with a viewing key or permit.",
  },
  {
    title: "Confidential VMs",
    body: "SecretVM runs whole workloads, including AI agents, in attested confidential virtual machines.",
  },
  {
    title: "Cross-chain privacy",
    body: "Keep your app on its home chain and call Secret over IBC or bridges for the parts that must stay private.",
  },
];
