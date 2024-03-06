import remarkFrontmatter from "remark-frontmatter";
import remarkParse from "remark-parse";
import remarkStringify from "remark-stringify";
import { unified } from "unified";

import remarkExtractFrontmatter from "note-site-markdown/plugin/remarkExtractFrontmatter";

export async function extractFrontMatter<T>(source: string) {
  const file = await unified()
    .use(remarkParse)
    .use(remarkStringify, { fences: true, resourceLink: true })
    .use(remarkFrontmatter, ["yaml", "toml"])
    .use(remarkExtractFrontmatter)
    .process(source);

  return file.data.matter as T;
}
