import remarkHeadings from "@vcarl/remark-headings";
import remarkFrontmatter from "remark-frontmatter";
import remarkParse from "remark-parse";
import remarkStringify from "remark-stringify";
import { unified } from "unified";

import { BlogData } from "note-site-data/type/blog";
import { MemoData } from "note-site-data/type/memo";
import { SearchData } from "note-site-data/type/search";

import { writeData } from "../utils";

async function parseHeadings(source: string) {
  const file = await unified()
    .use(remarkParse)
    .use(remarkFrontmatter)
    .use(remarkStringify)
    .use(remarkHeadings)
    .process(source);
  const headings = file.data.headings as { value: string }[];
  return headings;
}

export async function generateSearchData(
  memoData: MemoData,
  blogData: BlogData,
): Promise<SearchData[]> {
  const data = await Promise.all(
    [...memoData.posts]
      .map(async (post) => {
        const headings = await parseHeadings(post.source);
        return {
          title: post.title,
          headings: headings.map((heading) => heading.value),
          tags: post.frontmatter.tags,
          path: ["memo", ...post.path],
        };
      })
      .concat(
        [...blogData.posts].map(async (post) => {
          const headings = await parseHeadings(post.source);
          return {
            title: post.title,
            headings: headings.map((heading) => heading.value),
            tags: post.frontmatter.tags,
            path: ["blog", ...post.path],
          };
        }),
      ),
  );

  await writeData("search.json", data);

  return data;
}
