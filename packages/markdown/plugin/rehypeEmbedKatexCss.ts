import { visit } from "unist-util-visit";

const rehypeEmbedKatexCss = () => {
  return (tree: any) => {
    let foundKatex = false;
    visit(tree, "element", (node) => {
      if (node.properties?.className?.includes("katex")) {
        foundKatex = true;
      }
    });
    if (foundKatex) {
      tree.children.unshift({
        type: "element",
        tagName: "link",
        properties: {
          rel: "stylesheet",
          href: "https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.css",
        },
      });
    }
  };
};

export default rehypeEmbedKatexCss;
