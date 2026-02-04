/**
 * @fileoverview Global configuration for the Artinet runtime.
 *
 * Provides a centralized configuration interface that consumers use to
 * inject their implementations of observability, storage, and other
 * platform-specific dependencies.
 *
 * Design principles:
 * - Single configuration point for the entire SDK
 * - No-op defaults for all optional dependencies
 * - Type-safe configuration interface
 * - Configure once at application startup
 *
 * @module config
 *
 * @example
 * ```typescript
 * import { configure, getLogger, getTracer } from '@artinet/armada';
 * import pino from 'pino';
 *
 * // Configure at app startup
 * configure({
 *   logger: {
 *     debug: (msg, ctx) => pino().debug(ctx, msg),
 *     info: (msg, ctx) => pino().info(ctx, msg),
 *     warn: (msg, ctx) => pino().warn(ctx, msg),
 *     error: (msg, ctx) => pino().error(ctx, msg),
 *   },
 * });
 *
 * // Later in your code
 * const logger = getLogger();
 * logger.info('Application started');
 * ```
 */

import { ILogger, noopLogger } from './observability.js';
import { trace, Tracer } from '@opentelemetry/api';
export type { ILogger } from './observability.js';

/**
 * Artinet SDK configuration interface.
 *
 * All properties are optional - the SDK provides sensible no-op defaults.
 * Configure only what you need.
 */
export interface ArtinetConfig {
    /**
     * Logger implementation for structured logging.
     * @default noopLogger (no logging)
     */
    logger?: ILogger;

    /**
     * Tracer implementation for distributed tracing.
     * @default trace.getTracer('artinet') (no tracing)
     */
    tracer?: Tracer;
}

/**
 * Internal configuration state.
 * @internal
 */
let _config: ArtinetConfig = {};

/**
 * Configure the Artinet SDK.
 *
 * Call this once at application startup to inject your implementations.
 * Subsequent calls will merge with existing configuration.
 *
 * @param config - Configuration options
 *
 * @example
 * ```typescript
 * // Basic configuration with console
 * configure({ logger: console });
 * ```
 *
 * @example
 * ```typescript
 * // Production configuration with Pino and OpenTelemetry
 * import pino from 'pino';
 * import { trace } from '@opentelemetry/api';
 *
 * const pinoLogger = pino();
 *
 * configure({
 *   logger: {
 *     debug: (msg, ...args) => pinoLogger.debug(Object.assign({}, ...args), msg),
 *     info: (msg, ...args) => pinoLogger.info(Object.assign({}, ...args), msg),
 *     warn: (msg, ...args) => pinoLogger.warn(Object.assign({}, ...args), msg),
 *     error: (msg, ...args) => pinoLogger.error(Object.assign({}, ...args), msg),
 *   },
 *   tracer: {
 *     startSpan: (name, attrs) => {
 *       const span = trace.getTracer('my-app').startSpan(name);
 *       // ... wrap span
 *       return wrappedSpan;
 *     },
 *   },
 * });
 * ```
 */
export function configure(config: ArtinetConfig): void {
    _config = { ..._config, ...config };
}

/**
 * Reset configuration to defaults.
 *
 * Primarily useful for testing to ensure clean state between tests.
 *
 * @example
 * ```typescript
 * beforeEach(() => {
 *   resetConfig();
 * });
 * ```
 */
export function resetConfig(): void {
    _config = {};
}

/**
 * Get the current configuration.
 *
 * Returns a copy to prevent external mutation.
 *
 * @returns Current configuration (readonly copy)
 */
export function getConfig(): Readonly<ArtinetConfig> {
    return { ..._config };
}

/**
 * Get the configured logger or no-op default.
 *
 * @returns Logger implementation
 *
 * @example
 * ```typescript
 * const logger = getLogger();
 * logger.info('Processing request', { requestId: '123' }, 'extra data');
 * ```
 */
export function getLogger(): ILogger {
    return _config.logger ?? noopLogger;
}

/**
 * Get the configured tracer or no-op default.
 *
 * @returns Tracer implementation
 *
 * @example
 * ```typescript
 * const tracer = getTracer();
 * const span = tracer.startSpan('processRequest', { requestId: '123' });
 * try {
 *   // ... do work
 *   span.setStatus('ok');
 * } catch (error) {
 *   span.setStatus('error', error.message);
 *   throw error;
 * } finally {
 *   span.end();
 * }
 * ```
 */
export function getTracer(): Tracer {
    return _config.tracer ?? trace.getTracer('artinet');
}

export const logger = {
    debug: (msg: string, ...args: unknown[]) => getLogger()?.debug?.(msg, ...args),
    info: (msg: string, ...args: unknown[]) => getLogger()?.info?.(msg, ...args),
    warn: (msg: string, ...args: unknown[]) => getLogger()?.warn?.(msg, ...args),
    error: (msg: string, err: unknown) => getLogger()?.error?.(msg, err),
    setLevel: (level: 'debug' | 'info' | 'warn' | 'error') => getLogger()?.setLevel?.(level),
    getLevel: () => getLogger()?.getLevel?.() ?? 'info',
    child: (context: Record<string, unknown>) => getLogger()?.child?.(context) ?? noopLogger,
};
