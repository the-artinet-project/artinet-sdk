/**
 * @fileoverview Default configuration for the Artinet runtime.
 *
 * Provides sensible defaults using built-in console for logging.
 * Import and call `applyDefaults()` at application startup if you
 * want logging enabled without custom configuration.
 *
 * @module config/default
 *
 * @example
 * ```typescript
 * import { applyDefaults } from '@artinet/core';
 *
 * // Enable console logging with defaults
 * applyDefaults();
 *
 * // Or override specific options
 * applyDefaults({ logger: myCustomLogger });
 * ```
 */

import { configure, ArtinetConfig } from "./index.js";
import { ILogger } from "./observability.js";

/**
 * Default logger implementation using console.
 *
 * Maps directly to console methods for zero-config logging.
 */
export const consoleLogger: ILogger = {
  debug: (msg, ...args) => console.debug(`[DEBUG] ${msg}`, ...args),
  info: (msg, ...args) => console.info(`[INFO] ${msg}`, ...args),
  warn: (msg, ...args) => console.warn(`[WARN] ${msg}`, ...args),
  error: (msg, err) => console.error(`[ERROR] ${msg}`, err),
};

/**
 * Default configuration with console logging enabled.
 */
export const defaultConfig: ArtinetConfig = {
  logger: consoleLogger,
};

/**
 * Apply default configuration.
 *
 * Call this at application startup to enable console logging.
 * Optionally pass overrides to customize specific options.
 *
 * @param overrides - Optional configuration to merge with defaults
 *
 * @example
 * ```typescript
 * // Use all defaults
 * applyDefaults();
 *
 * // Use defaults but with custom tracer
 * applyDefaults({ tracer: myTracer });
 * ```
 */
export function applyDefaults(overrides?: Partial<ArtinetConfig>): void {
  configure({
    ...defaultConfig,
    ...overrides,
  });
}
