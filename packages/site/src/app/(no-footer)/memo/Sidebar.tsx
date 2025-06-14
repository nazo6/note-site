import { memoData } from "note-site-data/memo";

import { Tree } from "./_components/Tree";

export function Sidebar() {
  return (
    <aside className="h-full overflow-y-auto backdrop-blur-xs bg-content [scrollbar-gutter:stable] px-1">
      <Tree
        linkBase={["memo"]}
        filePaths={memoData.paths}
        className="pb-20 xl:pb-10"
      />
    </aside>
  );
}
