/**
 * @fileoverview Pino logger adapter for Artinet SDK.
 *
 * Lightweight wrapper that adapts a user-configured Pino instance
 * to the SDK's ILogger interface.
 *
 * @module @artinet/sdk/pino
 *
 * @example
 * ```typescript
 * import pino from 'pino';
 * import { configure } from '@artinet/sdk';
 * import { configurePino } from '@artinet/sdk/pino';
 *
 * // User configures their own pino instance
 * const pinoLogger = pino({
 *   level: 'debug',
 *   transport: { target: 'pino-pretty' }
 * });
 *
 * // Wrap and configure SDK
 * configure({ logger: configurePino(pinoLogger) });
 * ```
 */

import type { Logger as PinoLogger } from "pino";
import type { ILogger } from "../config/observability.js";

/**
 * Level mapping from Pino to Artinet.
 */
const LEVEL_MAP: Record<string, ILogger["level"]> = {
  trace: "trace",
  debug: "debug",
  info: "info",
  warn: "warn",
  error: "error",
  fatal: "error",
  silent: "silent",
};

/**
 * Reverse level mapping from Artinet to Pino.
 */
const ARTINET_TO_PINO: Record<string, string> = {
  trace: "trace",
  verbose: "debug",
  debug: "debug",
  info: "info",
  warn: "warn",
  error: "error",
  silent: "silent",
};

function mergeArgs(args: unknown[]): Record<string, unknown> {
  if (args.length === 0) return undefined as unknown as Record<string, unknown>;
  if (args.length === 1 && typeof args[0] === "object" && args[0] !== null) {
    return args[0] as Record<string, unknown>;
  }
  return args.reduce<Record<string, unknown>>((acc, arg, idx) => {
    if (typeof arg === "object" && arg !== null) {
      return { ...acc, [idx]: arg as Record<string, unknown> };
    }
    acc[`${idx}`] = arg;
    return acc;
  }, {});
}

/**
 * Wrap a Pino logger instance to implement ILogger.
 *
 * @param pinoLogger - User-configured Pino logger instance
 * @returns ILogger implementation
 *
 * @example
 * ```typescript
 * import pino from 'pino';
 * import { configure } from '@artinet/sdk';
 * import { configurePino } from '@artinet/sdk/pino';
 *
 * const myPino = pino({ level: 'debug' });
 * configure({ logger: configurePino(myPino) });
 * ```
 */
export function configurePino(pinoLogger: PinoLogger): ILogger {
  return {
    get level() {
      return LEVEL_MAP[pinoLogger.level] ?? "info";
    },

    debug(msg: string, ...args: unknown[]): void {
      pinoLogger.debug(mergeArgs(args), msg);
    },

    info(msg: string, ...args: unknown[]): void {
      pinoLogger.info(mergeArgs(args), msg);
    },

    warn(msg: string, ...args: unknown[]): void {
      pinoLogger.warn(mergeArgs(args), msg);
    },

    error(msg: string, err: Error): void {
      pinoLogger.error(err, msg);
    },

    setLevel(level) {
      pinoLogger.level = ARTINET_TO_PINO[level] ?? "info";
    },

    getLevel() {
      return LEVEL_MAP[pinoLogger.level] ?? "info";
    },

    child(context: Record<string, unknown>): ILogger {
      return configurePino(pinoLogger.child(context));
    },
  };
}

export default configurePino;
