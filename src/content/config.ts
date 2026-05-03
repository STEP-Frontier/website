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

const aboutCollection = defineCollection({
  type: "data",
  schema: z.object({
    representative_message: z.string(),
    members: z.array(
      z.object({
        name: z.string(),
        grade: z.number(),
        department: z.string(),
      }),
    ),
  }),
});

export const collections = {
  about: aboutCollection,
  news: newsCollection,
};
