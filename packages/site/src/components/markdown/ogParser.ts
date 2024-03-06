import { load } from "cheerio";

export function resolveUrl(base: string, maybeRelative: string): string {
  try {
    return new URL(maybeRelative, base).toString();
  } catch (err) {
    return maybeRelative;
  }
}

export type Metadata = {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  site_name?: string;
  type?: string;
  icon?: string;
};

export function parseMetadata(html: string, url: string) {
  const $ = load(html);
  const metadata: Metadata = {};
  const metaTags = $("meta");
  metaTags.each((_, metaTag) => {
    const tag = $(metaTag);
    const property = tag.attr("property");
    const content = tag.attr("content");
    if (property && content) {
      switch (property) {
        case "og:title":
          metadata.title = content;
          break;
        case "og:description":
          metadata.description = content;
          break;
        case "og:image":
          metadata.image = resolveUrl(url, content);
          break;
        case "og:url":
          metadata.url = resolveUrl(url, content);
          break;
        case "og:site_name":
          metadata.site_name = content;
          break;
        case "og:type":
          metadata.type = content;
          break;
        case "og:icon":
          metadata.icon = resolveUrl(url, content);
          break;
      }
    }
  });
  if (!metadata.title) {
    metadata.title = $("title").text();
  }
  if (!metadata.icon) {
    const favicon = $("link[rel~='icon']").attr("href");
    if (favicon) {
      metadata.icon = resolveUrl(url, favicon);
    }
    if (!metadata.icon) {
      metadata.icon = resolveUrl(url, "/favicon.ico");
    }
  }

  return metadata;
}
