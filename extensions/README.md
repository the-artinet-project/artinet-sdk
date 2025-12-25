# Artinet SDK Extensions

Lightweight logger adapters for the Artinet SDK. These wrap your existing logger instances to match the SDK's `ILogger` interface.

## Design Philosophy

**You configure, we adapt.** These extensions are thin wrappers—they don't create loggers or make configuration decisions. You bring your fully-configured logger instance, and we adapt it to `ILogger`.

## Available Extensions

| Extension     | Import Path            | Wraps                              |
| ------------- | ---------------------- | ---------------------------------- |
| Pino          | `@artinet/sdk/pino`    | `pino` Logger                      |
| Winston       | `@artinet/sdk/winston` | `winston` Logger                   |
| OpenTelemetry | `@artinet/sdk/otel`    | Span events + optional base logger |

## Installation

```bash
# Install SDK + your preferred logger
npm install @artinet/sdk pino
npm install @artinet/sdk winston
npm install @artinet/sdk @opentelemetry/api
```

## Usage

### Pino

```typescript
import pino from "pino";
import { configure } from "@artinet/sdk";
import { configurePino } from "@artinet/sdk/pino";

// You configure pino however you want
const pinoLogger = pino({
  level: "debug",
  transport: { target: "pino-pretty" },
});

// We wrap it for the SDK
configure({ logger: configurePino(pinoLogger) });
```

### Winston

```typescript
import winston from "winston";
import { configure } from "@artinet/sdk";
import { configureWinston } from "@artinet/sdk/winston";

// You configure winston however you want
const winstonLogger = winston.createLogger({
  level: "debug",
  transports: [new winston.transports.Console()],
});

// We wrap it for the SDK
configure({ logger: configureWinston(winstonLogger) });
```

### OpenTelemetry

```typescript
import { trace } from "@opentelemetry/api";
import { configure } from "@artinet/sdk";
import { configureOtel, withSpan } from "@artinet/sdk/otel";

// You initialize OpenTelemetry however you want
// ... NodeSDK setup, exporters, instrumentations ...

// Get your tracer
const tracer = trace.getTracer("my-agent");

// Configure SDK with span-event logging
configure({
  tracer,
  logger: configureOtel({ level: "debug" }),
});

// Use withSpan helper
const result = await withSpan(tracer, "processTask", async (span) => {
  span.setAttribute("taskId", "123");
  return await doWork();
});
```

### Combining Loggers

```typescript
import pino from "pino";
import { configure } from "@artinet/sdk";
import { configurePino } from "@artinet/sdk/pino";
import { configureOtel } from "@artinet/sdk/otel";

// Logs go to both Pino AND span events
configure({
  logger: configureOtel({
    baseLogger: configurePino(pino({ level: "debug" })),
    level: "debug",
  }),
});
```

## API Reference

### `configurePino(pinoLogger)`

Wraps a Pino logger instance. Also available as default export.

### `configureWinston(winstonLogger)`

Wraps a Winston logger instance. Also available as default export.

### `configureOtel(options?)`

Creates a logger that adds events to the active span. Also available as default export.

| Option       | Type       | Description                          |
| ------------ | ---------- | ------------------------------------ |
| `baseLogger` | `ILogger`  | Optional logger to also send logs to |
| `level`      | `LogLevel` | Log level (default: `'info'`)        |

**LogLevel**: `'trace' | 'verbose' | 'debug' | 'info' | 'warn' | 'error' | 'silent'`

### `withSpan(tracer, name, fn, options?)`

Executes a function within a new span with automatic error handling.

| Option       | Type                                      | Description                              |
| ------------ | ----------------------------------------- | ---------------------------------------- |
| `kind`       | `SpanKind`                                | Span kind (default: `SpanKind.INTERNAL`) |
| `attributes` | `Record<string, string\|number\|boolean>` | Initial span attributes                  |

### Re-exports from `@artinet/sdk/otel`

For convenience, the OTel extension re-exports common types from `@opentelemetry/api`:

```typescript
import {
  trace,
  context,
  SpanKind,
  SpanStatusCode,
  type Tracer,
  type Span,
  type Context,
} from "@artinet/sdk/otel";
```
