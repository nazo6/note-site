import { Root } from "mdast";
import { join } from "path";
import { Plugin } from "unified";
import { visit } from "unist-util-visit";

// このファイルが存在する理由
// preprocessではremarkgfmが適用されていないが、この時、URL内の_が\_に置換されてしまう。
// 一方、preprocessにもremarkgfmを適用すると、MDX非対応の文法が出力されてしまい、エラーになる
// なので無理やりリンク内の\を削除する。

export const remarkFixLink: Plugin<[{ sourcePath: string[] }], Root> = (
  options,
) => {
  return (tree, file) =>
    visit(tree, "link", (node) => {
      if (node.url.startsWith("http")) {
        if (node.url.includes("\\")) {
          const fixed = node.url.replaceAll("\\", "");

          if (node.children[0]) {
            if (
              node.children[0].type === "text" &&
              node.children[0].value === node.url
            ) {
              node.children[0].value = fixed;
            }
          }

          node.url = fixed;
        }
      }
    });
};
