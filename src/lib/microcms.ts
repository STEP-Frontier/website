import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const endpoint = import.meta.env.MICROCMS_ENDPOINT as string | undefined;
const apiKey = import.meta.env.MICROCMS_API_KEY as string | undefined;
const baseUrl = import.meta.env.BASE_URL;

const CMS_DATA_DIR = path.join(process.cwd(), "src", "data", "cms");
const CMS_IMAGES_DIR = path.join(process.cwd(), "public", "cms-images");

export interface MicroCMSImage {
  url: string;
  width: number;
  height: number;
}

interface MicroCMSNewsItem {
  id: string;
  title: string;
  content?: string;
  eyecatch?: MicroCMSImage;
  created_at: string;
  publishedAt?: string;
  revisedAt?: string;
  updatedAt?: string;
}

export interface NewsItem
  extends Omit<MicroCMSNewsItem, "content" | "created_at"> {
  content: string;
  createdAt: string;
  date: string;
  summary: string;
  featured: false;
  body: string;
}

interface MicroCMSListResponse<T> {
  contents: T[];
  totalCount: number;
  offset: number;
  limit: number;
}

function loadCache<T>(filename: string): T | null {
  const filePath = path.join(CMS_DATA_DIR, filename);
  if (!fs.existsSync(filePath)) return null;
  return JSON.parse(fs.readFileSync(filePath, "utf-8")) as T;
}

function saveCache(filename: string, data: unknown): void {
  if (!fs.existsSync(CMS_DATA_DIR)) {
    fs.mkdirSync(CMS_DATA_DIR, { recursive: true });
  }
  fs.writeFileSync(
    path.join(CMS_DATA_DIR, filename),
    JSON.stringify(data, null, 2),
  );
}

async function fetchAPI<T>(
  apiPath: string,
  queries?: Record<string, string | number>,
): Promise<T> {
  if (!endpoint || !apiKey) {
    throw new Error("MICROCMS_ENDPOINT and MICROCMS_API_KEY are required");
  }

  const url = new URL(`${endpoint.replace(/\/$/, "")}/${apiPath}`);
  if (queries) {
    for (const [key, value] of Object.entries(queries)) {
      url.searchParams.set(key, String(value));
    }
  }

  const res = await fetch(url.toString(), {
    headers: { "X-MICROCMS-API-KEY": apiKey },
  });

  if (!res.ok) {
    throw new Error(`microCMS API error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

async function fetchListWithCache<T>(
  filename: string,
  apiPath: string,
  orders: string,
): Promise<MicroCMSListResponse<T>> {
  try {
    const data = await fetchAPI<MicroCMSListResponse<T>>(apiPath, {
      orders,
      limit: 100,
    });
    saveCache(filename, data);
    console.log(`[CMS] ${apiPath}: fetched from microCMS`);
    return data;
  } catch (e) {
    const cached = loadCache<MicroCMSListResponse<T>>(filename);
    if (cached) {
      const message = e instanceof Error ? e.message : String(e);
      console.warn(`[CMS] ${apiPath}: loaded from local cache (${message})`);
      return cached;
    }

    throw new Error(
      `microCMS fetch failed and no local cache available for ${apiPath}`,
      { cause: e },
    );
  }
}

function sliceList<T>(
  data: MicroCMSListResponse<T>,
  limit?: number,
  offset?: number,
): MicroCMSListResponse<T> {
  const start = offset ?? 0;
  const end = limit === undefined ? undefined : start + limit;
  const contents = data.contents.slice(start, end);
  return { ...data, contents, offset: start, limit: limit ?? data.limit };
}

function stripHtml(html = ""): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function generateSummary(content = ""): string {
  const text = stripHtml(content);
  return text.length > 100 ? `${text.slice(0, 100)}...` : text;
}

function normalizeNews(news: MicroCMSNewsItem): NewsItem {
  const { content = "", created_at: createdAt, ...rest } = news;
  if (!createdAt) {
    throw new Error(`News created_at is required: ${news.id}`);
  }

  return {
    ...rest,
    content,
    createdAt,
    date: createdAt,
    summary: generateSummary(content),
    featured: false,
    body: content,
  };
}

export function formatNewsDate(date: string): string {
  const dateOnly = date.match(/^\d{4}-\d{2}-\d{2}/);
  if (dateOnly) return dateOnly[0];

  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return date;

  return parsed
    .toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      timeZone: "Asia/Tokyo",
    })
    .replaceAll("/", "-");
}

export async function localizeImage(
  image: MicroCMSImage | undefined,
): Promise<MicroCMSImage | undefined> {
  if (!image) return undefined;

  const ext = path.extname(new URL(image.url).pathname) || ".jpg";
  const hash = createHash("md5").update(image.url).digest("hex");
  const filename = `${hash}${ext}`;
  const filePath = path.join(CMS_IMAGES_DIR, filename);

  if (!fs.existsSync(CMS_IMAGES_DIR)) {
    fs.mkdirSync(CMS_IMAGES_DIR, { recursive: true });
  }

  if (!fs.existsSync(filePath)) {
    const res = await fetch(image.url);
    if (!res.ok) {
      console.warn(`Failed to download image: ${image.url}`);
      return image;
    }
    const buffer = Buffer.from(await res.arrayBuffer());
    fs.writeFileSync(filePath, buffer);
  }

  return {
    ...image,
    url: `${baseUrl}cms-images/${filename}`,
  };
}

export async function getNewsList(
  limit?: number,
  offset?: number,
): Promise<MicroCMSListResponse<NewsItem>> {
  const data = await fetchListWithCache<MicroCMSNewsItem>(
    "news.json",
    "news",
    "-created_at",
  );
  const normalizedData = {
    ...data,
    contents: data.contents.map(normalizeNews),
  };
  return sliceList(normalizedData, limit, offset);
}

export async function getNewsDetail(id: string): Promise<NewsItem> {
  const data = await fetchListWithCache<MicroCMSNewsItem>(
    "news.json",
    "news",
    "-created_at",
  );
  const item = data.contents.find((content) => content.id === id);
  if (!item) throw new Error(`News not found: ${id}`);
  return normalizeNews(item);
}
