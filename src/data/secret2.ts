/**
 * Secret 2.0: the move from Secret contracts (CosmWasm in SGX enclaves on validators) to
 * confidential programs on confidential virtual machines (CVMs), with Secret Money replacing
 * sSCRT and other SNIP-20 tokens.
 *
 * Source: the Secret³ draft whitepaper (links.whitepaper) and secret3.dev/roadmap, read
 * 2026-10-26. The design is a DRAFT that governance has not ratified: every claim here must say
 * "planned", never describe it as how mainnet works today. Readiness figures come from
 * src/content/roadmap.yaml, not from this file.
 */

export const draftNotice =
  "Secret 2.0 is a draft design. Governance has not ratified it yet, and details can change before it reaches mainnet.";

export type ArchLayer = "chain" | "machines" | "money" | "storage";

export interface Secret2Part {
  layer: ArchLayer;
  title: string;
  body: string;
}

/** "How it works" switcher. */
export const parts: Secret2Part[] = [
  {
    layer: "chain",
    title: "A public chain that sets the rules",
    body: "The chain keeps balances, staking and governance, plus registries of which machines and which program versions are allowed. Validators run ordinary Cosmos software and no longer execute private logic.",
  },
  {
    layer: "machines",
    title: "Confidential machines do the private work",
    body: "Private programs run in confidential virtual machines on admitted hardware (Intel TDX is the intended platform). A machine only gets decryption keys if its code measurement and platform identity are on the allowlist.",
  },
  {
    layer: "money",
    title: "Secret Money for private balances",
    body: "A dedicated program gives coins wrapped from the chain private balances and private transfers. The coins sit in a public vault, and adding a new coin is a registry entry instead of a new token contract.",
  },
  {
    layer: "storage",
    title: "Encrypted storage that survives failures",
    body: "Programs write encrypted state to a sealed log stored by separate providers. The chain keeps only a fingerprint of it, so if a machine fails another admitted one can rebuild the state and carry on.",
  },
];

/** "What it means for you", one entry per audience. */
export const impact: { who: string; icon: string; body: string }[] = [
  {
    who: "SCRT holders",
    icon: "ph:coins",
    body: "Nothing to do. SCRT, staking, rewards and governance stay on the chain as they are today.",
  },
  {
    who: "sSCRT and private token holders",
    icon: "ph:lock-key",
    body: "The plan is to redeem old sSCRT and wrap again into Secret Money. Encrypted contract state is not carried over. Exact steps will be published on the blog before anything changes.",
  },
  {
    who: "Builders",
    icon: "ph:code",
    body: "Apps built as Secret contracts (CosmWasm) need to be rewritten as confidential programs, or they stop working after the upgrade. Grants can help with the move.",
  },
];

/** Stated limits of the design, from the whitepaper. Keep these visible on the page. */
export const limits = [
  "Confidential machines do not protect against someone with physical control of an admitted machine.",
  "Defending against side-channel attacks is still engineering work in progress.",
];
