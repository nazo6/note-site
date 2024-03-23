import * as tv from "react-accessible-treeview";

import { memoData } from "note-site-data/memo";

import { TreeViewC } from "./TreeView";

function getPost(path: string[]) {
  const post = memoData.posts.find((p) => p.path.join("/") === path.join("/"));
  if (!post) {
    throw Error(`Invalid memo post path (Tree): ${path.join("/")}`);
  }

  return post;
}

export type NodeMetadata = {
  publish?: number;
};

export function Tree(props: {
  filePaths: string[][];
  className?: string;
  linkBase: string[];
}) {
  type DataTree = {
    name: string;
    children: DataTree[];
    metadata: NodeMetadata;
  };
  const dataTree: DataTree = {
    name: "",
    children: [],
    metadata: {},
  };

  const paths = [...props.filePaths];
  paths.sort((a, b) => {
    const longLen = Math.max(a.length, b.length);
    for (let i = 0; i < longLen; i++) {
      if (!a[i]) {
        return 1;
      }
      if (!b[i]) {
        return -1;
      }
      if (a[i] < b[i]) {
        return 1;
      }
      if (a[i] > b[i]) {
        return -1;
      }
    }

    return 0;
  });

  for (const path of paths) {
    let current = dataTree;
    for (const [i, name] of path.entries()) {
      let found = current.children.find((child) => child.name === name);
      if (!found) {
        found = {
          name: name,
          children: [],
          metadata: {},
        };
        if (i === path.length - 1) {
          const localPath = [...props.linkBase, ...path];
          localPath.shift();
          const post = getPost(localPath);
          found.metadata = {
            publish: post.frontmatter.published ? 1 : 0,
          };
        }
        current.children.push(found);
      }
      current = found;
    }
  }

  const data = tv.flattenTree<NodeMetadata>(dataTree);
  return (
    <TreeViewC
      linkBase={props.linkBase}
      data={data}
      defaultExpandedIds={data.map((element) => element.id)}
      className={props.className ?? ""}
    />
  );
}
