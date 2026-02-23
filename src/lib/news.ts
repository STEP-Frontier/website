import path from "node:path";

/**
 * ニュース記事画像の相対パスを import.meta.glob のキー（絶対パス）に変換
 */
export function resolveNewsImagePath(
  imagePath: string,
  entryIdOrSlug: string,
): string {
  if (imagePath.startsWith("/")) return imagePath;

  const dir = entryIdOrSlug.endsWith(".md")
    ? path.posix.dirname(entryIdOrSlug)
    : entryIdOrSlug;

  const safeDir = dir === "." ? "" : `${dir}/`;

  return `/src/content/news/${safeDir}${imagePath.replace(/^\.\//, "")}`;
}
