import { logger } from "./logger.js";

/**
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
  logger.debug(logData, message);
}

/**
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
  logger.error(logData, message);
}

/**
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
  logger.warn(logData, message);
}

/**
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
  logger.info(logData, message);
}
