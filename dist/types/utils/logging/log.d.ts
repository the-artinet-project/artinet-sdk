/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Logger utility for server operations
 * @param context The context of the log (e.g., "A2AServer", "TaskStore")
 * @param message The message to log
 * @param data Optional data to include in the log
 */
export declare function logDebug(context: string, message: string, data?: unknown): void;
/**
 * Logger utility for server errors
 * @param context The context of the log (e.g., "A2AServer", "TaskStore")
 * @param message The message to log
 * @param error The error object
 * @param data Optional additional data
 */
export declare function logError(context: string, message: string, error: unknown, data?: unknown): void;
/**
 * Logger utility for server warnings
 * @param context The context of the log (e.g., "A2AServer", "TaskStore")
 * @param message The message to log
 * @param data Optional data to include in the log
 */
export declare function logWarn(context: string, message: string, data?: unknown): void;
/**
 * Logger utility for server information
 * @param context The context of the log (e.g., "A2AServer", "TaskStore")
 * @param message The message to log
 * @param data Optional data to include in the log
 */
export declare function logInfo(context: string, message: string, data?: unknown): void;
//# sourceMappingURL=log.d.ts.map