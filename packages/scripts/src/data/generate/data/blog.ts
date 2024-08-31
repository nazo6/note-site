import * as fs from "node:fs/promises";
import { glob } from "glob";
import * as path from "node:path";

import type { BlogData, BlogPost } from "note-site-data/type/blog";

import { extractFrontMatter } from "../extractFrontmatter";
import { ARTICLE_PATH, writeData } from "../utils";

type BlogFrontmatterRaw = {
  published: boolean;
  created: string;
  updated: string;
  slug: string;
  tags?: string[];
  topics: string[];
  emoji: string;
  zenn_published: boolean;
  zenn_type?: string;
  zenn_topics?: string[];
  zenn_emoji?: string;
};

export async function generateBlogData() {
  const root = path.join(ARTICLE_PATH, "blog");
  const files = await glob(path.join(ARTICLE_PATH, "blog/**/*.{md,mdx}"));

  const paths: string[][] = [];
  const posts: BlogPost[] = [];
  await Promise.all(
    files.map(async (file) => {
      const webPath = path.relative(root, file).split("/");
      const fileName = webPath[webPath.length - 1];
      const title = path.basename(fileName, path.extname(fileName));
      const fileContent = await fs.readFile(file, "utf-8");
      const frontmatter =
        await extractFrontMatter<BlogFrontmatterRaw>(fileContent);

      webPath[webPath.length - 1] = frontmatter.slug;

      paths.push([frontmatter.slug]);
      posts.push({
        path: [frontmatter.slug],
        title,
        frontmatter: {
          ...frontmatter,
          tags: frontmatter.tags?.map((tag) => tag.split("/")) ?? [],
        },
        source: fileContent,
      });
    }),
  );

  const data: BlogData = {
    paths,
    posts,
  };

  await writeData("blog.json", data);

  return data;
}
