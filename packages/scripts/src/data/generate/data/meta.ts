import * as fs from "node:fs/promises";
import path from "node:path";

import type { BlogData } from "note-site-data/type/blog";
import type { MemoData } from "note-site-data/type/memo";
import type { MetaData } from "note-site-data/type/meta";

import { ARTICLE_PATH, writeData } from "../utils";

async function getSpecialPage(name: string): Promise<string> {
  const content = await fs.readFile(
    path.join(ARTICLE_PATH, "special", `${name}.md`),
    "utf-8",
  );
  return content;
}

export async function generateMetaData(
  memoData: MemoData,
  blogData: BlogData,
): Promise<MetaData> {
  const allPaths = [
    ...memoData.paths.map((p) => ["memo", ...p]),
    ...memoData.folderPaths.map((p) => ["memo", ...p]),
    ...blogData.paths.map((p) => ["blog", ...p]),
  ];

  const metaData: MetaData = {
    allPaths,
    specialPages: {
      about: await getSpecialPage("about"),
      memo_index: await getSpecialPage("memo-index"),
    },
  };

  await writeData("meta.json", metaData);

  return metaData;
}
