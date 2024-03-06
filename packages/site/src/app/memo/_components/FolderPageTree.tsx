import { memoData } from "note-site-data/memo";

import { Tree } from "../_components/Tree";

export async function FolderPageTree(props: { path: string[] }) {
  const mdFiles = memoData.paths.flatMap((memoPath) => {
    if (
      memoPath.length > props.path.length &&
      props.path.every((v, i) => v === memoPath[i])
    ) {
      return [memoPath.slice(props.path.length)];
    }
    return [];
  });
  mdFiles.sort((a, b) => {
    return a.join("/").localeCompare(b.join("/"), undefined, {
      numeric: true,
      sensitivity: "base",
    });
  });
  return <Tree filePaths={mdFiles} linkBase={["memo", ...props.path]} />;
}
