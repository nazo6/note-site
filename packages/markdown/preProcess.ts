import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkStringify from "remark-stringify";
import { unified } from "unified";

import { remarkAddEmbedElem } from "./plugin/remarkAddEmbedElem";
import { remarkMdToMdx } from "./plugin/remarkMdToMdx";
import { remarkRewriteLink } from "./plugin/remarkRewriteLink";

export async function preProcessMd(source: string, sourcePath: string[]) {
  const file = await unified()
    .use(remarkParse)
    .use(remarkMdToMdx)
    .use(remarkAddEmbedElem)
    .use(remarkRewriteLink, { sourcePath })
    .use(remarkGfm)
    .use(remarkStringify, { fences: true, resourceLink: true })
    .use(remarkFrontmatter, ["yaml", "toml"])
    .process(source);

  return String(file);
}
