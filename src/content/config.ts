import { defineCollection, z } from "astro:content";

const newsCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.string(),
    image: z.string(),
    summary: z.string(),
    featured: z.boolean().optional().default(false),
  }),
});

export const collections = {
  news: newsCollection,
};
