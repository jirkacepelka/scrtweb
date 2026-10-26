/**
 * Content collections. Schemas are enforced at build time: a post or roadmap item
 * with a missing or wrong field fails the build with a clear error.
 * See docs/Content/ for how to add entries.
 */
import { defineCollection } from "astro:content";
import { file, glob } from "astro/loaders";
import { z } from "astro/zod";
import { parse as parseYaml } from "yaml";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
  schema: ({ image }) =>
    z.object({
      title: z.string().max(90),
      description: z.string().max(200),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      author: z.string().default("Secret Network"),
      tags: z.array(z.string()).default([]),
      cover: image().optional(),
      coverAlt: z.string().optional(),
      draft: z.boolean().default(false),
    }),
});

export const roadmapTracks = ["zone", "chain", "networks"] as const;
export const roadmapStatus = ["built", "live", "in-progress", "planned", "later"] as const;

/** Secret 2.0 components, one YAML file (src/content/roadmap.yaml). Order in the file = page order. */
const roadmap = defineCollection({
  // The parser adds each entry's position so the page keeps the file's order.
  loader: file("src/content/roadmap.yaml", {
    parser: (text) =>
      (parseYaml(text) as Record<string, unknown>[]).map((entry, order) => ({ ...entry, order })),
  }),
  schema: z.object({
    order: z.number().int(),
    track: z.enum(roadmapTracks),
    title: z.string(),
    status: z.enum(roadmapStatus).optional(),
    /** Code readiness estimate, 0..100. Omit when the source gives none. */
    readiness: z.number().int().min(0).max(100).optional(),
    summary: z.string().max(220),
    /** Ids of related components. Links are made two-way in getRoadmap(). */
    connects: z.array(z.string()).default([]),
  }),
});

export const collections = { blog, roadmap };
