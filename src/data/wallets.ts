/** Wallets that support SCRT. Order = display order; the `recommended` one is shown large. */

export type WalletPlatform = "Extension" | "Mobile" | "Desktop" | "Hardware";

export interface Wallet {
  name: string;
  href: string;
  description: string;
  platforms: WalletPlatform[];
  /** Best fit, shown as a short label on the card. */
  bestFor: string;
  /** Square icon in public/logos/ (128px PNG is enough). */
  logo: string;
  /** Dark logos need a light tile to stay visible on the dark site. */
  logoOnLight?: boolean;
  recommended?: boolean;
  /** Reasons shown next to the recommended wallet. */
  highlights?: string[];
}

export const wallets: Wallet[] = [
  {
    name: "Keplr",
    href: "https://www.keplr.app/",
    description:
      "The most widely used wallet in the Cosmos ecosystem. Stake, vote and use Secret apps from your browser or phone.",
    platforms: ["Extension", "Mobile"],
    bestFor: "Most people",
    logo: "/logos/keplr.png",
    recommended: true,
    highlights: [
      "Works with the Secret Dashboard and most Secret apps",
      "Stake, claim rewards and vote in governance",
      "Pairs with a Ledger for extra security",
    ],
  },
  {
    name: "Leap",
    href: "https://www.leapwallet.io/",
    description:
      "A Cosmos wallet with a clean mobile app and browser extension, with built-in staking.",
    platforms: ["Extension", "Mobile"],
    bestFor: "Mobile first",
    logo: "/logos/leap.png",
  },
  {
    name: "Ledger",
    href: "https://support.ledger.com/hc/en-us/articles/6094079699357-Secret-SCRT-?docs=true",
    description:
      "Keep your keys offline on a hardware device. Pair it with Keplr or Leap to sign transactions.",
    platforms: ["Hardware"],
    bestFor: "Larger balances",
    logo: "/logos/ledger.png",
    logoOnLight: true,
  },
  {
    name: "StarShell",
    href: "https://starshell.net/",
    description:
      "A privacy-focused wallet built for Secret Network, with native support for private tokens.",
    platforms: ["Extension", "Mobile"],
    bestFor: "Secret power users",
    logo: "/logos/starshell.png",
  },
];
