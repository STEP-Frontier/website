import { defineCollection, z } from "astro:content";

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
};
