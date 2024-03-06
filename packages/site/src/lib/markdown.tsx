import { components } from "@/components/markdown";
import { parseMarkdown as parse } from "note-site-markdown";
import { compileMDX } from "next-mdx-remote/rsc";

export async function parseMarkdown(source: string, sourcePath: string[]) {
  const { content, headings } = await parse(
    source,
    sourcePath,
    components,
    compileMDX,
  );
  return {
    content: <div className="article">{content}</div>,
    headings,
  };
}
