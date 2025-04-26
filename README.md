[![npm version](https://img.shields.io/npm/v/@artinet/sdk.svg)](https://www.npmjs.com/package/@artinet/sdk)
[![npm downloads](https://img.shields.io/npm/dt/@artinet/sdk.svg)](https://www.npmjs.com/package/@artinet/sdk)
[![Apache License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](LICENSE)
[![Known Vulnerabilities](https://snyk.io/test/npm/@artinet/sdk/badge.svg)](https://snyk.io/test/npm/@artinet/sdk)

<!-- [![Coverage Status](https://coveralls.io/repos/github/the-artinet-project/artinet-sdk/badge.svg?branch=main)](https://coveralls.io/github/the-artinet-project/artinet-sdk?branch=main) -->

# Artinet SDK

Artinet SDK is a [Agent2Agent (A2A) Protocol](https://github.com/google/A2A) compliant server and client written in TypeScript for [node.js](https://nodejs.org/) that aims to simplify the creation of interoperable AI agents. Learn more at [the artinet project](https://artinet.io/).

This SDK significantly enhances the foundational A2A concepts and samples provided by Google, offering a production-ready solution with a focus on developer experience, reliability, and comprehensive features.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Requirements](#requirements)
- [Example](#example)
- [Class Documentation](#class-documentation)
  - [Core Classes](#core-classes)
  - [Key Types & Interfaces](#key-types--interfaces)
- [Running Tests](#running-tests)
- [Typescript](#typescript)
- [Usage](#usage)
  - [Client](#client)
    - [Basic Usage](#basic-client-usage)
    - [Streaming Updates](#streaming-updates)
    - [Authentication](#authentication)
  - [Server](#server)
    - [Implementing an A2A Agent](#implementing-an-a2a-agent)
    - [Persistent Storage](#persistent-storage)
    - [Logging](#logging)
    - [Advanced Server Customization](#advanced-server-customization)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

## Features

- **Plug-and-Play Server:** Built on Express.js, the `A2AServer` handles JSON-RPC complexity, routing, protocol compliance, and streaming mechanics automatically. Just provide your core agent logic (`TaskHandler`) and basic configuration.
- **Enhanced Client:** Features refined error handling, flexible header management for authentication, and clear separation of concerns.
- **Comprehensive Testing:** Ensuring reliability and maintainability.
- **Simplified Developer Experience:** Start quickly with clear TypeScript types, intuitive APIs, and minimal setup.
- **Flexible Storage:** Offers built-in `InMemoryTaskStore` for development/testing and `FileStore` for persistent task storage, easily extensible.
- **Full Protocol Compliance:** Implements the complete A2A specification using the official JSON schema.
- **Server-Sent Events (SSE):** Reliable streaming support (`tasks/sendSubscribe` & `tasks/resubscribe`) with robust handling using `eventsource-parser`.
- **Configurable Logging:** Integrated structured logging via `pino`, configurable levels.

| Component/Feature | Description                                                                 | Key Classes/Types                                  |
| :---------------- | :-------------------------------------------------------------------------- | :------------------------------------------------- |
| **Client**        | Interact with A2A-compliant agents. Supports standard & streaming requests. | `A2AClient`, `SystemError`                         |
| **Server**        | Host A2A-compliant agents. Handles protocol details & routing.              | `A2AServer`, `A2AError`                            |
| **Task Handling** | Define agent logic using async generators.                                  | `TaskHandler`, `TaskContext`                       |
| **Storage**       | Persist task state. In-memory and file-based options included.              | `ITaskStore`, `InMemoryTaskStore`, `FileStore`     |
| **Streaming**     | Handle real-time updates via SSE for `tasks/sendSubscribe`.                 | `TaskStatusUpdateEvent`, `TaskArtifactUpdateEvent` |
| **Logging**       | Configure structured logging for debugging and monitoring.                  | `logger`, `configureLogger`, `LogLevel`            |

## Installation

```bash
npm install @artinet/sdk
```

## Requirements

- Node.js (v16.0.0 or higher recommended, check `package.json` engines for exact requirement)

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
  taskStore: new InMemoryTaskStore(), // Use FileStore for persistence
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

  console.log("Processing stream...");
  for await (const update of stream) {
    // Process TaskStatusUpdateEvent or TaskArtifactUpdateEvent
    if ((update as TaskStatusUpdateEvent).status) {
      const statusUpdate = update as TaskStatusUpdateEvent;
      console.log("-> Status Update:", statusUpdate.status.state);
      // Check statusUpdate.status.message if needed
    }
    // else if ((update as TaskArtifactUpdateEvent).artifact) { ... }
  }
  console.log("Stream finished.");
}

runClient().catch(console.error);
```

## Class Documentation

The Artinet SDK provides several core classes and interfaces for building A2A clients and servers.

### Core Classes

| Class               | Description                                                  |
| :------------------ | :----------------------------------------------------------- |
| `A2AClient`         | Client for interacting with A2A servers.                     |
| `A2AServer`         | Express-based server implementation for hosting A2A agents.  |
| `RpcError`          | Client-side A2A protocol errors.                             |
| `A2AError`          | Server-side A2A protocol errors (used internally).           |
| `InMemoryTaskStore` | Simple in-memory task persistence (for development/testing). |
| `FileStore`         | File-based task persistence.                                 |

### Key Types & Interfaces

| Type/Interface                                            | Description                                                                                                               |
| :-------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------ |
| `TaskHandler`                                             | Async generator function defining agent logic (`async function*(context: TaskContext): AsyncGenerator<TaskYieldUpdate>`). |
| `TaskContext`                                             | Provides task details (`taskId`, `userMessage`, `isCancelled`, `metadata`, `store`) to the `TaskHandler`.                 |
| `TaskStore`                                               | Interface for task persistence implementations.                                                                           |
| `TaskYieldUpdate`                                         | Union type for updates yielded by `TaskHandler` (status changes or artifacts).                                            |
| `A2AServerOptions`                                        | Configuration for `A2AServer` (port, store, card, basePath, handler, etc.).                                               |
| `AgentCard`                                               | Describes the agent's capabilities and metadata.                                                                          |
| `Message`, `Part`, `Artifact`, `Task`, `TaskStatus`, etc. | Types mirroring the A2A JSON Schema structures.                                                                           |
| `TaskStatusUpdateEvent`, `TaskArtifactUpdateEvent`        | Specific types for events received during streaming (`sendTaskSubscribe`).                                                |

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

Send a task using `tasks/send` (requires server support).

```typescript
import { A2AClient, Message } from "@artinet/sdk";

async function runBasicTask() {
  const client = new A2AClient("https://your-a2a-server.com/a2a");
  const message: Message = {
    role: "user",
    parts: [{ type: "text", text: "What is the capital of France?" }],
  };
  // Assumes server implements tasks/send
  const task = await client.sendTask({ id: "basic-task-1", message });
  console.log("Task Completed:", task);
}

// runBasicTask(); // Requires a server supporting tasks/send
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

// runStreamingTask();
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

// Now make requests...
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

// Minimal agent logic
const myAgentLogic: TaskHandler = async function* (context: TaskContext) {
  console.log(`Task ${context.taskId} started.`);
  yield {
    state: "working",
    message: {
      role: "agent",
      parts: [{ type: "text", text: "Processing..." }],
    },
  };

  // Check context.isCancelled() if operation is long
  // await someAsyncTask();

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
  console.log(`Task ${context.taskId} completed.`);
};

const server = new A2AServer({
  taskHandler: myAgentLogic,
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

server.start();
console.log("A2A Server running on http://localhost:3000/a2a");
```

#### Persistent Storage

Use `FileStore` for file-based persistence. Ensure the directory exists.

```typescript
import { A2AServer, FileStore, TaskHandler } from "@artinet/sdk";
import path from "path";
import fs from "fs";

// Define your TaskHandler (myAgentLogic)
// const myAgentLogic: TaskHandler = ...;

const dataDir = path.join(process.cwd(), "a2a-data");
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const store = new FileStore(dataDir);

const server = new A2AServer({
  taskHandler: myAgentLogic, // Your agent logic here
  taskStore: store, // Use FileStore instance
  port: 3001,
  basePath: "/a2a-persistent",
  card: {
    /* ... agent card details ... */
  },
});
server.start();
console.log("Persistent A2A Server running...");
```

#### Logging

Use the built-in `pino`-based logger. Configure with `configureLogger`.

```typescript
import { logger, configureLogger, LogLevel } from "@artinet/sdk";

// Configure logging level (optional)
configureLogger({ level: "debug" });

logger.info("Server starting...");
try {
  /* ... */
} catch (err) {
  logger.error({ err }, "Setup failed");
}
logger.debug({ taskId: "task-123" }, "Task status updated.");

// Create child logger with bound context
const taskLogger = logger.child({ taskId: "abc" });
taskLogger.info("Processing step X");
```

#### Advanced Server Customization

Provide a custom `createJSONRPCServer` function (implementing `JSONRPCServerFactory`) for fine-grained control over the underlying Jayson server or to integrate with existing Express apps. See `examples/` for a potential use case.

```typescript
import {
  CreateJSONRPCServerParams,
  JSONRPCServerType,
  JSONRPCServerFactory,
  A2AServer, // Import A2AServer to use it
  TaskHandler, // Needed for the example usage
  InMemoryTaskStore, // Needed for the example usage
} from "@artinet/sdk";
import jayson from "jayson";
import { A2AMethods } from "@artinet/sdk/dist/server/a2a-methods";

// Define your TaskHandler
// const myAgentLogic: TaskHandler = ...;

const myCustomCreateServer: JSONRPCServerFactory = (
  params: CreateJSONRPCServerParams
): JSONRPCServerType => {
  const a2aMethods = new A2AMethods(
    params.taskHandler,
    params.taskStore,
    params.agentCard
  );
  const jaysonServer = new jayson.Server({
    // Standard A2A methods
    "tasks/send": a2aMethods.send.bind(a2aMethods),
    "tasks/get": a2aMethods.get.bind(a2aMethods),
    "tasks/cancel": a2aMethods.cancel.bind(a2aMethods),
    // ... other A2A methods ...

    // Custom non-A2A method
    myCustomMethod: (
      args: { value: number },
      callback: jayson.JSONRPCCallbackType
    ) => {
      callback(null, { result: `Custom result: ${args.value * 2}` });
    },
  });
  return jaysonServer;
};

// Example usage:
/*
const server = new A2AServer({
  taskHandler: myAgentLogic,
  taskStore: new InMemoryTaskStore(),
  port: 3002,
  basePath: "/a2a-custom",
  createJSONRPCServer: myCustomCreateServer, // Pass the factory
  card: { ... },
});
server.start();
console.log("Custom A2A Server running...");
*/
```

**Using the Custom Factory**

Pass your factory during `A2AServer` initialization. Note that `A2AServer` adds Express middleware for SSE (`tasks/sendSubscribe`) and the `/agent/card` GET endpoint, which your custom setup might need to replicate if not using `A2AServer` directly.

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
