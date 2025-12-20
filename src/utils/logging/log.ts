/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */

import { logger } from "../../config/index.js";

const level = logger.getLevel?.() ?? "info";
/**
 * @deprecated
 * Logger utility for server operations
 * @param context The context of the log (e.g., "A2AServer", "TaskStore")
 * @param message The message to log
 * @param data Optional data to include in the log
 */
export function logDebug(
  context: string,
  message: string,
  data?: unknown
): void {
  const logData: Record<string, unknown> = { component: context };
  if (data !== undefined) {
    logData.data = data;
  }
  if (
    level === "silent" ||
    level === "warn" ||
    level === "error" ||
    level === "info"
  ) {
    return;
  }
  logger.debug(message, logData);
}

/**
 * @deprecated
 * Logger utility for server errors
 * @param context The context of the log (e.g., "A2AServer", "TaskStore")
 * @param message The message to log
 * @param error The error object
 * @param data Optional additional data
 */
export function logError(
  context: string,
  message: string,
  error: unknown,
  data?: unknown
): void {
  const logData: Record<string, unknown> = {
    component: context,
    err: error instanceof Error ? error : new Error(String(error)),
  };
  if (data !== undefined) {
    logData.data = data;
  }
  if (level === "silent") {
    return;
  }
  logger.error(message, logData);
}

/**
 * @deprecated
 * Logger utility for server warnings
 * @param context The context of the log (e.g., "A2AServer", "TaskStore")
 * @param message The message to log
 * @param data Optional data to include in the log
 */
export function logWarn(
  context: string,
  message: string,
  data?: unknown
): void {
  const logData: Record<string, unknown> = { component: context };
  if (data !== undefined) {
    logData.data = data;
  }
  if (level === "silent" || level === "error") {
    return;
  }
  logger.warn(message, logData);
}

/**
 * @deprecated
 * Logger utility for server information
 * @param context The context of the log (e.g., "A2AServer", "TaskStore")
 * @param message The message to log
 * @param data Optional data to include in the log
 */
export function logInfo(
  context: string,
  message: string,
  data?: unknown
): void {
  const logData: Record<string, unknown> = { component: context };
  if (data !== undefined) {
    logData.data = data;
  }
  if (level === "error" || level === "warn" || level === "silent") {
    return;
  }
  logger.info(message, logData);
}
