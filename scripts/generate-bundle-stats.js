import { rollup } from "rollup";
import typescript from "@rollup/plugin-typescript";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { statSync, writeFileSync, mkdirSync } from "fs";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, "..");

async function generateStats() {
  const bundle = await rollup({
    input: resolve(rootDir, "packages/whks/src/index.ts"),
    plugins: [
      nodeResolve(),
      commonjs(),
      typescript({
        tsconfig: resolve(rootDir, "packages/whks/tsconfig.json"),
      }),
    ],
  });

  const outputDir = resolve(rootDir, "dist-bundle");
  mkdirSync(outputDir, { recursive: true });

  await bundle.write({
    file: resolve(outputDir, "bundle.js"),
    format: "umd",
    name: "whks",
  });

  // Get bundle file size
  const bundlePath = resolve(outputDir, "bundle.js");
  const bundleStats = statSync(bundlePath);
  const bundleSize = bundleStats.size;

  // Generate webpack-compatible stats.json
  const stats = {
    version: 5,
    hash: "bundle-stats",
    time: Date.now(),
    builtAt: Date.now(),
    assets: [
      {
        name: "bundle.js",
        size: bundleSize,
        chunks: ["main"],
        chunkNames: [],
        emitted: true,
        isOverSizeLimit: false,
      },
    ],
    chunks: [
      {
        id: "main",
        rendered: true,
        initial: true,
        entry: true,
        recorded: false,
        reason: "",
        size: bundleSize,
        names: ["main"],
        files: ["bundle.js"],
        hash: "bundle-hash",
        siblings: [],
        children: [],
        childrenByOrder: {},
        modules: [],
      },
    ],
    modules: [],
    entrypoints: {
      main: {
        chunks: ["main"],
        assets: ["bundle.js"],
      },
    },
    errors: [],
    warnings: [],
  };

  writeFileSync(
    resolve(outputDir, "stats.json"),
    JSON.stringify(stats, null, 2)
  );

  await bundle.close();
}

generateStats().catch(console.error);
