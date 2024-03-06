import fs from "fs/promises";
import path from "path";
import {
  BUILT_PUBLIC_DIR,
  DATA_BUILD_METADATA_DIR,
} from "note-site-common/path";

import { XMLBuilder } from "fast-xml-parser";
import { PageMeta } from "note-site-common/types/meta";

export default async function generateSitemap() {
  const xmlBuilder = new XMLBuilder({
    ignoreAttributes: false,
    attributeNamePrefix: "@@",
    format: true,
  });

  const metadataList = await fs.readdir(DATA_BUILD_METADATA_DIR);

  const metaList: PageMeta[] = [];

  for (const metadata of metadataList) {
    const metadataStr = await fs.readFile(
      path.join(DATA_BUILD_METADATA_DIR, metadata),
      "utf-8",
    );
    const meta: PageMeta = JSON.parse(metadataStr);
    metaList.push(meta);
  }

  await fs.writeFile(
    path.join(BUILT_PUBLIC_DIR, "sitemap.xml"),
    xmlBuilder.build({
      urlset: {
        "@@xmlns": "http://www.sitemaps.org/schemas/sitemap/0.9",
        url: metaList.map((meta) => ({
          loc: `https://note.nazo6.dev/${meta.path.join("/")}`,
          lastmod: meta.updated?.toISOString(),
          changefreq: "monthly",
          priority: meta.index ? "1.0" : "0.5",
        })),
      },
    }),
  );

  console.log(
    `[generateSitemap] Exported sitemap to ${BUILT_PUBLIC_DIR}/sitemap.xml`,
  );
}
