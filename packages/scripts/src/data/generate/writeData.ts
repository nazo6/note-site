import * as fs from "node:fs/promises";
import * as path from "node:path";
import { DATA_JSON_DIR } from "note-site-common/path";

export async function writeData(name: string, data: any) {
  await fs.writeFile(
    path.join(DATA_JSON_DIR, name),
    JSON.stringify(data, null, 2),
  );
}
