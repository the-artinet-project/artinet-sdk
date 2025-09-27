/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Logger utility for the SDK using Pino
 */
import pino from "pino";
export type LogLevel = "silent" | "error" | "warn" | "info" | "debug" | "trace";
/**
 * SDK logger instance
 */
export declare const logger: pino.Logger<never, boolean>;
/**
 * Configures the logger with the specified options
 *
 * @param options - Logger configuration options
 */
export declare function configureLogger(options: {
    level?: LogLevel;
    name?: string;
    prettyPrint?: boolean;
}): pino.Logger<never, boolean>;
//# sourceMappingURL=logger.d.ts.map