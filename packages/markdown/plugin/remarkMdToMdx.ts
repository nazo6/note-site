// @ts-ignore
import { default as convert } from "html-to-jsx";
import type { Root } from "mdast";
import type { Plugin } from "unified";
import { visit } from "unist-util-visit";

export const remarkMdToMdx: Plugin<[], Root> = () => {
  return (tree) => {
    visit(tree, (node) => {
      if (node.type === "html") {
        const jsx = convert(node.value);
        node.value = jsx;
      }
    });
  };
};
