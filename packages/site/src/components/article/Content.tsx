import { HeadingsReference } from "note-site-markdown";

import { Toc } from "./Toc";

export function ArticleContent({
  children,
  toc,
}: {
  children: React.ReactNode;
  toc?: HeadingsReference;
}) {
  return (
    <section className="flex flex-col md:flex-row-reverse md:items-start md:gap-3">
      {toc && toc.length > 0 && (
        <div className="top-header flex-shrink-0 md:sticky md:mt-0 md:w-toc">
          {toc.length > 0 && (
            <div className="mt-3 bg-content">
              <Toc headings={toc} />
            </div>
          )}
        </div>
      )}
      <div className="min-w-0 mt-3 flex-grow px-2 pb-2 leading-7 bg-content shadow-lg pt-2">
        {children}
      </div>
    </section>
  );
}
