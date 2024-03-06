import tsconfigPaths from "vite-tsconfig-paths";
import { fileURLToPath } from "node:url";
import { defineConfig, UserConfig } from "vite";
import { cjsInterop } from "vite-plugin-cjs-interop";

export default defineConfig(({ mode }) => {
  const config: UserConfig = {
    plugins: [
      tsconfigPaths({
        root: fileURLToPath(new URL(".", import.meta.url)),
      }),
    ],
  };

  if (mode === "development") {
    config.optimizeDeps = {
      include: [
        "react-tweet > use-sync-external-store/shim/index.js",
        "react-tweet > date-fns/format/index.js",
      ],
      exclude: ["@resvg/resvg-js"],
    };
    config.ssr = {
      noExternal: ["react-tweet"],
    };
    config.plugins?.push(
      cjsInterop({
        dependencies: ["react-accessible-treeview"],
      }),
    );
  } else {
    config.build = {
      minify: true,
    };
  }
  return config;
});
