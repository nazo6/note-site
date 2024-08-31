import path from "node:path";
import fs from "node:fs";

let workspaceRoot: string | null = null;
let workDir = process.cwd();
while (true) {
  if (fs.existsSync(path.join(workDir, "packages"))) {
    workspaceRoot = workDir;
    break;
  }
  workDir = path.join(workDir, "..");
  if (workDir === "/") {
    break;
  }
}
if (!workspaceRoot) {
  throw new Error("workspace root not found");
}

export const SITE_ROOT = path.resolve(workspaceRoot, "packages/site");
export const CACHE_ROOT = path.resolve(
  SITE_ROOT,
  ".next/cache/custom-12345/cache",
);
export const SCRIPT_ROOT = path.resolve(workspaceRoot, "packages/scripts");

export const DATA_ROOT = path.resolve(
  SITE_ROOT,
  ".next/cache/custom-12345/data",
);
export const DATA_SOURCE_DIR = path.join(DATA_ROOT, "source");
export const DATA_JSON_DIR = path.join(workspaceRoot, "packages/data/json");
export const DATA_BUILD_DIR = path.join(DATA_ROOT, "build");
/// Metadata of each pages
export const DATA_BUILD_METADATA_DIR = path.join(DATA_BUILD_DIR, "metadata");

/// Path that contains artifact *after* build. That will be served by web server as is.
export const DIST_DIR = path.join(SITE_ROOT, "out");

/// Path that contains artifact *after* build. That will be served by web server as is.
export const BUILT_PUBLIC_DIR = path.join(SITE_ROOT, "out");
/// Path that contains artifact *before* build
export const PUBLIC_DIR = path.join(SITE_ROOT, "public");
