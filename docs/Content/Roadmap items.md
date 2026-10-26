---
tags: [content]
---

# Roadmap items

The roadmap shows **Secret 2.0** component by component: how far each part is, grouped into three tracks.

| Track                | What it covers                                                                                                                |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `zone`: Secret Zone  | The things people use: Edge, Zone UI, Accounts, Sites, App, Secret Money, Scheduler, Builder, Key machines, Encrypted storage |
| `chain`: Chain       | The public record: Program, Host, Vault, Checkpoint, PCCS, plus the existing bank/staking/governance/IBC modules              |
| `networks`: Networks | The rollout, in order: Alphanet, Testnet, Mainnet                                                                             |

Track names, taglines and notes are in `src/data/roadmap.ts` (`tracks`).

## Editing

All components live in **one file**: `src/content/roadmap.yaml`. Order in the file is the order on the page.

```yaml
- id: secret-money # also the anchor: /roadmap#arch-secret-money
  track: zone # zone | chain | networks
  title: Secret Money
  status: in-progress # built | live | in-progress | planned | later (optional)
  readiness: 99 # 0-100, code readiness estimate (optional)
  summary: The system program for private balances and transfers of wrapped coins.
  connects: [vault, checkpoint] # related components (optional)
```

- **Leave `status` or `readiness` out when you don't know them.** The page then shows no badge, or "No readiness figure published". Never guess.
- `summary`: one or two plain sentences, max 220 characters. Shown in the component's popup.
- `connects`: ids of related components, shown as "Connects to" cards in the popup. Links work **both ways** automatically (list a pair on one side only, or both), and an unknown id fails the build.
- When you update readiness figures, also update `roadmapAsOf` in `src/data/roadmap.ts`. The page shows that date under the summary.

The build validates every entry (schema in `src/content.config.ts`): a typo in `track` or `status`, or a readiness above 100, fails the build with the file and field named.

## Computed figures

The "Overall" and per-track percentages are **averages computed from the YAML** (`getRoadmap()` in `src/lib/content.ts`), counting only entries that have a readiness. Nothing to update by hand.

## Where it appears

- `/roadmap`: one row with the "How Secret 2.0 is built" note (`roadmapIntro` in `src/data/roadmap.ts`) next to the readiness summary. Below, the three tracks as **collapsible rows, closed by default** (track name, component count, average). Open a track to see compact cards (name, status, readiness); click a card for a popup with the summary and the connected components, which open in turn. "See every component" expands all tracks.
- Homepage: the readiness summary as a teaser, linking to each track.

Deep links open the right place automatically:

- `/roadmap#track-chain` opens that track,
- `/roadmap#arch-secret-money` opens its track and the component's popup. Opening a popup also updates the address, so it can be copied and shared.
