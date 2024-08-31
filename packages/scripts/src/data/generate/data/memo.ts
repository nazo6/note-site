import * as fs from "node:fs/promises";
import { glob } from "glob";
import * as path from "node:path";

import type { MemoData, MemoPost } from "note-site-data/type/memo";

import { extractFrontMatter } from "../extractFrontmatter";
import { ARTICLE_PATH, writeData } from "../utils";

type MemoFrontmatterRaw = {
  published: boolean;
  created: string;
  updated: string;
  tags?: string[];
};

export async function generateMemoData() {
  const root = path.join(ARTICLE_PATH, "memo");
  const files = await glob(path.join(ARTICLE_PATH, "memo/**/*.{md,mdx}"));

  const paths: string[][] = [];
  const posts: MemoPost[] = [];
  await Promise.all(
    files.map(async (file) => {
      const webPath = path.relative(root, file).split("/");
      const fileName = webPath[webPath.length - 1];
      const title = path.basename(fileName, path.extname(fileName));
      webPath[webPath.length - 1] = title;
      const fileContent = await fs.readFile(file, "utf-8");
      const frontmatter =
        await extractFrontMatter<MemoFrontmatterRaw>(fileContent);

      paths.push(webPath);
      posts.push({
        path: webPath,
        title,
        frontmatter: {
          ...frontmatter,
          tags: frontmatter.tags?.map((tag) => tag.split("/")) ?? [],
        },
        source: fileContent,
      });
    }),
  );

  const data: MemoData = {
    paths,
    posts,
    folderPaths: (await glob(path.join(ARTICLE_PATH, "memo/*/**/"))).map((p) =>
      path.relative(root, p).split("/"),
    ),
  };

  await writeData("memo.json", data);

  return data;
}
