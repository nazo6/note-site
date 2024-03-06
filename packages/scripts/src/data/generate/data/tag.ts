import { BlogData } from "note-site-data/type/blog";
import { MemoData } from "note-site-data/type/memo";
import { TagData } from "note-site-data/type/tag";

import { writeData } from "../utils";

export async function generateTagData(
  memoData: MemoData,
  blogData: BlogData,
): Promise<TagData> {
  const tagList: string[][] = [];
  const fileTagsBlog = blogData.posts.map((post) => {
    post.frontmatter.tags.forEach((tag) => {
      for (let i = 0; i < tag.length; i++) {
        const tagPath = tag.slice(0, i + 1);
        if (!tagList.some((t) => t.join("/") === tagPath.join("/"))) {
          tagList.push(tagPath);
        }
      }
    });

    return {
      tags: post.frontmatter.tags,
      path: ["blog", ...post.path],
    };
  });

  const fileTagsMemo = memoData.posts.map((post) => {
    post.frontmatter.tags.forEach((tag) => {
      for (let i = 0; i < tag.length; i++) {
        const tagPath = tag.slice(0, i + 1);
        if (!tagList.some((t) => t.join("/") === tagPath.join("/"))) {
          tagList.push(tagPath);
        }
      }
    });

    return {
      tags: post.frontmatter.tags,
      path: ["memo", ...post.path],
    };
  });
  const fileTags = [...fileTagsBlog, ...fileTagsMemo];

  const tagData: TagData = { fileTags, tagList };

  await writeData("tag.json", tagData);

  return tagData;
}
