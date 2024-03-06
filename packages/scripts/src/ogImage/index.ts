import fs from "fs/promises";
import * as playwright from "playwright";
import path from "path";
import serveHandler from "serve-handler";
import http from "http";
import { $ } from "zx";

import {
  BUILT_PUBLIC_DIR,
  DATA_BUILD_DIR,
  DATA_BUILD_METADATA_DIR,
  PUBLIC_DIR,
  SCRIPT_ROOT,
} from "note-site-common/path";
import { PageMeta } from "note-site-common/types/meta";
import { generateHtmlStr } from "./component";

const OG_CACHE_DIR = path.join(DATA_BUILD_DIR, "og");
const OG_LINK_DIR = path.join(PUBLIC_DIR, "og");
const OG_TARGET_DIR = path.join(BUILT_PUBLIC_DIR, "og");

export default async function generateOgImage() {
  const metadataList = await fs.readdir(DATA_BUILD_METADATA_DIR);

  const promises: Promise<void>[] = [];

  await fs.mkdir(OG_CACHE_DIR, { recursive: true });

  await fs.rm(OG_LINK_DIR, { recursive: true, force: true });
  await fs.symlink(OG_CACHE_DIR, OG_LINK_DIR);

  const server = http.createServer((request, response) => {
    return serveHandler(request, response, {
      public: path.join(SCRIPT_ROOT, "assets"),
      headers: [
        {
          source: "**/*",
          headers: [
            {
              key: "Access-Control-Allow-Origin",
              value: "*",
            },
          ],
        },
      ],
    });
  });
  const port: number = await new Promise((resolve, reject) => {
    server.listen(() => {
      const address = server.address();
      if (typeof address === "string" || address === null) {
        reject();
        return;
      }
      const port = address.port;
      console.log(`[ogImage] Asset server started at http://localhost:${port}`);
      resolve(port);
    });
  });

  const assets = {
    font: `http://localhost:${port}/NotoSansJP-Regular.ttf`,
    profileImage: `http://localhost:${port}/profile.png`,
    folderIcon: `http://localhost:${port}/folderIcon.png`,
  };

  const viewport = { width: 1200, height: 630 };
  const browser = await playwright.chromium.launch({
    channel: "chrome",
  });

  let generated = 0;
  let skipped = 0;

  for (const metadataHash of metadataList) {
    promises.push(
      (async () => {
        const metadataPath = path.join(DATA_BUILD_METADATA_DIR, metadataHash);
        const metadataStr = await fs.readFile(metadataPath, "utf-8");
        const metadata: PageMeta = JSON.parse(metadataStr);

        const ogPath = path.join(OG_CACHE_DIR, `${metadataHash}.png`);

        let exists = false;
        try {
          await fs.access(ogPath);
          exists = true;
        } catch {}

        if (exists) {
          skipped++;
          return;
        }

        const html = generateHtmlStr(metadata, assets);
        if (!html) {
          return;
        }

        const page = await browser.newPage({ viewport });
        page.on("console", (msg) => console.log("PAGE LOG:", msg.text()));
        await page.setContent(html, { waitUntil: "domcontentloaded" });
        const image = await page.screenshot({ type: "png" });
        await fs.writeFile(ogPath, image);
        generated++;
      })(),
    );
  }

  await Promise.all(promises);
  await browser.close();
  server.close();

  let cleaned = 0;
  const ogList = await fs.readdir(OG_CACHE_DIR);
  for (const og of ogList) {
    const metadataPath = path.join(
      DATA_BUILD_METADATA_DIR,
      og.replace(/\.png$/, ""),
    );
    try {
      await fs.access(metadataPath);
    } catch {
      await fs.rm(path.join(OG_CACHE_DIR, og));
      cleaned++;
    }
  }

  console.log(
    "[ogImage] Generated:",
    generated,
    "Skipped:",
    skipped,
    "Cleaned:",
    cleaned,
  );

  await fs.rm(OG_TARGET_DIR, {
    recursive: true,
    force: true,
  });

  await $`cp -r ${OG_CACHE_DIR} ${OG_TARGET_DIR}`;
  console.log("[ogImage] Copied to", OG_TARGET_DIR);
}
