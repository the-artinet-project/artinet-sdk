# API Reference

This document provides a quick reference for the major objects and types in the artinet-sdk.

## Core Objects

| Object           | Description                                             | Import                                           |
| ---------------- | ------------------------------------------------------- | ------------------------------------------------ |
| `cr8`            | Fluent builder for creating multi-step agent workflows  | `import { cr8 } from "@artinet/sdk"`             |
| `describe`       | Helper namespace for creating A2A objects               | `import { describe } from "@artinet/sdk"`        |
| `AgentMessenger` | HTTP client for communicating with A2A-compliant agents | `import { createMessenger } from "@artinet/sdk"` |
| `MCPAgent`       | Wraps an A2A agent with MCP protocol support            | `import { createMCPAgent } from "@artinet/sdk"`  |

## Settings

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

| Type        | Description                                                  |
| ----------- | ------------------------------------------------------------ |
| `AgentCard` | Agent metadata and capabilities declaration                  |
| `Part`      | Content part (text, file, or data) within a message          |
| `TextPart`  | Text content part                                            |
| `FilePart`  | File content part (bytes or URI)                             |
| `DataPart`  | Structured data content part                                 |
| `Message`   | A message exchanged between client and agent                 |
| `Artifact`  | Output artifact produced by an agent                         |
| `Task`      | Represents an agent task with status, artifacts, and history |

### Request Parameters

| Type                | Description                          |
| ------------------- | ------------------------------------ |
| `MessageSendParams` | Parameters for sending a message     |
| `TaskQueryParams`   | Parameters for querying a task       |
| `TaskIdParams`      | Parameters containing just a task ID |

### Event Types

| Type                      | Description                                                                                          |
| ------------------------- | ---------------------------------------------------------------------------------------------------- |
| `TaskState`               | Enum of task states (submitted, working, completed, etc.)                                            |
| `TaskStatusUpdateEvent`   | Event fired when task status changes                                                                 |
| `TaskArtifactUpdateEvent` | Event fired when an artifact is produced                                                             |
| `Update`                  | Union of all update event types (`Message`/`Task`/`TaskStatusUpdateEvent`/`TaskArtifactUpdateEvent`) |

### Execution Types

| Type      | Description                                       |
| --------- | ------------------------------------------------- |
| `Engine`  | Agent execution engine (async generator function) |
| `Context` | Execution context passed to agent engines         |
| `Service` | A2A service interface                             |

## Describe Helper

The `describe` namespace provides utilities for creating A2A objects:

| Function            | Description              | Returns             |
| ------------------- | ------------------------ | ------------------- |
| `card`              | Create an AgentCard      | `AgentCard`         |
| `message`           | Create a Message         | `Message`           |
| `task`              | Create a Task            | `Task`              |
| `artifact`          | Create an Artifact       | `Artifact`          |
| `update.*`          | Create status updates    | `Update`            |
| `messageSendParams` | Create MessageSendParams | `MessageSendParams` |

### Usage Examples

```typescript
import { describe, A2A } from "@artinet/sdk";

// Create a card
const card: A2A.AgentCard = describe.card({
  name: "My Agent",
  version: "1.0.0",
});

// Create a message
const msg: A2A.Message = describe.message("Hello world!");
// or
const msg: A2A.Message = describe.message({
  role: "agent",
  parts: [describe.part.text("Hello")],
});

// Create a task
const task: A2A.Task = describe.task({
  id: "task-123",
  contextId: "ctx-456",
  status: { state: A2A.TaskState.completed },
});

// Create status updates
const submitted: : A2A.TaskStatusUpdateEvent = describe.update.submitted({
  taskId: "task-123",
  contextId: "ctx-456",
});
```

## Storage

| Class         | Description                                  | Import                                       |
| ------------- | -------------------------------------------- | -------------------------------------------- |
| `FileStore`   | File-based task storage                      | `import { FileStore } from "@artinet/sdk"`   |
| `SQLiteStore` | SQLite backed storage                        | `import { SQLiteStore } from "@artinet/sdk"` |
| `IStore`      | Interface for custom storage implementations | `import type { IStore } from "@artinet/sdk"` |

