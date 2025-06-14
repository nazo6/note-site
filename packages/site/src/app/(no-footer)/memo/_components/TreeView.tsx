"use client";

import TreeView, {
  type INode,
  type ITreeViewProps,
} from "react-accessible-treeview";
import type { IFlatMetadata } from "react-accessible-treeview/dist/TreeView/utils";

import clsx from "clsx";
import { FileText, FolderClosed, FolderOpen } from "lucide-react";

import { Link } from "@/components/ui/Link";

import type { NodeMetadata } from "./Tree";
import { usePathname } from "next/navigation";

export function TreeViewC(
  props: Omit<
    ITreeViewProps & React.RefAttributes<HTMLUListElement>,
    "nodeRenderer"
  > & {
    linkBase: string[];
  },
) {
  const currentPath = usePathname();

  const { linkBase, ...p } = props;
  return (
    <TreeView
      {...p}
      className={clsx(props.className)}
      nodeRenderer={({
        element,
        getNodeProps,
        level,
        isBranch,
        isExpanded,
        handleExpand,
      }) => {
        const metadata = element.metadata as NodeMetadata;
        const { onClick, ...nodeProps } = getNodeProps({
          onClick: handleExpand,
        });
        const path = getElementPath(props.data, element.id);
        const pathStr = encodeURI(`/${[...props.linkBase, ...path].join("/")}`);

        return (
          <div
            {...nodeProps}
            style={{ paddingLeft: 20 * (level - 1) }}
            className={clsx(
              nodeProps.className,
              "flex justify-center items-center",
            )}
          >
            {isBranch ? (
              <button onClick={onClick} aria-label="Toggle folder open">
                {isExpanded ? (
                  <FolderOpen className="inline h-4" />
                ) : (
                  <FolderClosed className="inline h-4" />
                )}
              </button>
            ) : null}
            <Link
              className={clsx(
                "text-sm border border-transparent dark:text-gray-300 text-gray-700 p-1 touch:py-2 transition-all duration-300 ease-in-out hover:border-black dark:hover:border-white grow mr-1",
                pathStr === currentPath ? "bg-blue-500/30" : "",
              )}
              href={pathStr}
            >
              {isBranch ? null : <FileText className="inline h-4" />}
              {metadata.publish === 0 ? "🔒 " : ""}
              {element.name}
            </Link>
          </div>
        );
      }}
    />
  );
}

export function getElementPath(
  data: INode<IFlatMetadata>[],
  id: string | number,
) {
  const path = [];
  let current = data.find((element) => element.id === id);
  while (current) {
    path.unshift(current.name);
    current = data.find((element) => element.id === current?.parent);
  }
  path.shift();
  return path;
}
