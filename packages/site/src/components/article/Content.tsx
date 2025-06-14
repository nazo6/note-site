import type { HeadingsReference } from "note-site-markdown";

import { Toc } from "./Toc";

export function ArticleContent({
  children,
  toc,
}: {
  children: React.ReactNode;
  toc?: HeadingsReference;
}) {
  return (
    <div className="flex flex-col md:flex-row-reverse md:items-start md:gap-3">
      {toc && toc.length > 0 && (
        <div className="top-header shrink-0 md:sticky md:mt-0 md:w-toc">
          <div className="mt-3 bg-content">
            <Toc headings={toc} />
          </div>
        </div>
      )}
      <article className="min-w-0 mt-3 grow lg:px-7 px-3 pb-2 leading-7 bg-content shadow-lg pt-2">
        {children}
      </article>
    </div>
  );
}
