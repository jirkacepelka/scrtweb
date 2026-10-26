/**
 * Static network and token figures shown on the site.
 * Read from mainnet (secret-4) LCD on the date below. Re-check before changing `asOf`.
 * Where each figure comes from: docs/Content/Editing data.md#Network figures
 */
export const statsAsOf = "2026-10-26";

export const network = {
  chainId: "secret-4",
  denom: "SCRT",
  /** Smallest unit: 1 SCRT = 1,000,000 uscrt. */
  baseDenom: "uscrt",
  decimals: 6,
  unbondingDays: 21,
  activeValidators: 25,
  maxValidators: 80,
  votingPeriodDays: 7,
  quorumPercent: 33.4,
  slashDoubleSignPercent: 5,
  slashDowntimePercent: 0.01,
  downtimeJailMinutes: 10,
  /** blocks_per_year from /cosmos/mint/v1beta1/params: 365 * 86400 / 5435774 ≈ 5.8 s */
  blockTimeSeconds: 5.8,
} as const;

export const token = {
  /** /cosmos/bank/v1beta1/supply/by_denom?denom=uscrt, in SCRT */
  totalSupply: 1_456_616_114,
  /** /cosmos/staking/v1beta1/pool bonded_tokens, in SCRT */
  staked: 846_849_842,
  /** /cosmos/mint/v1beta1/inflation (fixed: inflation_min = inflation_max) */
  inflationPercent: 5,
  /** /cosmos/distribution/v1beta1/params community_tax */
  communityTaxPercent: 0,
  /** annual_provisions / bonded_tokens, before validator commission */
  stakingRewardPercent: 8.6,
} as const;

export const stakedPercent = Math.round((token.staked / token.totalSupply) * 100);

/** "1.46B", "847M" */
export const compact = (n: number) =>
  new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 2 }).format(n);

export interface Stat {
  value: string;
  label: string;
  note?: string;
}

export const homeStats: Stat[] = [
  {
    value: `${network.activeValidators}`,
    label: "Active validators",
    note: `of ${network.maxValidators} slots`,
  },
  { value: `${network.unbondingDays} days`, label: "Unbonding period", note: "to unstake SCRT" },
  { value: `${network.votingPeriodDays} days`, label: "Governance vote", note: "per proposal" },
  { value: `${network.quorumPercent}%`, label: "Quorum", note: "of staked SCRT must vote" },
];

/** Facts on the SCRT page, grouped. */
export const scrtFacts: { title: string; items: Stat[] }[] = [
  {
    title: "Coin",
    items: [
      { value: compact(token.totalSupply), label: "Total supply", note: "SCRT" },
      { value: `${stakedPercent}%`, label: "Staked", note: `${compact(token.staked)} SCRT` },
      { value: `${token.inflationPercent}%`, label: "Inflation", note: "per year, fixed" },
      {
        value: `~${token.stakingRewardPercent}%`,
        label: "Staking rewards",
        note: "per year, before commission",
      },
    ],
  },
  {
    title: "Network",
    items: [
      { value: network.chainId, label: "Chain ID", note: "Cosmos SDK, proof of stake" },
      {
        value: `${network.activeValidators}`,
        label: "Active validators",
        note: `of ${network.maxValidators} slots`,
      },
      {
        value: `~${Math.round(network.blockTimeSeconds)} s`,
        label: "Block time",
        note: "final in one block",
      },
      { value: `${network.unbondingDays} days`, label: "Unbonding", note: "to unstake SCRT" },
    ],
  },
];
