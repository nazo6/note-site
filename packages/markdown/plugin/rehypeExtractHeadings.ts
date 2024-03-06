// Credit: https://github.com/hashicorp/next-mdx-remote/issues/231
import { hasProperty } from "hast-util-has-property";
import { headingRank } from "hast-util-heading-rank";
import { toString as hastToString } from "hast-util-to-string";
import { visit } from "unist-util-visit";

export type HeadingsReference = { title: string; id: string; rank: number }[];

const rehypeExtractHeadings = ({
  rank = 3,
  headings,
}: {
  rank: number;
  headings: HeadingsReference;
}) => {
  return (tree: any) => {
    visit(tree, "element", (node) => {
      const nodeRank = headingRank(node);
      if (nodeRank && nodeRank <= rank && hasProperty(node, "id")) {
        headings.push({
          title: hastToString(node),
          id: node.properties.id.toString(),
          rank: nodeRank,
        });
      }
    });
  };
};

export default rehypeExtractHeadings;
