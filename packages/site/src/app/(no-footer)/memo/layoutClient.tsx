"use client";

import { useEffect, useState } from "react";

import clsx from "clsx";
import { Menu, X } from "lucide-react";

import { Footer } from "@/components/module/Footer";
import { useBreakpoint } from "@/lib/useBreakpoint";
import { useMounted } from "@/lib/useMounted";

export function LayoutClient({
  children,
  sidebar,
}: {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}) {
  const { isXl } = useBreakpoint("xl");
  const [open, setOpen] = useState(true);
  const mounted = useMounted();

  useEffect(() => {
    if (isXl) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [isXl]);

  return (
    <div className="h-full flex justify-center md:px-2 px-0">
      <div className="xl:sticky top-header bottom-0 z-50">
        <div className="pt-3" />
        <div className="fixed bottom-4 left-4 xl:bottom-0 xl:left-0 xl:sticky xl:top-[calc(theme('spacing.header')+0.75rem)] flex xl:flex-col">
          <button
            onClick={() => setOpen(true)}
            className={clsx(
              "p-3 xl:p-2 card border-2 border-gray-300 dark:border-gray-500 block xl:hidden bg-gray-300/80",
              mounted && (open ? "!hidden" : "!block"),
            )}
          >
            <Menu />
          </button>
          <button
            onClick={() => setOpen(false)}
            className={clsx(
              "p-3 xl:p-2 card border-2 border-gray-300 dark:border-gray-500 hidden xl:block bg-gray-300/80",
              mounted && (open ? "!block" : "!hidden"),
            )}
          >
            <X />
          </button>
        </div>
      </div>
      <div
        className={clsx("fixed w-full xl:sticky xl:w-sidebar pt-header z-20", {
          hidden: mounted && !open,
        })}
      >
        <div
          className={clsx(
            "hidden xl:block w-full sm:w-sidebar",
            {
              "!block": mounted && open,
              "!hidden": mounted && !open,
            },
            "z-20 fixed xl:sticky xl:top-header h-[calc(100vh-theme('spacing.header'))] xl:h-[calc(100vh-theme('spacing.header')-2rem)] box-border flex-shrink-0",
          )}
          onClick={(e) => {
            if (e.target instanceof HTMLAnchorElement && !isXl) {
              setOpen(false);
            }
          }}
        >
          <div className="xl:pt-3" />
          <div className="shadow-lg h-full mr-2">{sidebar}</div>
        </div>
      </div>
      <div className="min-w-0 w-article min-h-[100vh] pt-header flex flex-col">
        <div className="mb-auto mt-2">{children}</div>
        <Footer />
      </div>
    </div>
  );
}
