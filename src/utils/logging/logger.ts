/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * A lightweight cross-platform logger instance
 */
export const logger = console;
export let level:
  | "trace"
  | "verbose"
  | "debug"
  | "info"
  | "warning"
  | "error"
  | "silent" = "silent";

/**
 * Configures the logger with the specified options
 * @param options - Logger configuration options
 */
export function configureLogger(options: {
  level?: "trace" | "verbose" | "debug" | "info" | "warning" | "error" | "silent";
  name?: string;
  prettyPrint?: boolean;
}) {
  level = options.level || "silent";
  return logger;
}
configureLogger({ level: "silent" });
