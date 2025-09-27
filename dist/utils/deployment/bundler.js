/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
import { logDebug, logError } from "../logging/log.js";
import * as esbuild from "esbuild";
import { fileURLToPath } from "node:url";
/**
 * Bundles a given JavaScript or TypeScript file into a single minified ES module string.
 * This utility leverages `esbuild` for efficient bundling, minification, and sourcemap generation.
 * It's designed to prepare agent code for deployment by packaging it and its local dependencies.
 *
 * @param filePath - The URL of the entry point file to bundle.
 * @returns A promise that resolves to a string containing the bundled and minified code.
 * @throws An error if the file path does not exist, is not a file, or if bundling fails for any reason.
 */
export async function bundle(filePath) {
    const entryPath = fileURLToPath(filePath);
    logDebug(`bundler: `, `Attempting to recursively read imports starting from:`, entryPath);
    try {
        const fs = await import("node:fs");
        const stats = fs.statSync(entryPath);
        if (!stats.isFile()) {
            logError(`bundler: `, `Filepath is not a file:`, entryPath);
            throw new Error(`// BUNDLING FAILED: Filepath is not a file: ${entryPath}`);
        }
        logDebug(`bundler: `, `Filepath exists:`, entryPath);
    }
    catch (err) {
        logError(`bundler: `, `Filepath does not exist:`, entryPath);
        throw new Error(`// BUNDLING FAILED: Filepath does not exist: ${entryPath}`);
    }
    try {
        const result = await esbuild.build({
            entryPoints: [entryPath],
            bundle: true,
            minify: true,
            sourcemap: false,
            platform: "node",
            format: "esm",
            write: false,
        });
        const output = result?.outputFiles?.[0]?.text ?? "";
        logDebug(`bundler: Successfully read and bundled code:`, output.length.toString());
        return output;
    }
    catch (err) {
        logError(`bundler: `, `Error during recursive read:`, err.message);
        throw new Error(`// BUNDLING FAILED: ${err.message}`);
    }
}
//# sourceMappingURL=bundler.js.map