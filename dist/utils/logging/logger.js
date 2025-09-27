/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Logger utility for the SDK using Pino
 */
import pino from "pino";
// Create the base logger with default configuration
const baseLogger = pino({
    name: "A2A",
    level: "error", // Default level
    browser: {
        asObject: true,
        formatters: {
            level(label, _number) {
                return { level: label.toUpperCase() };
            },
        },
        write: (o) => console.log(JSON.stringify(o)),
    },
    // In production, don't use the pretty transport by default
    ...(process.env.NODE_ENV !== "production" && {
        transport: {
            target: "pino-pretty",
            options: {
                colorize: true,
                translateTime: true,
                ignore: "pid,hostname",
            },
        },
    }),
});
/**
 * SDK logger instance
 */
export const logger = baseLogger;
/**
 * Configures the logger with the specified options
 *
 * @param options - Logger configuration options
 */
export function configureLogger(options) {
    // Change log level if specified
    if (options.level) {
        logger.level = options.level;
    }
    // Return the logger instance for chaining
    return logger;
}
//# sourceMappingURL=logger.js.map