## Transport

| Export                    | Description                            | Import                                                        |
| ------------------------- | -------------------------------------- | ------------------------------------------------------------- |
| [`createAgentRouter`](customization.md#using-custom-transport-layers)       | Creates a tRPC router for the agent    | `import { createAgentRouter } from "@artinet/sdk/trpc"`            |
| [`serve`](customization.md#serverless-deployment) | Creates a serverless handler for the agent | `import { serve } from "@artinet/sdk/serverless"` |

> 🚧 Coming Soon: Support for Hono Servers.

## Messenger (Client) Methods

The `AgentMessenger` provides the following methods:

| Method                             | Description                           | Returns                                 |
| ---------------------------------- | ------------------------------------- | --------------------------------------- |
| `getAgentCard`                     | Fetch the agent's card                | `Promise<AgentCard>`                    |
| `sendMessage`                      | Send a message (default: blocking)    | `Promise<Task \| Message>`              |
| `sendMessageStream`                | Send a message with streaming updates | `AsyncIterable<Update>`                 |
| `getTask`                          | Get a task by ID                      | `Promise<Task>`                         |
| `cancelTask`                       | Cancel a running task                 | `Promise<Task>`                         |
| `resubscribeTask`                  | Resubscribe to task updates           | `AsyncIterable<Update>`                 |
| `setTaskPushNotification`          | Configure push notifications          | `Promise<TaskPushNotificationConfig>`   |
| `getTaskPushNotification`          | Get push notification config          | `Promise<TaskPushNotificationConfig>`   |
| `listTaskPushNotificationConfig`   | List push notification configs        | `Promise<TaskPushNotificationConfig[]>` |
| `deleteTaskPushNotificationConfig` | Delete push notification config       | `Promise<void>`                         |

## [cr8](./create.md)

`cr8` is the core entry point for interacting with the [_`@artinet/sdk`_](https://www.npmjs.com/package/@artinet/sdk).

It provides everything you need to quickly scaffold a robust A2A agent.

### Methods

| Method        | Description                                 | Output Type                                        |
| ------------- | ------------------------------------------- | -------------------------------------------------- |
| `text`        | Add a text processing step                  | `TextPart`                                         |
| `file`        | Add a file processing step                  | `FilePart`                                         |
| `data`        | Add a data processing step                  | `DataPart`                                         |
| `message`     | Add a message step                          | `Message`                                          |
| `artifact`    | Add an artifact creation step               | `Artifact`                                         |
| `status`      | Add a status update step                    | `StatusUpdate`                                     |
| `task`        | Add a task step                             | `Task`                                             |
| `sendMessage` | Send a message to another agent             | `Task`                                             |
| `agent`       | Get the agent service                       | `Agent`                                            |
| `engine`      | Get the execution engine                    | `Engine`                                           |
| `server`      | Get Express app with agent                  | `{ Express, Agent, (port?: number)=> http.Server}` |
| `steps`       | Get workflow steps                          | `Array<Step>`                                      |
| `from`        | Create an agent with a custom engine        | `Agent`                                            |
| `serve`       | Create an agent server with a custom engine | `{ Express, Agent, (port?: number)=> http.Server}` |

### Step Parameters

```typescript
interface StepParams<Args = any> {
  content: string | undefined; // Extracted text from user `Message`
  message: A2A.MessageSendParams; // Full message params
  context: A2A.Context; // Execution context
  args: Args; // Typed arguments returned from previous step
  skip: () => void; // Skip this step
}
```

### Step Return Types

```typescript
// Simple return - just the content
return "Hello world";

// With reply array
return ["Part 1", "Part 2"];

// With forward args (typed)
return {
  reply: "Processing...",
  args: { processedData: "value", timestamp: Date.now() },
};

// Array of parts
return [
  { name: "file1.txt", bytes: "content1" },
  { name: "file2.txt", bytes: "content2" },
];
```
