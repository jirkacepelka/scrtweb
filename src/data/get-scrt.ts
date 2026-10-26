/** Ways to acquire SCRT. Availability depends on the user's jurisdiction. */

export interface Venue {
  name: string;
  href: string;
  /** Square icon in public/logos/. Omit to show the name only. */
  logo?: string;
  /** Dark logos need a light tile to stay visible. */
  logoOnLight?: boolean;
  note?: string;
}

export interface AcquirePath {
  id: string;
  title: string;
  description: string;
  icon: string;
  /** Who this route suits, one short line. */
  goodIf: string;
  venues: Venue[];
}

export const acquirePaths: AcquirePath[] = [
  {
    id: "exchange",
    goodIf: "You are new to crypto",
    title: "Buy on an exchange",
    description:
      "The simplest route. Create an account, buy SCRT, then withdraw it to your own wallet.",
    icon: "ph:bank",
    venues: [
      { name: "Kraken", href: "https://www.kraken.com/", logo: "/logos/kraken.png" },
      { name: "Gate.io", href: "https://www.gate.io/trade/SCRT_USDT", logo: "/logos/gateio.png" },
    ],
  },
  {
    id: "card",
    goodIf: "You want SCRT in your wallet right away",
    title: "Buy with a card",
    description:
      "Fiat on-ramps send SCRT straight to your wallet address. No exchange account needed.",
    icon: "ph:credit-card",
    venues: [
      { name: "Transak", href: "https://global.transak.com/", logo: "/logos/transak.png" },
      { name: "Kado", href: "https://app.kado.money/", logo: "/logos/kado.png", logoOnLight: true },
    ],
  },
  {
    id: "dex",
    goodIf: "You already hold Cosmos tokens",
    title: "Swap on a DEX",
    description:
      "Already hold Cosmos tokens like ATOM or OSMO? Swap them for SCRT without leaving your wallet.",
    icon: "ph:arrows-left-right",
    venues: [
      {
        name: "Osmosis",
        href: "https://app.osmosis.zone/?from=ATOM&to=SCRT",
        logo: "/logos/osmosis.png",
      },
    ],
  },
  {
    id: "bridge",
    goodIf: "Your funds are on Ethereum or another chain",
    title: "Bridge from another chain",
    description:
      "Move assets from Ethereum, other EVM chains or IBC networks to Secret, then swap.",
    icon: "ph:bridge",
    venues: [
      { name: "Secret Bridge", href: "https://dash.scrt.network/bridge", logo: "/favicon.svg" },
    ],
  },
];
