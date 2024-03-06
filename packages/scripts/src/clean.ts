import fs from "fs/promises";
import {
  CACHE_ROOT,
  DATA_JSON_DIR,
  DATA_ROOT,
  DIST_DIR,
  PUBLIC_DIR,
} from "note-site-common/path";
import path from "path";

export default async function clean() {
  console.log(`[clean] Deleting ${DATA_ROOT}`);
  await fs.rm(DATA_ROOT, { recursive: true, force: true });
  console.log(`[clean] Deleting ${CACHE_ROOT}`);
  await fs.rm(CACHE_ROOT, { recursive: true, force: true });
  console.log(`[clean] Deleting ${DATA_JSON_DIR}`);
  await fs.rm(DATA_JSON_DIR, { recursive: true, force: true });
  console.log(`[clean] Deleting ${DIST_DIR}`);
  await fs.rm(DIST_DIR, { recursive: true, force: true });

  const OG_LINK_DIR = path.join(PUBLIC_DIR, "og");
  console.log(`[clean] Deleting ${OG_LINK_DIR}`);
  await fs.rm(OG_LINK_DIR, { recursive: true, force: true });

  const RESOURCE_DIR = path.join(PUBLIC_DIR, "resource");
  console.log(`[clean] Deleting ${RESOURCE_DIR}`);
  await fs.rm(RESOURCE_DIR, { recursive: true, force: true });
}
