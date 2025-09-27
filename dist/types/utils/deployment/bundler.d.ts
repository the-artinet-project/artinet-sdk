/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Bundles a given JavaScript or TypeScript file into a single minified ES module string.
 * This utility leverages `esbuild` for efficient bundling, minification, and sourcemap generation.
 * It's designed to prepare agent code for deployment by packaging it and its local dependencies.
 *
 * @param filePath - The URL of the entry point file to bundle.
 * @returns A promise that resolves to a string containing the bundled and minified code.
 * @throws An error if the file path does not exist, is not a file, or if bundling fails for any reason.
 */
export declare function bundle(filePath: URL): Promise<string>;
//# sourceMappingURL=bundler.d.ts.map