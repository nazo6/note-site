import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { $, cd } from "zx";

import generateData from "./data/generate";
import fetchData from "./data/fetch";
import generateSitemap from "./sitemap";

import { SITE_ROOT } from "note-site-common/path";
import generateOgImage from "./ogImage";
import clean from "./clean";

async function build() {
  cd(SITE_ROOT);

  await $`rm -rf ./data/build/metadata`;

  console.log("Generating data...");
  await generateData();

  console.log("Building...");
  await $`pnpm waku build --with-ssr`;

  console.log("Generating og images...");
  await generateOgImage();

  console.log("Generating sitemap...");
  await generateSitemap();
}

const cmd = yargs(hideBin(process.argv)).scriptName("x");

cmd.command("dev", "start development server", async () => {
  cd(SITE_ROOT);
  await $`pnpm waku dev --with-ssr`;
});

cmd
  .command("build", "build", async () => {
    await build();
  })
  .command("build:og", "Generate og image", async () => {
    await generateOgImage();
  })
  .command("build:sitemap", "Generate sitemap", async () => {
    await generateSitemap();
  });

cmd.command("clean", "clean", async () => {
  await clean();
});

cmd
  .command(
    "data:update",
    "updates data or clone if not exist",
    (yargs) => {
      return yargs.positional("r", {
        describe: "Reclone data",
        default: false,
      });
    },
    async (argv) => {
      await fetchData(argv.r);
    },
  )
  .command("data:generate", "generate json data", async () => {
    await generateData();
  });

cmd
  .help()
  .alias("h", "help")
  .demandCommand()
  .recommendCommands()
  .strict()
  .parse();
