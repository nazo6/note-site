import * as fs from "fs/promises";
import * as path from "path";

import { DATA_PATH } from "./utils";

export async function writeData(name: string, data: any) {
  await fs.writeFile(path.join(DATA_PATH, name), JSON.stringify(data, null, 2));
}
