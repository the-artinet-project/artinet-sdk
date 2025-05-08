import { logDebug, logError } from "../logging/log.js";
import * as esbuild from "esbuild";
import { fileURLToPath } from "node:url";

export async function bundle(filePath: URL): Promise<string> {
  const entryPath = fileURLToPath(filePath);
  logDebug(
    `bundler: `,
    `Attempting to recursively read imports starting from:`,
    entryPath
  );
  try {
    const fs = await import("node:fs");
    const stats = fs.statSync(entryPath);
    if (!stats.isFile()) {
      logError(`bundler: `, `Filepath is not a file:`, entryPath);
      throw new Error(
        `// BUNDLING FAILED: Filepath is not a file: ${entryPath}`
      );
    }
    logDebug(`bundler: `, `Filepath exists:`, entryPath);
  } catch (err: any) {
    logError(`bundler: `, `Filepath does not exist:`, entryPath);
    throw new Error(
      `// BUNDLING FAILED: Filepath does not exist: ${entryPath}`
    );
  }

  try {
    const result = await esbuild.build({
      entryPoints: [entryPath],
      bundle: true,
      minify: true,
      sourcemap: true,
      platform: "node",
      format: "esm",
      write: false,
    });
    const output = result?.outputFiles?.[0]?.text ?? "";
    logDebug(
      `bundler: Successfully read and bundled code:`,
      output.length.toString()
    );
    return output;
  } catch (err: any) {
    logError(`bundler: `, `Error during recursive read:`, err.message);
    throw new Error(`// BUNDLING FAILED: ${err.message}`);
  }
}
