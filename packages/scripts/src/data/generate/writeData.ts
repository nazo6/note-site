import * as fs from "node:fs/promises";
import * as path from "node:path";

import { DATA_PATH } from "./utils";

export async function writeData(name: string, data: any) {
  await fs.writeFile(path.join(DATA_PATH, name), JSON.stringify(data, null, 2));
}
