import { extname, join } from "node:path";
import { visit } from "unist-util-visit";

import { blogData } from "note-site-data/blog";

export const remarkRewriteLink = (options: { sourcePath: string[] }): any => {
  const sourceDir = options.sourcePath.slice(0, -1);
  return (tree: any) =>
    visit(tree, "link", (node: { url: string }) => {
      if (!node.url.startsWith("http")) {
        let [url, hash] = node.url.split("#");

        if (url !== "") {
          if (url.endsWith(".md") || url.endsWith(".mdx")) {
            // Remove extension
            url = url.slice(0, -1 * extname(url).length);

            // Make link relative
            url = join(...sourceDir, url);

            let path = url.split("/");

            // If it's a blog post, rewrite the link to the slug
            if (path.length > 1 && path[0] === "blog") {
              const title = path[path.length - 1];
              const slug = blogData.posts.find((blog) => blog.title === title)
                ?.frontmatter.slug;
              if (slug) {
                path = ["blog", slug];
              }
            }

            // If it's an index file, remove the index
            if (path[path.length - 1] === "index") {
              path.pop();
            }

            url = join("/", ...path);
          } else {
            console.warn(`[remarkRewriteLink] ${url} is not a markdown file`);
          }
        }

        if (hash && hash !== "") {
          hash = encodeURIComponent(
            String(decodeURIComponent(hash))
              .trim()
              .toLowerCase()
              .replace(/\s+/g, "-"),
          );
        }

        node.url = hash && hash !== "" ? `${url}#${hash}` : url;
      }
    });
};
