/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 *
 * @fileoverview OpenTelemetry integration for Artinet SDK.
 *
 * Lightweight utilities for integrating user-configured OpenTelemetry
 * with the SDK's tracing and logging interfaces.
 *
 * @module @artinet/sdk/otel
 *
 * @example
 * ```typescript
 * import { trace } from '@opentelemetry/api';
 * import { configure } from '@artinet/sdk';
 * import { configureOtel, withSpan } from '@artinet/sdk/otel';
 *
 * // User initializes their own OpenTelemetry setup
 * // ... NodeSDK setup, exporters, etc. ...
 *
 * // Get tracer and configure SDK
 * const tracer = trace.getTracer('my-agent');
 * configure({
 *   tracer,
 *   logger: configureOtel({ level: 'debug' })
 * });
 * ```
 */

import {
  trace,
  context,
  SpanKind,
  SpanStatusCode,
  Tracer,
  Span,
  Context,
} from "@opentelemetry/api";
import type { ILogger } from "../config/observability.js";
import { formatError } from "../config/observability.js";

/**
 * Options for configuring the OTel-aware logger.
 */
export interface OtelLoggerOptions {
  /**
   * Base logger to wrap (logs go here AND to spans).
   * If not provided, logs only go to spans.
   */
  baseLogger?: ILogger;

  /**
   * Log level.
   * @default 'info'
   */
  level?: "trace" | "verbose" | "debug" | "info" | "warn" | "error" | "silent";
}

/**
 * Level priority for filtering.
 */
const LEVEL_PRIORITY: Record<string, number> = {
  trace: 0,
  verbose: 1,
  debug: 2,
  info: 3,
  warn: 4,
  error: 5,
  silent: 6,
};

/**
 * Create a logger that adds log events to the current span.
 *
 * This logger optionally wraps a base logger and adds all log messages
 * as span events in the current trace context.
 *
 * @param options - Logger options
 * @returns ILogger implementation
 *
 * @example
 * ```typescript
 * import { configure } from '@artinet/sdk';
 * import { configureOtel } from '@artinet/sdk/otel';
 * import { configurePino } from '@artinet/sdk/pino';
 * import pino from 'pino';
 *
 * // Logs go to both Pino AND span events
 * configure({
 *   logger: configureOtel({
 *     baseLogger: configurePino(pino()),
 *     level: 'debug'
 *   })
 * });
 * ```
 */
export function configureOtel(options: OtelLoggerOptions = {}): ILogger {
  let currentLevel = options.level ?? "info";
  const baseLogger = options.baseLogger;

  function shouldLog(level: string): boolean {
    return LEVEL_PRIORITY[level] >= LEVEL_PRIORITY[currentLevel];
  }

  function addSpanEvent(level: string, msg: string, args: unknown[]): void {
    const span = trace.getActiveSpan();
    if (!span) return;

    const attributes: Record<string, string | number | boolean> = {
      "log.level": level,
    };

    args.forEach((arg, idx) => {
      if (typeof arg === "object" && arg !== null) {
        Object.entries(arg as Record<string, unknown>).forEach(
          ([key, value]) => {
            if (
              typeof value === "string" ||
              typeof value === "number" ||
              typeof value === "boolean"
            ) {
              attributes[key] = value;
            } else {
              attributes[key] = JSON.stringify(value);
            }
          }
        );
      } else if (arg !== undefined) {
        attributes[`arg${idx}`] = String(arg);
      }
    });

    span.addEvent(msg, attributes);
  }

  return {
    get level() {
      return currentLevel;
    },

    debug(msg: string, ...args: unknown[]): void {
      if (!shouldLog("debug")) return;
      addSpanEvent("debug", msg, args);
      baseLogger?.debug(msg, ...args);
    },

    info(msg: string, ...args: unknown[]): void {
      if (!shouldLog("info")) return;
      addSpanEvent("info", msg, args);
      baseLogger?.info(msg, ...args);
    },

    warn(msg: string, ...args: unknown[]): void {
      if (!shouldLog("warn")) return;
      addSpanEvent("warn", msg, args);
      baseLogger?.warn(msg, ...args);
    },

    error(msg: string, err: Error): void {
      if (!shouldLog("error")) return;
      addSpanEvent("error", msg, [formatError(err)]);
      baseLogger?.error(msg, err);
    },

    setLevel(level) {
      currentLevel = level;
      baseLogger?.setLevel?.(level);
    },

    getLevel() {
      return currentLevel;
    },

    child(ctx: Record<string, unknown>): ILogger {
      return configureOtel({
        baseLogger: baseLogger?.child?.(ctx),
        level: currentLevel,
      });
    },
  };
}

/**
 * Execute a function within a new span.
 *
 * @param tracer - User's tracer instance
 * @param name - Span name
 * @param fn - Function to execute
 * @param options - Optional span options
 * @returns Result of the function
 *
 * @example
 * ```typescript
 * import { trace } from '@opentelemetry/api';
 * import { withSpan } from '@artinet/sdk/otel';
 *
 * const tracer = trace.getTracer('my-agent');
 * const result = await withSpan(tracer, 'processTask', async (span) => {
 *   span.setAttribute('taskId', '123');
 *   return await doWork();
 * });
 * ```
 */
export async function withSpan<T>(
  tracer: Tracer,
  name: string,
  fn: (span: Span) => Promise<T>,
  options?: {
    kind?: SpanKind;
    attributes?: Record<string, string | number | boolean>;
  }
): Promise<T> {
  return tracer.startActiveSpan(
    name,
    { kind: options?.kind ?? SpanKind.INTERNAL },
    async (span) => {
      if (options?.attributes) {
        Object.entries(options.attributes).forEach(([key, value]) => {
          span.setAttribute(key, value);
        });
      }

      try {
        const result = await fn(span);
        span.setStatus({ code: SpanStatusCode.OK });
        return result;
      } catch (error) {
        span.setStatus({
          code: SpanStatusCode.ERROR,
          message: error instanceof Error ? error.message : String(error),
        });
        span.recordException(error as Error);
        throw error;
      } finally {
        span.end();
      }
    }
  );
}

/**
 * Re-export OpenTelemetry API types for convenience.
 */
export {
  trace,
  context,
  SpanKind,
  SpanStatusCode,
  type Tracer,
  type Span,
  type Context,
};

export default configureOtel;
