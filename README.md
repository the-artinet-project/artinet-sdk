# Artinet SDK

A TypeScript client library for the [Agent2Agent (A2A) Protocol](https://github.com/google/A2A) - an open protocol for communication between AI agents.

## Installation

```bash
npm install @artinet/sdk
```

## Features

- Full implementation of the A2A Protocol using the official Google schema
- TypeScript types for all protocol structures
- Streaming support for real-time updates
- Push notification capabilities
- Built-in error handling
- Flexible authentication mechanisms

## Usage

### Basic Usage

```typescript
import { A2AClient, Message, Part, TaskSendParams } from "@artinet/sdk";

// Create a new client instance
const client = new A2AClient("https://your-a2a-server.com");

// Get the agent card to discover capabilities
const agentCard = await client.agentCard();
console.log(`Connected to agent: ${agentCard.name}`);

// Check if the server supports streaming
const supportsStreaming = await client.supports("streaming");

// Create a message to send
const message: Message = {
  role: "user",
  parts: [
    {
      type: "text",
      text: "Hello! Can you help me with a question?",
    },
  ],
};

// Send a task
const task = await client.sendTask({
  id: "task-123",
  message,
});

console.log(`Task status: ${task?.status.state}`);
```

### Streaming Updates

```typescript
import { A2AClient, Message } from "@artinet/sdk";

const client = new A2AClient("https://your-a2a-server.com");

// Check if the server supports streaming
if (await client.supports("streaming")) {
  const message = {
    role: "user",
    parts: [{ type: "text", text: "Tell me a story about space exploration" }],
  };

  // Send a task and subscribe to updates
  const stream = client.sendTaskSubscribe({
    id: "streaming-task-123",
    message,
  });

  // Process the updates as they arrive
  for await (const update of stream) {
    if ("status" in update) {
      console.log(`Task status: ${update.status.state}`);

      // Display agent's response when available
      if (update.status.message) {
        const textParts = update.status.message.parts
          .filter((part) => part.type === "text")
          .map((part) => (part as any).text);

        console.log("Agent response:", textParts.join("\n"));
      }
    } else if ("artifact" in update) {
      console.log("Received artifact:", update.artifact.name);
    }
  }
}
```

### Authentication

```typescript
import { A2AClient } from "@artinet/sdk";

// Add authentication headers
const client = new A2AClient("https://your-a2a-server.com");
client.addHeader("Authorization", "Bearer your-token-here");

// Or set multiple headers at once
client.setHeaders({
  Authorization: "Bearer your-token-here",
  "X-Custom-Header": "custom-value",
});
```

## Logging

The SDK uses [pino](https://github.com/pinojs/pino), a fast and low overhead logging library:

```typescript
import { logger, configureLogger, LogLevel } from "@artinet/sdk";

// Configure the logger
configureLogger({
  level: "debug", // Options: 'silent', 'error', 'warn', 'info', 'debug', 'trace'
  name: "MyApplication" // Optional custom logger name
});

// Use the logger directly
logger.info("Connection established");
logger.error({ err: new Error("Failed to connect") }, "Connection error");
logger.debug({ data: { id: 123, status: "active" } }, "Task details");

// In production, set a more restrictive level
configureLogger({ level: "error" });
// Or disable completely
configureLogger({ level: "silent" });
```

The default log level is 'error', which means only error messages and above are shown.

For more advanced configurations, you can access the pino logger instance directly:

```typescript
import { logger } from "@artinet/sdk";
import { pino } from "pino";

// Create a custom child logger
const customLogger = logger.child({ module: "TaskProcessor" });
customLogger.info("Processing started");
```

## API Reference

### Classes

- `A2AClient` - Main client for interacting with A2A servers
- `RpcError` - Error class for handling A2A protocol errors

### Utilities

- `logger` - Pino logger instance for SDK operations
- `configureLogger()` - Utility function to configure the logger

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

This SDK directly incorporates the [official A2A Protocol schema](https://github.com/google/A2A/blob/main/samples/js/src/schema.ts) created by Google, ensuring complete compatibility with the specification.
