"use client";

import { useEffect, useState } from "react";

import clsx from "clsx";
import { List } from "lucide-react";

import type { HeadingsReference } from "note-site-markdown";

("ml-1");
("ml-2");
("ml-3");
("ml-4");
("ml-5");
("ml-6");

export function Toc({ headings }: { headings: HeadingsReference }) {
  const [active, setActive] = useState<string | null>(null);
  const intersectMap = new Map<string, boolean>();
  headings.forEach((heading) => {
    intersectMap.set(heading.id, false);
  });
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            intersectMap.set(entry.target.id, true);
          } else {
            intersectMap.set(entry.target.id, false);
          }

          const newActive =
            headings.find((heading) => intersectMap.get(heading.id))?.id ??
            null;
          if (newActive) {
            setActive(newActive);
          }
        });
      },
      {
        rootMargin: "0% 0% -60% 0%",
      },
    );
    headings.forEach((heading) => {
      const target = document.getElementById(heading.id);
      if (target) {
        observer.observe(target);
      }
    });
    return () => {
      headings.forEach((heading) => {
        const target = document.getElementById(heading.id);
        if (target) {
          observer.unobserve(target);
        }
      });
    };
  }, [headings]);

  return (
    <nav className="py-1 bg-article shadow-lg overflow-y-auto">
      <h3 className="flex items-center justify-center py-1">
        <List className="mr-2" />
        目次
      </h3>
      <ul>
        {headings.map((heading) => {
          return (
            <li key={heading.id} className={`ml-${heading.rank * 2} mr-2`}>
              <a
                className={clsx(
                  "block w-full pl-2 py-1 hover:bg-blue-100/40 dark:hover:bg-blue-400/10 text-sm border-y border-dashed",
                  {
                    "bg-blue-300/20!": active === heading.id,
                  },
                )}
                href={`#${heading.id}`}
              >
                {heading.title}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
