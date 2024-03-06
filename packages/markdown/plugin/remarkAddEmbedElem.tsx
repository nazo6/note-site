import { Root } from "mdast";
import type { Plugin } from "unified";
import { visit } from "unist-util-visit";

export const remarkAddEmbedElem: Plugin<[], Root> = () => {
  return (tree) => {
    visit(tree, (node) => {
      if (node.type !== "paragraph") return;
      if (
        node.children.length === 1 &&
        // @ts-ignore
        node.children[0].type === "link" &&
        node.children[0].url.startsWith("http")
      ) {
        // @ts-ignore
        const url = node.children[0].url;
        // @ts-ignore
        node.type = "html";
        // @ts-ignore
        node.value = `<Embed url="${url}" />`;
        // @ts-ignore
        node.children = undefined;
      }
    });
  };
};
