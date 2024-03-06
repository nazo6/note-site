import watcher from "@parcel/watcher";
import { mkdir } from "fs/promises";
import * as path from "path";
import { performance } from "perf_hooks";

import { generateBlogData } from "./data/blog";
import { generateMemoData } from "./data/memo";
import { generateMetaData } from "./data/meta";
import { generateSearchData } from "./data/search";
import { generateTagData } from "./data/tag";
import { ARTICLE_PATH } from "./utils";
import { DATA_JSON_DIR } from "note-site-common/path";

export default async function GenerateData() {
  const watch = process.argv.includes("-w");

  await mkdir(DATA_JSON_DIR, { recursive: true });

  const init_start = performance.now();
  let [blogData, memoData] = await Promise.all([
    generateBlogData(),
    generateMemoData(),
  ]);
  let [tagData, metaData, searchData] = await Promise.all([
    generateTagData(memoData, blogData),
    generateMetaData(memoData, blogData),
    generateSearchData(memoData, blogData),
  ]);
  console.log(
    "[generate-data] Generated data. Took",
    performance.now() - init_start,
    "ms",
  );

  if (watch) {
    const subscription = await watcher.subscribe(
      ARTICLE_PATH,
      async (_err, events) => {
        let regenerateBlogData = false;
        let regenerateMemoData = false;

        events.forEach((event) => {
          if (path.relative(ARTICLE_PATH, event.path).startsWith("blog")) {
            regenerateBlogData = true;
          }
          if (path.relative(ARTICLE_PATH, event.path).startsWith("memo")) {
            regenerateMemoData = true;
          }
        });

        if (regenerateBlogData || regenerateMemoData) {
          const start = performance.now();
          if (regenerateBlogData && regenerateMemoData) {
            console.log("[generate-data] Regenerating blog and memo data");
            [blogData, memoData] = await Promise.all([
              generateBlogData(),
              generateMemoData(),
            ]);
          } else if (regenerateMemoData) {
            console.log("[generate-data] Regenerating memo data");
            blogData = await generateBlogData();
          } else if (regenerateBlogData) {
            console.log("[generate-data] Regenerating blog data");
            memoData = await generateMemoData();
          }

          [tagData, metaData, searchData] = await Promise.all([
            generateTagData(memoData, blogData),
            generateMetaData(memoData, blogData),
            generateSearchData(memoData, blogData),
          ]);
          console.log("[generate-data] Took", performance.now() - start, "ms");
        }
      },
    );

    console.log("[generate-data] Watching for changes...");
    process.on("SIGINT", () => {
      console.log("[generate-data] Stopping watcher");
      subscription.unsubscribe();
    });
  }
}
