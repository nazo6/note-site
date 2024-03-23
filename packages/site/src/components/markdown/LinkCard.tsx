import { Suspense } from "react";

import clsx from "clsx";
import nodeFetch, { FetchError } from "node-fetch";

import { Link } from "@/components/ui/Link";

import { Metadata, parseMetadata } from "./ogParser";
import { getCache, setCache } from "@/lib/server-cache";

const fetchMetadata = async (url: string): Promise<string | null> => {
  try {
    const resp = await nodeFetch(url, {
      signal: AbortSignal.timeout(15000),
      headers: {
        accept: "text/html,application/xhtml+xml",
      },
    });
    return await resp.text();
  } catch (e) {
    try {
      const resp = await nodeFetch(url, {
        signal: AbortSignal.timeout(15000),
        headers: {
          accept: "text/html,application/xhtml+xml",
        },
      });
      return await resp.text();
    } catch (e) {
      let info = "";
      if (e instanceof FetchError) {
        info = e.message;
      }
      console.warn("[LinkCard] Fetch error", url, ": ", info);
      return null;
    }
  }
};

const fetchWithCache = async (url: string): Promise<Metadata | null> => {
  const cache = await getCache<Metadata>(`linkcard:${url}`);
  if (cache) {
    // console.log("[LinkCard] Cache hit", url);
    return cache;
  }
  console.log("[LinkCard] Cache not hit", url);
  const html = await fetchMetadata(url);
  if (!html) {
    return null;
  }
  const metadata = parseMetadata(html, url);
  await setCache(`linkcard:${url}`, metadata);
  return metadata;
};

async function LinkCardInner(props: { url: string }) {
  const url = new URL(props.url);

  const metadata = await fetchWithCache(props.url);

  const og_image = metadata?.image;
  const title = metadata?.title
    ? metadata.title === ""
      ? props.url
      : metadata.title
    : props.url;

  return (
    <Link
      href={props.url}
      title={title}
      className={clsx(
        "grid grid-flow-col grid-rows-3 gap-2 rounded-md border-2 border-gray-300/50 hover:bg-gray-500/10 mt-2 p-2 h-28",
        {
          "grid-cols-4": og_image,
          "grid-cols-3": !og_image,
        },
      )}
      icon={false}
    >
      <div className="col-span-3 row-span-1">
        <p className="overflow-hidden overflow-ellipsis whitespace-nowrap text-lg">
          {title}
        </p>
      </div>
      <div
        className="col-span-3 row-span-1 text-xs text-gray-800 dark:text-gray-200 overflow-ellipsis overflow-hidden whitespace-nowrap"
        title={metadata?.description}
      >
        {metadata?.description}
      </div>
      {metadata ? (
        <>
          <p className="col-span-3 row-span-1 text-xs text-gray-500 dark:text-gray-400 inline-flex items-center gap-1">
            {metadata.icon ? (
              <img alt="" src={metadata.icon} width={16} height={16} />
            ) : null}
            {url.hostname}
          </p>
          {og_image && (
            <img
              src={og_image}
              className="col-span-1 row-span-3 w-full h-full object-contain"
              alt=""
            />
          )}
        </>
      ) : null}
    </Link>
  );
}

export function LinkCard(props: { url: string }) {
  return (
    <Suspense
      fallback={
        <Link
          role="status"
          href={props.url}
          icon={false}
          className="flex flex-col gap-2 rounded-md border-2 border-gray-300/50 hover:bg-gray-500/10 mt-2 p-2 h-28"
        >
          <div className="">{props.url}</div>
          <div className="animate-pulse ">
            <div className="h-2 bg-gray-300 rounded-full dark:bg-gray-500 w-full mb-2.5" />
            <div className="h-2 bg-gray-300 rounded-full dark:bg-gray-500 w-full mb-2.5" />
            <span className="sr-only">Loading...</span>
          </div>
        </Link>
      }
    >
      <LinkCardInner url={props.url} />
    </Suspense>
  );
}
