/** Helpers for reading content collections consistently across pages. */
import { getCollection, type CollectionEntry } from "astro:content";
import { tracks } from "../data/roadmap";

export type Post = CollectionEntry<"blog">;
export type RoadmapItem = CollectionEntry<"roadmap">;

/** Published posts, newest first. Drafts are visible in `astro dev` only. */
export async function getPosts(): Promise<Post[]> {
  const posts = await getCollection("blog", ({ data }) => import.meta.env.DEV || !data.draft);
  return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export function getTags(posts: Post[]): string[] {
  return [...new Set(posts.flatMap((p) => p.data.tags))].sort();
}

export const tagSlug = (tag: string) => tag.toLowerCase().replace(/[^a-z0-9]+/g, "-");

export function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

/** Rough reading time from the raw markdown body. */
export function readingTime(body = ""): string {
  const words = body.trim().split(/\s+/).length;
  return `${Math.max(1, Math.round(words / 220))} min read`;
}

/** Average of the readiness values that exist, rounded. Undefined when none. */
const average = (items: RoadmapItem[]) => {
  const values = items.map((i) => i.data.readiness).filter((v): v is number => v !== undefined);
  return values.length ? Math.round(values.reduce((a, b) => a + b, 0) / values.length) : undefined;
};

/**
 * Roadmap grouped by track (order from src/data/roadmap.ts), with computed averages and
 * two-way connections (`related`: id -> related items). Unknown ids in `connects` fail the build.
 */
export async function getRoadmap() {
  const items = (await getCollection("roadmap")).sort((a, b) => a.data.order - b.data.order);
  const byId = new Map(items.map((i) => [i.id, i]));
  const links = new Map<string, Set<string>>(items.map((i) => [i.id, new Set()]));
  for (const item of items) {
    for (const other of item.data.connects) {
      if (!byId.has(other)) {
        throw new Error(`roadmap.yaml: "${item.id}" connects to unknown id "${other}"`);
      }
      links.get(item.id)!.add(other);
      links.get(other)!.add(item.id);
    }
  }
  const related = new Map(
    [...links].map(([id, set]) => [
      id,
      items.filter((i) => set.has(i.id)), // keep file order
    ]),
  );
  const groups = tracks.map((track) => {
    const trackItems = items.filter((i) => i.data.track === track.id);
    return { ...track, items: trackItems, readiness: average(trackItems) };
  });
  return { tracks: groups, overall: average(items), related };
}
