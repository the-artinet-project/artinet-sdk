/**
 * @fileoverview Winston logger adapter for Artinet SDK.
 *
 * Lightweight wrapper that adapts a user-configured Winston instance
 * to the SDK's ILogger interface.
 *
 * @module @artinet/sdk/winston
 *
 * @example
 * ```typescript
 * import winston from 'winston';
 * import { configure } from '@artinet/sdk';
 * import { configureWinston } from '@artinet/sdk/winston';
 *
 * // User configures their own winston instance
 * const winstonLogger = winston.createLogger({
 *   level: 'debug',
 *   transports: [new winston.transports.Console()]
 * });
 *
 * // Wrap and configure SDK
 * configure({ logger: configureWinston(winstonLogger) });
 * ```
 */

import type { Logger as WinstonLogger } from "winston";
import type { ILogger } from "../config/observability.js";

/**
 * Level mapping from Winston to Artinet.
 */
const LEVEL_MAP: Record<string, ILogger["level"]> = {
  silly: "trace",
  verbose: "verbose",
  debug: "debug",
  http: "debug",
  info: "info",
  warn: "warn",
  error: "error",
  silent: "silent",
};

/**
 * Reverse level mapping from Artinet to Winston.
 */
const ARTINET_TO_WINSTON: Record<string, string> = {
  trace: "silly",
  verbose: "verbose",
  debug: "debug",
  info: "info",
  warn: "warn",
  error: "error",
  silent: "silent",
};

/**
 * Merge spread args into metadata object for Winston.
 */
function mergeArgs(args: unknown[]): Record<string, unknown> {
  if (args.length === 0) return {};
  if (args.length === 1 && typeof args[0] === "object" && args[0] !== null) {
    return args[0] as Record<string, unknown>;
  }
  return args.reduce<Record<string, unknown>>((acc, arg, idx) => {
    if (typeof arg === "object" && arg !== null) {
      return { ...acc, ...(arg as Record<string, unknown>) };
    }
    acc[`arg${idx}`] = arg;
    return acc;
  }, {});
}

/**
 * Wrap a Winston logger instance to implement ILogger.
 *
 * @param winstonLogger - User-configured Winston logger instance
 * @returns ILogger implementation
 *
 * @example
 * ```typescript
 * import winston from 'winston';
 * import { configure } from '@artinet/sdk';
 * import { configureWinston } from '@artinet/sdk/winston';
 *
 * const myWinston = winston.createLogger({
 *   level: 'debug',
 *   transports: [new winston.transports.Console()]
 * });
 * configure({ logger: configureWinston(myWinston) });
 * ```
 */
export function configureWinston(winstonLogger: WinstonLogger): ILogger {
  return {
    get level() {
      return LEVEL_MAP[winstonLogger.level] ?? "info";
    },

    debug(msg: string, ...args: unknown[]): void {
      winstonLogger.debug(msg, mergeArgs(args));
    },

    info(msg: string, ...args: unknown[]): void {
      winstonLogger.info(msg, mergeArgs(args));
    },

    warn(msg: string, ...args: unknown[]): void {
      winstonLogger.warn(msg, mergeArgs(args));
    },

    error(msg: string, err: Error): void {
      winstonLogger.error(msg, err);
    },

    setLevel(level) {
      winstonLogger.level = ARTINET_TO_WINSTON[level] ?? "info";
    },

    getLevel() {
      return LEVEL_MAP[winstonLogger.level] ?? "info";
    },

    child(context: Record<string, unknown>): ILogger {
      return configureWinston(winstonLogger.child(context));
    },
  };
}

export default configureWinston;
