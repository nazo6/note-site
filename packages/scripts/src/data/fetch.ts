import * as fs from "node:fs/promises";
import * as path from "node:path";
import { spawn } from "node:child_process";
import { DATA_SOURCE_DIR, PUBLIC_DIR } from "note-site-common/path";

const sourceParentDir = path.resolve(DATA_SOURCE_DIR, "../..");
const dataDirName = "source";
const resourceLinkDir = path.join(PUBLIC_DIR, "resource");

export default async function fetchData(reclone: boolean) {
  if (reclone) {
    await fs.rm(DATA_SOURCE_DIR, { recursive: true, force: true });
    await fs.rm(resourceLinkDir, { recursive: true, force: true });
  }
  try {
    await fs.access(DATA_SOURCE_DIR);
    console.log("[fetch-data] pulling data");
    const cmd = spawn("git", ["pull"], {
      cwd: DATA_SOURCE_DIR,
      stdio: "inherit",
    });
    cmd.on("close", async () => {
      await createSymlink();
      console.log("[fetch-data] Finished!");
    });
  } catch {
    console.log("[fetch-data] data dir not found. cloning.");

    let clone_url: string | null = null;
    if (process.env.GITHUB_TOKEN) {
      console.log("[fetch-data] GITHUB_TOKEN found");
      clone_url = `https://nazo6:${process.env.GITHUB_TOKEN}@github.com/nazo6/knowledge`;
    } else {
      if (process.env.GITEA_TOKEN) {
        console.log("[fetch-data] GITEA_TOKEN found");
        clone_url = `https://nazo6:${process.env.GITEA_TOKEN}@git.n.nazo6.dev/nazo6/knowledge`;
      } else {
        console.warn(
          "[fetch-data] github token not found. Cloning from internal repo",
        );
        clone_url = "https://git.n.nazo6.dev/nazo6/knowledge";
      }
    }

    if (!clone_url) throw new Error("[fetch-data] clone_url not found");

    await fs.mkdir(sourceParentDir, { recursive: true });

    const cmd = spawn(
      "git",
      ["clone", clone_url, dataDirName, "--depth", "1"],
      {
        cwd: sourceParentDir,
        stdio: "inherit",
      },
    );
    cmd.on("close", async () => {
      await createSymlink();
      console.log("[fetch-data] Finished!");
    });
  }
}

async function createSymlink() {
  console.log("[fetch-data] creating symlink");
  try {
    await fs.rm(resourceLinkDir, { recursive: true });
  } catch {}
  await fs.mkdir(path.join(resourceLinkDir, "../"), { recursive: true });
  await fs.symlink(
    path.join(DATA_SOURCE_DIR, "resource"),
    resourceLinkDir,
    "dir",
  );
}
