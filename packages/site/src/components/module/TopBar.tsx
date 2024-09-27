"use client";

import clsx from "clsx";

import { Link } from "@/components/ui/Link";
import { ThemeButton } from "@/components/ui/ThemeButton";

import { SearchButton } from "./search/SearchButton";
import { usePathname } from "next/navigation";

const categories = ["blog", "memo", "tag"];
export function TopBar({ isPrivate }: { isPrivate: boolean }) {
  const path = usePathname();
  const activeCategory = path.split("/")[1];
  return (
    <div className="fixed w-full top-0 z-30 flex justify-center backdrop-blur bg-white/70 dark:bg-gray-500/50 drop-shadow-lg">
      <header className="w-article flex h-header items-stretch">
        <p className="p-0 text-lg md:text-xl flex px-2 items-center justify-start">
          <Link href="/" className="hover:underline">
            nazo6{" "}
            <span className={clsx({ "text-red-500": isPrivate })}>note</span>
          </Link>
          {categories.includes(activeCategory) && (
            <>
              {":\u00A0"}
              <Link
                href={`/${activeCategory}`}
                className="text-gray-500 dark:text-gray-300 hover:underline"
              >
                {activeCategory}
              </Link>
            </>
          )}
        </p>

        <div className="ml-auto" />
        <div className="flex h-full">
          {categories.map((category) => (
            <Link
              href={`/${category}`}
              key={category}
              className={clsx(
                "hover:bg-gray-300 dark:hover:bg-gray-800 px-1 md:px-2 h-full flex items-center",
                {
                  "text-black dark:text-white border-b-4 border-b-sky-500 border-t-4 border-t-transparent":
                    activeCategory === category,
                  "text-gray-500 dark:text-gray-400":
                    activeCategory !== category,
                },
              )}
            >
              {category}
            </Link>
          ))}
        </div>
        <SearchButton className="pr-2 pl-2 hover:bg-gray-300 dark:hover:bg-gray-800" />
        <ThemeButton className="pr-2 pl-2 hover:bg-gray-300 dark:hover:bg-gray-800" />
      </header>
    </div>
  );
}
