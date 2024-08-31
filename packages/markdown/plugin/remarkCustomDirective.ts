import { h } from "hastscript";
import type { Root } from "mdast";
import type { Plugin } from "unified";
import { visit } from "unist-util-visit";

export const remarkCustomDirective: Plugin<[], Root> = () => {
  return (tree) => {
    visit(tree, (node: any) => {
      if (
        node.type === "textDirective" ||
        node.type === "leafDirective" ||
        node.type === "containerDirective"
      ) {
        const [name, ...n] = node.name.split(" ");
        let value: string | null = null;
        if (n.length > 0) {
          value = n.join(" ");
        } else {
          value = null;
        }
        if (name === "message") {
          node.attributes.class = `note ${value ?? "warn"}`;

          if (!node.data) {
            node.data = {};
          }
          const tagName = node.type === "textDirective" ? "span" : "div";

          node.data.hName = tagName;

          node.data.hProperties = h(tagName, node.attributes).properties;
        } else if (name === "details") {
          const children = [...node.children];
          node.type = "mdxJsxFlowElement";
          node.name = "details";
          node.attributes = [];
          node.children = value
            ? [
                {
                  type: "mdxJsxFlowElement",
                  name: "summary",
                  attributes: [],
                  children: [
                    {
                      type: "text",
                      value,
                    },
                  ],
                  data: {
                    _mdxExplicitJsx: true,
                  },
                },
                ...children,
              ]
            : children;
          node.data = {
            _mdxExplicitJsx: true,
          };
        }
      }
    });
  };
};
