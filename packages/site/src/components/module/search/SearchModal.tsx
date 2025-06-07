"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import clsx from "clsx";
import Fuse, { type FuseResult } from "fuse.js";
import { SearchIcon, X } from "lucide-react";

import { TagChipLink } from "@/components/ui/TagChip";
import { searchData } from "note-site-data/search";
import type { SearchData } from "note-site-data/type/search";
import { Link } from "@/components/ui/Link";

const fuse = new Fuse(searchData, {
  keys: ["title", "tags", "path"],
});
export default function SearchModal({
  setShow,
}: {
  setShow: (s: boolean) => void;
}) {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<FuseResult<SearchData>[]>([]);
  useEffect(() => {
    if (query !== "") {
      const data = fuse.search(query);
      setResult(data);
    } else {
      const data = searchData.slice(0, 10).map((item, i) => ({
        item,
        refIndex: i,
      }));
      setResult(data);
    }
  }, [query]);

  const pathname = "/";
  const savedPathNameRef = useRef(pathname);
  useEffect(() => {
    if (savedPathNameRef.current !== pathname) {
      setShow(false);
      savedPathNameRef.current = pathname;
    }
  }, [pathname, setShow]);

  return createPortal(
    <div
      className="fixed w-screen h-dvh z-50 top-0 left-0 bg-gray-400/50 flex flex-col items-center p-2 md:p-4 touch:pb-header touch:justify-end"
      onClick={(e) => {
        e.stopPropagation();
        setShow(false);
      }}
    >
      <div
        className="flex flex-col touch:flex-col-reverse items-center w-full md:w-[600px] bg-content px-2 py-2 max-h-full gap-3 rounded-md"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="flex w-full">
          <div className="relative grow">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <SearchIcon />
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-3 pl-12 text-sm text-gray-900 border border-gray-300 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <button
            aria-label="Close search modal"
            className="pl-2"
            onClick={(e) => {
              e.stopPropagation();
              setShow(false);
            }}
          >
            <X />
          </button>
        </div>
        <div className="overflow-y-auto flex flex-col gap-2 w-full touch:flex-col-reverse">
          {result.map((result) => (
            <SearchResultItemCard key={result.refIndex} item={result} />
          ))}
        </div>
      </div>
    </div>,
    document.body,
    "search-modal",
  );
}

function SearchResultItemCard({ item }: { item: FuseResult<SearchData> }) {
  const [category, ...pathWithoutCategory] = item.item.path;
  return (
    <div className="flex flex-col px-2 p-1 mb-1 card">
      <Link href={`/${item.item.path.join("/")}`} className="flex flex-col">
        <span className="text-lg">{item.item.title}</span>
        <p className="text-gray-700 dark:text-gray-300 text-sm text-ellipsis overflow-hidden whitespace-nowrap">
          <span
            className={clsx({
              "text-cyan-500": category === "memo",
              "text-red-500": category === "blog",
            })}
          >
            {category}
          </span>
          /{pathWithoutCategory.join("/")}
        </p>
      </Link>
      <span className="flex flex-wrap gap-2">
        {item.item.tags.map((tag) => (
          <TagChipLink tag={tag} key={tag.join("/")} className="text-sm" />
        ))}
      </span>
    </div>
  );
}
