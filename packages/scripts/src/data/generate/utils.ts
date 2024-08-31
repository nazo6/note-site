import * as fs from "node:fs/promises";
import { DATA_JSON_DIR, DATA_SOURCE_DIR } from "note-site-common/path";
import * as path from "node:path";

export const ARTICLE_PATH = path.join(DATA_SOURCE_DIR, "article");

export async function writeData(name: string, data: any) {
  await fs.writeFile(
    path.join(DATA_JSON_DIR, name),
    JSON.stringify(data, null, 2),
  );
}
