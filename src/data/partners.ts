/**
 * Partner logo wall on the homepage.
 * Marks are from Simple Icons (CC0), stored in public/partners/<slug>.svg (fill #a3a3a3).
 * Download a new one: https://cdn.simpleicons.org/<slug>/a3a3a3
 * Only list partners named on the current scrt.network homepage.
 */
export interface Partner {
  name: string;
  slug: string;
  /** The logo already contains the name, so don't print it next to the mark. */
  wordmark?: boolean;
}

export const partners: Partner[] = [
  { name: "Intel", slug: "intel", wordmark: true },
  { name: "NVIDIA", slug: "nvidia" },
  { name: "Polygon", slug: "polygon" },
  { name: "Optimism", slug: "optimism" },
];
