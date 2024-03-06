import * as fs from "fs/promises";
import path from "path";

import { BlogData } from "note-site-data/type/blog";
import { MemoData } from "note-site-data/type/memo";
import { MetaData } from "note-site-data/type/meta";

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
