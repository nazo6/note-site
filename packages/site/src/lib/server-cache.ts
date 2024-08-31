// Save cache to node_modules/.cache for faster build.
//
// This is mainly used in LinkCard component

import fs from "node:fs/promises";
import { md5 } from "note-site-common/hash";
import { CACHE_ROOT } from "note-site-common/path";
import path from "node:path";

function getCachePath(name: string) {
  return path.join(CACHE_ROOT, name);
}

export async function getCache<T>(key: string): Promise<T | null> {
  const cachePath = getCachePath(md5(key));
  try {
    return JSON.parse(await fs.readFile(cachePath, "utf8"));
  } catch (e) {
    return null;
  }
}

export async function setCache<T>(key: string, value: T): Promise<void> {
  const cachePath = getCachePath(md5(key));
  await fs.mkdir(path.dirname(cachePath), { recursive: true });
  await fs.writeFile(cachePath, JSON.stringify(value));
}

export async function clearCache(key: string): Promise<void> {
  const cachePath = getCachePath(md5(key));
  try {
    await fs.unlink(cachePath);
  } catch (e) {
    // ignore
  }
}
