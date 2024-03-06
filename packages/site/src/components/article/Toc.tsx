"use client";

import { useEffect, useState } from "react";

import clsx from "clsx";
import { List } from "lucide-react";

import { HeadingsReference } from "note-site-markdown";
import { useLocation } from "waku/router/client";

("ml-1");
("ml-2");
("ml-3");
("ml-4");
("ml-5");
("ml-6");

export function Toc({ headings }: { headings: HeadingsReference }) {
  const location = useLocation();
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
    <nav className="py-1 bg-article shadow-lg">
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
                  "block w-full pl-2 py-2 border-l-4 border-gray-500/40 hover:bg-gray-500/40",
                  {
                    "!border-black dark:!border-white bg-gray-400/20":
                      active === heading.id,
                  },
                )}
                // FIXME: Just setting hash doesn't work because waku automatically inserts base tag.
                href={`${location.path}#${heading.id}`}
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
