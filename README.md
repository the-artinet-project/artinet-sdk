[![npm version](https://img.shields.io/npm/v/@artinet/sdk.svg)](https://www.npmjs.com/package/@artinet/sdk)
[![npm downloads](https://img.shields.io/npm/dt/@artinet/sdk.svg)](https://www.npmjs.com/package/@artinet/sdk)
[![Apache License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](LICENSE)
[![Known Vulnerabilities](https://snyk.io/test/npm/@artinet/sdk/badge.svg)](https://snyk.io/test/npm/@artinet/sdk)

<!-- [![Coverage Status](https://coveralls.io/repos/github/the-artinet-project/artinet-sdk/badge.svg?branch=main)](https://coveralls.io/github/the-artinet-project/artinet-sdk?branch=main) -->

# Artinet SDK

Artinet SDK is a [Agent2Agent (A2A) Protocol](https://github.com/google/A2A) compliant server and client written in TypeScript for [node.js](https://nodejs.org/) that aims to simplify the creation of interoperable AI agents. Learn more at [the artinet project](https://artinet.io/).

This SDK significantly enhances the foundational A2A concepts and samples provided by Google, offering a production-ready solution with a focus on developer experience, reliability, and comprehensive features.

## Table of Contents
- [Artinet SDK](#artinet-sdk)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Installation](#installation)
  - [Requirements](#requirements)
  - [Example](#example)
  - [Class Documentation](#class-documentation)
    - [Core Classes](#core-classes)
    - [Key Types \& Interfaces](#key-types--interfaces)
  - [Running Tests](#running-tests)
  - [Typescript](#typescript)
  - [Usage](#usage)
    - [Client](#client)
      - [Basic Client Usage](#basic-client-usage)
      - [Streaming Updates](#streaming-updates)
      - [Authentication](#authentication)
    - [Server](#server)
      - [Implementing an A2A Agent](#implementing-an-a2a-agent)
      - [Persistent Storage](#persistent-storage)
      - [Logging](#logging)
      - [Server Registration \& Discovery](#server-registration--discovery)
      - [Advanced Server Customization](#advanced-server-customization)
  - [Contributing](#contributing)
  - [License](#license)
  - [Acknowledgements](#acknowledgements)

## Features

- **Plug-and-Play Server:** Built on Express.js, the `A2AServer` handles JSON-RPC complexity, routing, protocol compliance, and Server-Sent Events (SSE) streaming mechanics automatically. Just provide your core agent logic (`TaskHandler`) and configuration via `A2AServerParams`.
- **Enhanced Client:** `A2AClient` features refined error handling (`RpcError`), flexible header management for authentication, and clear separation of concerns.
- **TypeScript First:** Fully written in TypeScript with comprehensive type definitions for a robust developer experience.
- **Flexible Storage:** Offers built-in `InMemoryTaskStore` (development/testing) and `FileStore` (persistent), with the `TaskStore` interface allowing custom storage solutions.
- **Protocol Compliance:** Implements the complete A2A specification using the official JSON schema, ensuring interoperability.
- **Robust Streaming:** Reliable SSE support for `tasks/sendSubscribe` & `tasks/resubscribe` using `eventsource-parser`.
- **Configurable Logging:** Integrated structured logging via `pino`. Configurable levels using `configureLogger` and `LogLevel`.
- **Advanced Customization:** Allows providing a custom `JSONRPCServerFactory` for fine-grained control over the JSON-RPC server, enabling integration with existing Express apps or adding custom methods.
- **Comprehensive Testing:** Includes a suite of tests to ensure reliability and maintainability.

| Component/Feature   | Description                                                                 | Key Classes/Types                                                                            |
| :------------------ | :-------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------- |
| **Client**          | Interact with A2A-compliant agents. Supports standard & streaming requests. | `A2AClient`, `RpcError`                                                                      |
| **Server**          | Host A2A-compliant agents. Handles protocol details, routing, SSE.          | `A2AServer`, `A2AServerParams`                                                               |
| **Task Handling**   | Define agent logic using async generators.                                  | `TaskHandler`, `TaskContext`, `TaskYieldUpdate`                                              |
| **Storage**         | Persist task state. In-memory and file-based options included.              | `TaskStore`, `InMemoryTaskStore`, `FileStore`                                                |
| **Streaming (SSE)** | Handle real-time updates via SSE for `tasks/sendSubscribe`/`resubscribe`.   | `TaskStatusUpdateEvent`, `TaskArtifactUpdateEvent`                                           |
| **Logging**         | Configure structured logging for debugging and monitoring.                  | `logger`, `configureLogger`, `LogLevel`                                                      |
| **Advanced Server** | Customize the underlying JSON-RPC server or integrate into existing apps.   | `JSONRPCServerFactory`, `CreateJSONRPCServerParams`, `createJSONRPCMethod`, A2A Method Types |
| **Core Types**      | Based on the official A2A JSON Schema.                                      | `AgentCard`, `Task`, `Message`, `Part`, `Artifact`, etc.                                     |

## Installation

```bash
npm install @artinet/sdk
```

## Requirements

- Node.js (v22.0.0 or higher recommended, check `package.json` engines for exact requirement)

## Example
 
A basic A2A server and client interaction. For more detailed examples, see the `examples/` directory.

**1. Server (`quick-server.ts`)**

```typescript
import {
  A2AServer,
  TaskContext,
  TaskHandler,
  InMemoryTaskStore,
} from "@artinet/sdk";

// Minimal agent logic: receive text, yield working state, yield completed state with echo
const quickAgentLogic: TaskHandler = async function* (context: TaskContext) {
  const userInput =
    context.userMessage.parts[0].type === "text"
      ? context.userMessage.parts[0].text
      : "";
  yield { state: "working" };
  // Simulate some work if needed, check context.isCancelled()
  yield {
    state: "completed",
    message: {
      role: "agent",
      parts: [{ type: "text", text: `You said: ${userInput}` }],
    },
  };
};

const server = new A2AServer({
  taskHandler: quickAgentLogic,
  taskStore: new InMemoryTaskStore(),
  port: 4000,
  basePath: "/a2a",
  card: {
    name: "QuickStart Agent",
    url: "http://localhost:4000/a2a",
    version: "0.1.0",
    capabilities: { streaming: true },
    skills: [{ id: "echo", name: "Echo Skill" }],
  },
});

server.start();
console.log("A2A Server running at http://localhost:4000/a2a");
```

**2. Client (`quick-client.ts`)**

```typescript
import { A2AClient, TaskStatusUpdateEvent } from "@artinet/sdk";

async function runClient() {
  const client = new A2AClient("http://localhost:4000/a2a");

   const message = {
    role: "user" as const,
    parts: [{ type: "text" as const, text: "Hello Quick Start!" }],
  };

  const stream = client.sendTaskSubscribe({ id: "quick-task-1", message });

  for await (const update of stream) {
    // process the update
    ...
  }
  console.log("Stream finished.");
}

runClient().catch(console.error);
```

## Class Documentation

The Artinet SDK provides several core classes and interfaces for building A2A clients and servers.

### Core Classes

| Class               | Description                                                         |
| :------------------ | :------------------------------------------------------------------ |
| `A2AClient`         | Client for interacting with A2A servers.                            |
| `A2AServer`         | Express-based server implementation for hosting A2A agents.         |
| `RpcError`          | Represents client-side errors encountered during A2A communication. |
| `InMemoryTaskStore` | Simple in-memory task persistence (ideal for development/testing).  |
| `FileStore`         | File-based task persistence (stores task data in the filesystem).   |

### Key Types & Interfaces

| Type/Interface                                            | Description                                                                                                                        |
| :-------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------- |
| `TaskHandler`                                             | Async generator function defining the core agent logic (`async function*(context: TaskContext): AsyncGenerator<TaskYieldUpdate>`). |
| `TaskContext`                                             | Provides task details (`task`, `userMessage`, `history`, `isCancelled()`) to the `TaskHandler`.                                    |
| `TaskStore`                                               | Interface defining the contract for task persistence implementations (like `InMemoryTaskStore`, `FileStore`).                      |
| `TaskYieldUpdate`                                         | Union type for updates yielded by a `TaskHandler` (representing status changes or generated artifacts).                            |
| `A2AServerParams`                                         | Configuration object passed to the `A2AServer` constructor (port, store, card, basePath, handler, etc.).                           |
| `AgentCard`                                               | Describes the agent's capabilities, metadata, skills, and endpoint URL.                                                            |
| `Message`, `Part`, `Artifact`, `Task`, `TaskStatus`, etc. | Core types mirroring the structures defined in the A2A JSON Schema specification. Used for requests, responses, and task state.    |
| `TaskStatusUpdateEvent`, `TaskArtifactUpdateEvent`        | Specific types for Server-Sent Events (SSE) received during streaming operations (`tasks/sendSubscribe`, `tasks/resubscribe`).     |
| `LogLevel`                                                | Enum defining logging levels (`error`, `warn`, `info`, `debug`, `trace`) used with the built-in logger.                            |
| `JSONRPCServerFactory`                                    | Function signature for providing a custom JSON-RPC server creation logic to `A2AServer` for advanced customization.                |
| `CreateJSONRPCServerParams`                               | Object containing dependencies provided _to_ a `JSONRPCServerFactory` function.                                                    |
| `SendTaskMethod`, `GetTaskMethod`, ...                    | Type signatures for specific A2A method handlers, used when implementing custom server logic with `createJSONRPCMethod`.           |

## Running Tests

```bash
npm test
```

To run tests with coverage:

```bash
npm run test:coverage
```

## Typescript

The Artinet SDK is written entirely in TypeScript and includes comprehensive type definitions, providing strong typing and enhanced developer experience.

## Usage

### Client

Interact with A2A-compliant agents using the `A2AClient`. See `examples/` for more.

#### Basic Client Usage

Send a task using `tasks/send`.

```typescript
import { A2AClient, Message } from "@artinet/sdk";

async function runBasicTask() {
  const client = new A2AClient("https://your-a2a-server.com/a2a");
  const message: Message = {
    role: "user",
    parts: [{ type: "text", text: "What is the capital of France?" }],
  };

  const task = await client.sendTask({ id: "basic-task-1", message });
  console.log("Task Completed:", task);
}
```

#### Streaming Updates

Receive real-time updates via SSE using `tasks/sendSubscribe` (recommended).

```typescript
import {
  A2AClient,
  Message,
  TaskStatusUpdateEvent,
  TaskArtifactUpdateEvent,
} from "@artinet/sdk";

async function runStreamingTask() {
  const client = new A2AClient("https://your-a2a-server.com/a2a");
  const message: Message = {
    role: "user",
    parts: [{ type: "text", text: "Tell me a short story." }],
  };

  const stream = client.sendTaskSubscribe({ id: "streaming-task-1", message });

  for await (const update of stream) {
    if ((update as TaskStatusUpdateEvent).status) {
      console.log("Status:", (update as TaskStatusUpdateEvent).status.state);
    } else if ((update as TaskArtifactUpdateEvent).artifact) {
      console.log(
        "Artifact:",
        (update as TaskArtifactUpdateEvent).artifact.name
      );
    }
  }
  console.log("Stream finished.");
}
```

#### Authentication

Add headers using `addHeader` or `setHeaders`.

```typescript
import { A2AClient } from "@artinet/sdk";

const client = new A2AClient("https://your-secure-a2a-server.com/a2a");

// Add a single header
client.addHeader("Authorization", "Bearer your-api-token");

// Set multiple headers (overwrites existing)
client.setHeaders({ Authorization: "Bearer ...", "X-Custom": "value" });
```

### Server

Host agents using `A2AServer`. Handles protocol details. See `examples/` for more.

#### Implementing an A2A Agent

Define agent behavior with an async generator `TaskHandler`.

```typescript
import {
  A2AServer,
  TaskContext,
  TaskHandler,
  InMemoryTaskStore,
} from "@artinet/sdk";


const myAgent: TaskHandler = async function* (context: TaskContext) {

  yield {
    state: "working",
    message: {
      role: "agent",
      parts: [{ type: "text", text: "Processing..." }],
    },
  };

  // Check context.isCancelled() if operation is long
  // await someAsyncTask();
  ...

  yield {
    name: "result.txt",
    mimeType: "text/plain",
    parts: [{ type: "text", text: "Report data" }],
  };

  yield {
    state: "completed",
    message: {
      role: "agent",
      parts: [{ type: "text", text: "Finished processing." }],
    },
  };
};

const myServer = new A2AServer({
  taskHandler: myAgent,
  taskStore: new InMemoryTaskStore(),
  port: 3000,
  basePath: "/a2a",
  card: {
    name: "Example Agent",
    url: "http://localhost:3000/a2a",
    version: "1.0.0",
    capabilities: { streaming: true },
    skills: [{ id: "processor", name: "Text Processor" }],
  },
});

myServer.start();
console.log("A2A Server running on http://localhost:3000/a2a");
```

#### Persistent Storage

Use `FileStore` for file-based persistence. Ensure the directory exists.

```typescript
import path from "path";
import fs from "fs";

const dataDir = path.join(process.cwd(), "a2a-data");
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const myStore = new FileStore(dataDir);

const myServer = new A2AServer({
  taskStore: myStore,
  ...
});
```

#### Logging

Use the built-in `pino`-based logger. Configure with `configureLogger`.

```typescript
import { logger, configureLogger, LogLevel, logDebug } from "@artinet/sdk";

// Configure logging level (optional)
configureLogger({ level: "debug" });

logger.info("Server starting...");
//use helper functions
logDebug("LoggerTest", { taskId: "task-123" }, "Task status updated.");

// Create child logger with bound context
const taskLogger = logger.child({ taskId: "abc" });
taskLogger.info("Processing step X");
```

#### Server Registration & Discovery

The SDK includes features to help make your agent discoverable:

- **Automatic Registration:** You can configure your `A2AServer` to automatically register your `AgentCard` with the [A2A Registry](https://artinet.io) upon startup by setting `register: true` (default: `false`) in the server parameters.

```typescript
  const myServer = new A2AServer({
    ...
    card: {
      ...
      url: "http://my-public-domain:3000/my-agent", // Publicly accessible URL
      ...
    },
    register: true, // Enable automatic registration on start
  });
```

- **Custom Agent Card Path:** By default, the server exposes its `AgentCard` at `/.well-known/agent.json` [RFC8615](https://datatracker.ietf.org/doc/html/rfc8615) and a fallback at `/agent-card`. You can specify a different fallback path using the `fallbackPath` option in `A2AServerParams`.

```typescript
  const myServer = new A2AServer({
    ...
    basePath: "/apiV2"
    fallbackPath: "/apiV2/custom-card-info", // Agent card available here
    ...
  });
// The AgentCard is now accessible at http://localhost:3001/apiV2/custom-card-info
```

#### Advanced Server Customization

Provide a custom `createJSONRPCServer` function (implementing `JSONRPCServerFactory`) for fine-grained control over the underlying RPC server.

This factory function receives objects of type `CreateJSONRPCServerParams` & `RequestParams` containing the necessary SDK dependencies (`taskHandler`, `taskStore`, `agentCard`, `activeCancellations`, `createTaskContext`, `closeStreamsForTask`) and the specific method paramaters (i.e. `SendTaskRequest["params"]`). You can use these dependencies to configure the standard A2A methods and add your own custom JSON-RPC methods.

The SDK exports default handlers for the standard A2A methods (e.g., `defaultSendTaskMethod`), create your own using dedicated A2A method types(`SendTaskMethod`) and use `createJSONRPCMethod` to easily wrap these methods with dependency injection and error handling.

See `src/server/lib/middleware/factory.ts` and `src/server/lib/middleware/a2a-methods.ts` for implementation details.

**Example:**

```typescript

const myCustomSendMethod: SendTaskMethod = (
  deps,
  requestParams,
  callback
) => {
  const { taskStore, taskHandler, createTaskContext } = deps;
  const taskId = extractTaskId(requestParams.id);
  const { message, sessionId, metadata } = requestParams;
  ...
  callback(null, ...);
};

const myCustomRPCServer: JSONRPCServerFactory = (
  params: CreateJSONRPCServerParams
): JSONRPCServerType => {
  //Use a custom task/send method
  const taskSendMethod = createJSONRPCMethod(params, myCustomSendMethod, "tasks/send");
  const taskGetMethod = createJSONRPCMethod(params, defaultGetTaskMethod, "tasks/get");
  const taskCancelMethod = createJSONRPCMethod(params, defaultCancelTaskMethod, "tasks/cancel");

  // Note: Push notifications are not fully implemented yet
  const taskPushNotificationSetMethod = createJSONRPCMethod(params, defaultSetTaskPushNotificationMethod, "tasks/pushNotification/set");
  const taskPushNotificationGetMethod = createJSONRPCMethod(params, defaultGetTaskPushNotificationMethod, "tasks/pushNotification/get");

  const rpcServer = new JSONRPCServer({
    "tasks/send": taskSendMethod,
    "tasks/get": taskGetMethod,
    "tasks/cancel": taskCancelMethod,
    "tasks/pushNotification/set": taskPushNotificationSetMethod,
    "tasks/pushNotification/get": taskPushNotificationGetMethod,
  });

  return rpcServer;
};


const server = new A2AServer({
  createJSONRPCServer: myCustomRPCServer,
  ...
});
```

**Using the Custom Factory**

Pass your factory function via the `createJSONRPCServer` option during `A2AServer` initialization.

**Important:** The default `A2AServer` setup automatically adds Express middleware to handle Server-Sent Events (SSE) for `tasks/sendSubscribe` and `tasks/resubscribe`, as well as the `/agent/card` (and `/.well-known/agent.json`) GET endpoints. If you are **not** using `A2AServer` and integrating the Jayson server middleware into your own Express application, you **must** implement these SSE and card endpoints yourself to maintain full A2A compliance, especially for streaming functionality. See `src/server/lib/express-server.ts` for how the default server handles these routes.

## Contributing

Contributions are welcome! Please open an issue or submit a Pull Request on [GitHub](https://github.com/the-artinet-project/artinet-sdk).

Ensure code adheres to the project style and passes linting (`npm run lint`) and tests (`npm test`).

## License

This project is licensed under the Apache License 2.0 - see the `LICENSE` file for details.

## Acknowledgements

This SDK builds upon the concepts and specifications of the [Agent2Agent (A2A) Protocol](https://github.com/google/A2A) initiated by Google. It utilizes the official [A2A JSON Schema](https://github.com/google/A2A/tree/main/specification/json) for protocol compliance.

Libraries used include:

- [Express.js](https://expressjs.com/) for the server framework.
- [Jayson](https://github.com/tedeh/jayson) for JSON-RPC handling.
- [Pino](https://getpino.io/) for logging.
- [EventSource Parser](https://github.com/rexxars/eventsource-parser) for SSE streaming.
