/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * A lightweight cross-platform logger instance
 */
export declare const logger: Console;
export declare let level: "trace" | "verbose" | "debug" | "info" | "warning" | "error" | "silent";
/**
 * Configures the logger with the specified options
 * @param options - Logger configuration options
 */
export declare function configureLogger(options: {
    level?: "trace" | "verbose" | "debug" | "info" | "warning" | "error" | "silent";
    name?: string;
    prettyPrint?: boolean;
}): Console;
