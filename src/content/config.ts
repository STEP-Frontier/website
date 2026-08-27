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

const sponsorsCollection = defineCollection({
  type: "data",
  schema: ({ image }) =>
    z.object({
      // ページ下部に出す文章（協賛のお願い・意気込みなど）。空なら表示しない
      message: z.string().optional(),
      sponsors: z.array(
        z.object({
          // 表示名
          name: z.string(),
          // ロゴ画像。src/content/sponsors/ からの相対パスで指定する
          logo: image(),
          // ロゴの下地。ロゴの色に合わせて選ぶ
          logo_background: z.enum(["light", "dark", "none"]).default("light"),
          // 公式サイトの URL。省略するとカードはリンクにならない
          url: z.string().url().optional(),
          // 紹介文。省略可
          description: z.string().optional(),
        }),
      ),
    }),
});

export const collections = {
  about: aboutCollection,
  sponsors: sponsorsCollection,
};
