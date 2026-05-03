import fs from "node:fs";
import path from "node:path";

import type { AstroIntegration } from "astro";

export default function cmsImages(): AstroIntegration {
  return {
    name: "cms-images",
    hooks: {
      "astro:build:done": ({ dir }) => {
        const src = path.join(process.cwd(), "public", "cms-images");
        const dest = path.join(dir.pathname, "cms-images");

        if (!fs.existsSync(src)) return;

        if (!fs.existsSync(dest)) {
          fs.mkdirSync(dest, { recursive: true });
        }

        for (const file of fs.readdirSync(src)) {
          fs.copyFileSync(path.join(src, file), path.join(dest, file));
        }
      },
    },
  };
}
