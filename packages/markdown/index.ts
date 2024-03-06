import { compileMDX as compileMdxForTypeRef } from "next-mdx-remote/rsc";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import remarkBreaks from "remark-breaks";
import remarkDirective from "remark-directive";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

import rehypeEmbedKatexCss from "./plugin/rehypeEmbedKatexCss";
import rehypeExtractHeadings, {
  HeadingsReference,
} from "./plugin/rehypeExtractHeadings";
import { remarkCustomDirective } from "./plugin/remarkCustomDirective";
// import { remarkFixLink } from "./plugin/remarkFixLink";
import { preProcessMd } from "./preProcess";

export type { HeadingsReference } from "./plugin/rehypeExtractHeadings";

export type FrontmatterType = {
  updated: Date;
  created: Date;
  tags: string[];
  published: boolean;
  slug?: string;
};

export async function parseMarkdown(
  source: string,
  sourcePath: string[],
  components: Parameters<typeof compileMdxForTypeRef>[0]["components"],
  compileMDX: typeof compileMdxForTypeRef,
): Promise<{
  content: JSX.Element;
  headings: HeadingsReference;
}> {
  const processed = await preProcessMd(source, sourcePath);
  const headings: HeadingsReference = [];
  const result = await compileMDX<{
    updated: Date;
    created: Date;
    tags?: string[];
    published: boolean;
    slug?: string;
  }>({
    source: processed,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [
          remarkMath,
          remarkBreaks,
          remarkDirective,
          remarkCustomDirective,
          // remarkFixLink,
          remarkGfm,
        ],
        rehypePlugins: [
          [rehypeKatex as any, { strict: false }],
          rehypeSlug,
          [rehypeExtractHeadings, { rank: 3, headings }],
          rehypeEmbedKatexCss,
        ],
      },
    },
    components,
  });
  return {
    content: result.content,
    headings,
  };
}
