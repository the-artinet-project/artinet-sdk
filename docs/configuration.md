# Configuration

The SDK provides a centralized configuration system for logging and tracing. By default, logging is silent (no-op) for zero overhead.

## Quick Start

Enable console logging immediately:

```typescript
import { applyDefaults } from "@artinet/sdk";

applyDefaults();
```

## Logging

### Using Pino

```typescript
import pino from "pino";
import { configure } from "@artinet/sdk";
import { configurePino } from "@artinet/sdk/pino";

const pinoLogger = pino({
  level: "debug",
  transport: { target: "pino-pretty" },
});

configure({ logger: configurePino(pinoLogger) });
```

### Using Winston

```typescript
import winston from "winston";
import { configure } from "@artinet/sdk";
import { configureWinston } from "@artinet/sdk/winston";

const winstonLogger = winston.createLogger({
  level: "debug",
  transports: [new winston.transports.Console()],
});

configure({ logger: configureWinston(winstonLogger) });
```

### Custom Logger

Implement the `ILogger` interface:

```typescript
import { configure } from "@artinet/sdk";

configure({
  logger: {
    debug: (msg, ...args) => console.debug(msg, ...args),
    info: (msg, ...args) => console.info(msg, ...args),
    warn: (msg, ...args) => console.warn(msg, ...args),
    error: (msg, err) => console.error(msg, err),
  },
});
```

## OpenTelemetry

The SDK integrates with OpenTelemetry for distributed tracing.

### Installation

```bash
npm install @opentelemetry/api @opentelemetry/sdk-node
```

### Configure Tracing

```typescript
import { trace } from "@opentelemetry/api";
import { configure } from "@artinet/sdk";
import { configureOtel, withSpan } from "@artinet/sdk/otel";

// Get your tracer (after initializing your OTel SDK)
const tracer = trace.getTracer("my-agent");

configure({
  tracer,
  logger: configureOtel({ level: "debug" }), // Logs go to span events
});

// Use withSpan helper for easy tracing
const result = await withSpan(tracer, "processTask", async (span) => {
  span.setAttribute("taskId", "123");
  return await doWork();
});
```

### Combine Pino with OpenTelemetry

Logs go to both Pino AND span events:

```typescript
import pino from "pino";
import { configure } from "@artinet/sdk";
import { configurePino } from "@artinet/sdk/pino";
import { configureOtel } from "@artinet/sdk/otel";

configure({
  logger: configureOtel({
    baseLogger: configurePino(pino({ level: "debug" })),
    level: "debug",
  }),
});
```

## Configuration API

| Function                        | Description                            |
| ------------------------------- | -------------------------------------- |
| `configure({ logger, tracer })` | Set global configuration               |
| `applyDefaults()`               | Enable console logging with defaults   |
| `getLogger()`                   | Get the configured logger              |
| `getTracer()`                   | Get the configured tracer              |
| `resetConfig()`                 | Reset to defaults (useful for testing) |
