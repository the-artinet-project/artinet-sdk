/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * SDK logger instance
 */
export const logger = console;
export let level:
  | "verbose"
  | "debug"
  | "info"
  | "warning"
  | "error"
  | "silent" = "silent";
/**
 * Configures the logger with the specified options
 * @deprecated Use the logger instance directly instead
 * @param options - Logger configuration options
 */
export function configureLogger(options: {
  level?: "verbose" | "debug" | "info" | "warning" | "error" | "silent";
  name?: string;
  prettyPrint?: boolean;
}) {
  logger.warn(
    "logger deprecated and will be removed in the next major release",
    options
  );
  level = options.level || "silent";
  return logger;
}
