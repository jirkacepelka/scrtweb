/**
 * Secret 2.0 roadmap: page copy and track definitions. The components themselves live in
 * src/content/roadmap.yaml. Averages shown on the site are computed from that file.
 */
import type { roadmapStatus, roadmapTracks } from "../content.config";

/** Date of the readiness figures in roadmap.yaml. Update it whenever you update the figures. */
export const roadmapAsOf = "2026-10-25";

export const roadmapIntro = {
  title: "How Secret 2.0 is built",
  body: "A public chain decides who may run what. Confidential programs do the private work. Your browser or wallet talks to Edge, and pushes from GitHub arrive there too.",
};

export type TrackId = (typeof roadmapTracks)[number];
export type RoadmapStatus = (typeof roadmapStatus)[number];

export const tracks: { id: TrackId; name: string; tagline: string; note?: string }[] = [
  { id: "zone", name: "Secret Zone", tagline: "The things you use" },
  {
    id: "chain",
    name: "Chain",
    tagline: "The public record",
    note: "The chain stores rules and pointers only. Private data never goes on it.",
  },
  {
    id: "networks",
    name: "Networks",
    tagline: "Where the upgrade rolls out",
    note: "One network at a time: Alphanet, then Testnet, then Mainnet.",
  },
];

export const statusLabel: Record<RoadmapStatus, string> = {
  built: "Built",
  live: "Live",
  "in-progress": "In progress",
  planned: "Planned",
  later: "Later",
};
