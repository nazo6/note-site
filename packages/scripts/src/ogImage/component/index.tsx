import { PageMeta } from "note-site-common/types/meta";
import ReactDOM from "react-dom/server";
import { ArticleImage } from "./ArticleImage";
import { TopImage } from "./TopImage";

export type Assets = { folderIcon: string; profileImage: string; font: string };

export function generateHtmlStr(
  metadata: PageMeta,
  assets: Assets,
): string | null {
  let content: React.ReactElement;

  if (metadata.og?.type === "article" && metadata.og.image) {
    content = <ArticleImage imageOpts={metadata.og.image} assets={assets} />;
  } else if (metadata.og?.type === "top") {
    content = <TopImage assets={assets} />;
  } else {
    return null;
  }

  const style = `
body {
  margin: 0;
  padding: 0;
  font-family: "NotoSansJP", sans-serif;
}

@font-face {
  font-family: "NotoSansJP";
  src: url(${assets.font});
}
`;

  const markup = ReactDOM.renderToStaticMarkup(content);

  return `<!DOCTYPE html>
  <html>
  <head>
  <style>${style}</style>
  </head>
  <body>
    ${markup}
  </body>
  </html>
  `;
}
