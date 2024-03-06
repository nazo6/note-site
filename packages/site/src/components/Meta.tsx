import { env } from "@/lib/server-env";
import { md5 } from "note-site-common/hash";

import fs from "fs/promises";
import path from "path";

import { DATA_BUILD_METADATA_DIR } from "note-site-common/path";
import { PageMeta } from "note-site-common/types/meta";

async function writeMetadata(hash: string, data: PageMeta) {
  if (env.DEV) {
    return;
  }

  const metadataPath = path.join(DATA_BUILD_METADATA_DIR, hash);

  await fs.mkdir(path.dirname(metadataPath), { recursive: true });

  await fs.writeFile(metadataPath, JSON.stringify(data, null, 2));
}

export default async function Meta(props: PageMeta) {
  const pageHash = md5(props.path.join("/"));

  await writeMetadata(pageHash, props);

  const title =
    props.literalTitle === true ? props.title : `${props.title} | nazo6 note`;

  const ogImageAvailable =
    props.og?.type === "top" ||
    (props.og?.type === "article" && props.og?.image);
  const ogImageWebPath = `/og/${pageHash}.png`;

  return (
    <>
      <title>{title}</title>
      {ogImageAvailable && (
        <meta property="og:image" content={ogImageWebPath} />
      )}
      {props.og?.type === "article" && (
        <meta property="og:type" content="article" />
      )}
      {props.description && (
        <meta name="description" content={props.description} />
      )}
      {props.index === false && <meta name="robots" content="noindex" />}
      {props.canonical && <link rel="canonical" href={props.canonical} />}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      {ogImageAvailable && (
        <meta name="twitter:image" content={ogImageWebPath} />
      )}
    </>
  );
}
