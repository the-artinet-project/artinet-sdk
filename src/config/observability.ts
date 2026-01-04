/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Zero-dependency observability interfaces for the Artinet ecosystem.
 *
 * Provides minimal interfaces for logging and tracing that consumers can implement
 * with their preferred tools (Pino, Winston, OpenTelemetry, etc.).
 *
 * Design principles:
 * - Zero runtime dependencies
 * - No-op defaults for zero overhead when not configured
 * - Environment agnostic (Node, Deno, Bun, edge, browser)
 * - Consumer brings their own implementation
 *
 * @module utils/observability
 */

/**
 * Minimal logger interface.
 *
 * Consumers provide their own implementation using their preferred
 * logging library (Pino, Winston, console, etc.).
 *
 * Uses spread args for maximum compatibility - works naturally with
 * console.log, Pino, Winston, and most logging libraries.
 *
 * @example
 * ```typescript
 * // Console implementation (just works)
 * const logger: ILogger = console;
 *
 * // Pino implementation
 * import pino from 'pino';
 * const pinoLogger = pino();
 *
 * const logger: ILogger = {
 *   debug: (msg, ...args) => pinoLogger.debug(Object.assign({}, ...args), msg),
 *   info: (msg, ...args) => pinoLogger.info(Object.assign({}, ...args), msg),
 *   warn: (msg, ...args) => pinoLogger.warn(Object.assign({}, ...args), msg),
 *   error: (msg, ...args) => pinoLogger.error(Object.assign({}, ...args), msg),
 * };
 *
 * // Winston implementation
 * import winston from 'winston';
 * const winstonLogger = winston.createLogger({ ... });
 *
 * const logger: ILogger = {
 *   debug: (msg, ...args) => winstonLogger.debug(msg, ...args),
 *   info: (msg, ...args) => winstonLogger.info(msg, ...args),
 *   warn: (msg, ...args) => winstonLogger.warn(msg, ...args),
 *   error: (msg, ...args) => winstonLogger.error(msg, ...args),
 * };
 * ```
 */
export interface ILogger {
  /**
   * Log level.
   * @default "info"
   */
  level?: "trace" | "verbose" | "debug" | "info" | "warn" | "error" | "silent";

  /**
   * Log debug-level message.
   * @param msg - Log message
   * @param args - Optional additional arguments (context, data, etc.)
   */
  debug(msg: string, ...args: unknown[]): void;

  /**
   * Log info-level message.
   * @param msg - Log message
   * @param args - Optional additional arguments (context, data, etc.)
   */
  info(msg: string, ...args: unknown[]): void;

  /**
   * Log warn-level message.
   * @param msg - Log message
   * @param args - Optional additional arguments (context, data, etc.)
   */
  warn(msg: string, ...args: unknown[]): void;

  /**
   * Log error-level message.
   * @param msg - Log message
   * @param err - Error to log
   */
  error(msg: string, err: unknown): void;

  /**
   * Set log level.
   * @param level - Log level
   */
  setLevel?(
    level: "trace" | "verbose" | "debug" | "info" | "warn" | "error" | "silent"
  ): void;

  /**
   * Get log level.
   * @returns Current log level or undefined if not set
   */
  getLevel?():
    | "trace"
    | "verbose"
    | "debug"
    | "info"
    | "warn"
    | "error"
    | "silent";

  /**
   * Create child logger with bound context.
   * @param context - Context to bind to the child logger
   * @returns Child logger or undefined if not implemented
   */
  child?(context: Record<string, unknown>): ILogger;
}

/**
 * Format error for logging.
 * @param err - Error to format
 * @returns Formatted error
 */
export function formatError(err: unknown): Record<string, unknown> {
  if (err instanceof Error) {
    return {
      message: err.message,
      stack: err.stack,
      name: err.name,
    };
  }
  return { error: String(err) };
}

/**
 * No-op logger implementation.
 * Used when no logger is configured - zero overhead.
 *
 * @example
 * ```typescript
 * const logger = config.logger ?? noopLogger;
 * logger.info('This does nothing if no logger configured');
 * ```
 */
export const noopLogger: ILogger = {
  debug: () => {},
  info: () => {},
  warn: () => {},
  error: () => {},
};
