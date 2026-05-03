// @ts-check

import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

import icon from "astro-icon";
import cmsImages from "./src/integrations/cms-images";

function normalizeBasePath(path = "/") {
  const normalized = (path ?? "").trim();
  if (!normalized || normalized === "/") return "/";
  return `/${normalized.replace(/^\/+|\/+$/g, "")}/`;
}

const base = normalizeBasePath(process.env.ASTRO_BASE);

// https://astro.build/config
export default defineConfig({
  base,
  vite: { plugins: [tailwindcss()] },
  integrations: [icon(), cmsImages()],
});
