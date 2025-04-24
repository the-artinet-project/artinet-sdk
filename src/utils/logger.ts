/**
 * Logger utility for the SDK using Pino
 */
import { pino } from "pino";

// Define log levels for type safety
export type LogLevel = "silent" | "error" | "warn" | "info" | "debug" | "trace";

// Create the base logger with default configuration
const baseLogger = pino({
  name: "A2AClient",
  level: "error", // Default level
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
export function configureLogger(options: {
  level?: LogLevel;
  name?: string;
  prettyPrint?: boolean;
}) {
  // Change log level if specified
  if (options.level) {
    logger.level = options.level;
  }

  // Return the logger instance for chaining
  return logger;
}
