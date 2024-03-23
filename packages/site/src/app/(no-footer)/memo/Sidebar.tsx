import { memoData } from "note-site-data/memo";

import { Tree } from "./_components/Tree";

export function Sidebar() {
  return (
    <aside className="h-full overflow-y-auto backdrop-blur-sm bg-content [scrollbar-gutter:stable]">
      <Tree
        linkBase={["memo"]}
        filePaths={memoData.paths}
        className="pb-20 xl:pb-10"
      />
    </aside>
  );
}
