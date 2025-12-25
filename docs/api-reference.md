# API Reference

This document provides a quick reference for the major objects and types in the artinet-sdk.

## Core Objects

| Object              | Description                                             | Import                                             |
| ------------------- | ------------------------------------------------------- | -------------------------------------------------- |
| `A2AClient`         | HTTP client for communicating with A2A-compliant agents | `import { A2AClient } from "@artinet/sdk"`         |
| `AgentBuilder`      | Fluent builder for creating multi-step agent workflows  | `import { AgentBuilder } from "@artinet/sdk"`      |
| `createAgent`       | Factory function to create an agent service instance    | `import { createAgent } from "@artinet/sdk"`       |
| `createAgentServer` | Creates an Express app with A2A endpoints configured    | `import { createAgentServer } from "@artinet/sdk"` |
| `createMCPAgent`    | Wraps an A2A agent with MCP protocol support            | `import { createMCPAgent } from "@artinet/sdk"`    |

## Configuration

| Function        | Description                                   | Import                                         |
| --------------- | --------------------------------------------- | ---------------------------------------------- |
| `configure`     | Set global SDK configuration (logger, tracer) | `import { configure } from "@artinet/sdk"`     |
| `applyDefaults` | Enable console logging with sensible defaults | `import { applyDefaults } from "@artinet/sdk"` |
| `getLogger`     | Get the configured logger instance            | `import { getLogger } from "@artinet/sdk"`     |
| `getTracer`     | Get the configured OpenTelemetry tracer       | `import { getTracer } from "@artinet/sdk"`     |
| `resetConfig`   | Reset configuration (useful for testing)      | `import { resetConfig } from "@artinet/sdk"`   |

## Logger Extensions

| Extension          | Description                               | Import                                                    |
| ------------------ | ----------------------------------------- | --------------------------------------------------------- |
| `configurePino`    | Wrap a Pino logger for SDK use            | `import { configurePino } from "@artinet/sdk/pino"`       |
| `configureWinston` | Wrap a Winston logger for SDK use         | `import { configureWinston } from "@artinet/sdk/winston"` |
| `configureOtel`    | Create a logger that adds events to spans | `import { configureOtel } from "@artinet/sdk/otel"`       |
| `withSpan`         | Execute a function within a traced span   | `import { withSpan } from "@artinet/sdk/otel"`            |

## A2A Types (via `A2A` namespace)

All A2A protocol types are accessible through the `A2A` namespace:

```typescript
import { A2A } from "@artinet/sdk";
```

### Core Types

| Type            | Description                                                  |
| --------------- | ------------------------------------------------------------ |
| `A2A.Task`      | Represents an agent task with status, artifacts, and history |
| `A2A.Message`   | A message exchanged between client and agent                 |
| `A2A.Part`      | Content part (text, file, or data) within a message          |
| `A2A.TextPart`  | Text content part                                            |
| `A2A.FilePart`  | File content part (bytes or URI)                             |
| `A2A.DataPart`  | Structured data content part                                 |
| `A2A.Artifact`  | Output artifact produced by an agent                         |
| `A2A.AgentCard` | Agent metadata and capabilities declaration                  |

### Request/Response Parameters

| Type                             | Description                          |
| -------------------------------- | ------------------------------------ |
| `A2A.MessageSendParams`          | Parameters for sending a message     |
| `A2A.TaskQueryParams`            | Parameters for querying a task       |
| `A2A.TaskIdParams`               | Parameters containing just a task ID |

### Event Types

| Type                          | Description                                               |
| ----------------------------- | --------------------------------------------------------- |
| `A2A.TaskStatusUpdateEvent`   | Event fired when task status changes                      |
| `A2A.TaskArtifactUpdateEvent` | Event fired when an artifact is produced                  |
| `A2A.Update`                  | Union of all update event types                           |
| `A2A.TaskState`               | Enum of task states (submitted, working, completed, etc.) |

### Execution Types

| Type          | Description                                       |
| ------------- | ------------------------------------------------- |
| `A2A.Engine`  | Agent execution engine (async generator function) |
| `A2A.Context` | Execution context passed to agent engines         |
| `A2A.Service` | A2A service interface                             |

## Storage

| Class       | Description                                  | Import                                      |
| ----------- | -------------------------------------------- | ------------------------------------------- |
| `Files`     | File-based task storage                      | `import { Files } from "@artinet/sdk"`      |
<!-- | `Store`     | Interface for custom storage implementations | `import type { Store } from "@artinet/sdk"` | -->

## Middleware & Transport

| Export              | Description                              | Import                                             |
| ------------------- | ---------------------------------------- | -------------------------------------------------- |
| `jsonRPCMiddleware` | Express middleware for JSON-RPC handling | `import { jsonRPCMiddleware } from "@artinet/sdk"` |
| `errorHandler`      | Express error handler middleware         | `import { errorHandler } from "@artinet/sdk"`      |
| `createAgentRouter` | Creates a tRPC router for the agent      | `import { createAgentRouter } from "@artinet/sdk"` |

<!-- ## Error Helpers

| Function         | Description                        |
| ---------------- | ---------------------------------- |
| `TASK_NOT_FOUND` | Create a task not found error      |
| `INVALID_PARAMS` | Create an invalid parameters error |
| `INTERNAL_ERROR` | Create an internal error           |
| `PARSE_ERROR`    | Create a parse error               |
... -->
## Client Methods

The `A2AClient` provides the following methods:

| Method                            | Description                           | Returns                                   |
| --------------------------------- | ------------------------------------- | ----------------------------------------- |
| `agentCard()`                     | Fetch the agent's card                | `Promise<A2A.AgentCard>`                  |
| `sendMessage(params)`             | Send a message (blocking)             | `Promise<A2A.Task \| A2A.Message>`        |
| `sendStreamingMessage(params)`    | Send a message with streaming updates | `AsyncIterable<A2A.Update>`               |
| `getTask(params)`                 | Get a task by ID                      | `Promise<A2A.Task>`                       |
| `cancelTask(params)`              | Cancel a running task                 | `Promise<A2A.Task>`                       |
| `resubscribeTask(params)`         | Resubscribe to task updates           | `AsyncIterable<A2A.Update>`               |
<!-- | `setTaskPushNotification(params)` | Configure push notifications          | `Promise<A2A.TaskPushNotificationConfig>` |
| `getTaskPushNotification(params)` | Get push notification config          | `Promise<A2A.TaskPushNotificationConfig>` | -->

## AgentBuilder Steps

| Method                 | Description                | Output Type   |
| ---------------------- | -------------------------- | ------------- |
| `.text(handler)`       | Add a text processing step | `TextPart`    |
| `.file(handler)`       | Add a file processing step | `FilePart`    |
| `.data(handler)`       | Add a data processing step | `DataPart`    |
| `.createAgent(params)` | Build the agent service    | `A2A.Service` |
| `.createAgentEngine()` | Build just the engine      | `A2A.Engine`  |

### Step Handler Parameters

```typescript
interface StepParams {
  content: string | undefined; // Extracted text from user message
  message: A2A.MessageSendParams; // Full message params
  context: A2A.Context; // Execution context
  args: unknown[]; // Arguments from previous step
  skip: () => void; // Skip this step
}
```

### Step Return Types

```typescript
// Simple return - just the content
return "Hello world";

// With parts array
return ["Part 1", "Part 2"];

// With forward args
return {
  parts: ["Processing..."],
  args: [dataForNextStep],
};
```
