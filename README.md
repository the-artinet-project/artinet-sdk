[![npm version](https://img.shields.io/npm/v/@artinet/sdk.svg)](https://www.npmjs.com/package/@artinet/sdk)
[![npm downloads](https://img.shields.io/npm/dt/@artinet/sdk.svg)](https://www.npmjs.com/package/@artinet/sdk)

# Artinet SDK: A Production-Ready A2A Protocol Implementation

A robust, feature-rich TypeScript client and server library for the [Agent2Agent (A2A) Protocol](https://github.com/google/A2A) - an open protocol for communication between AI agents.

This SDK significantly enhances the foundational A2A concepts and samples provided by Google, offering a production-ready solution with a focus on developer experience, reliability, and comprehensive features.

## Why Choose Artinet SDK?

While the official A2A repository provides basic samples, the Artinet SDK is engineered for real-world applications:

- **Plug-and-Play Server:** Built on Express.js, the `A2AServer` handles JSON-RPC complexity, routing, protocol compliance, and streaming mechanics automatically. Just provide your core agent logic (`TaskHandler`) and basic configuration for a fully functional A2A endpoint with minimal boilerplate.
- **Enhanced Client:** Features refined error handling, flexible header management for authentication, and clear separation of concerns.
- **Comprehensive Testing:** Ensuring reliability and maintainability. Includes tests for core logic, streaming, error conditions, and edge cases.
- **Simplified Developer Experience:** Start quickly with clear TypeScript types, intuitive APIs, and minimal setup. The SDK handles the underlying protocol details, letting you focus _solely_ on your agent's unique capabilities.
- **Flexible Storage:** Offers built-in `InMemoryTaskStore` for development/testing and `FileStore` for persistent task storage, easily extensible for custom storage solutions.
- **Full Protocol Compliance:** Implements the complete A2A specification using the official JSON schema, ensuring interoperability.

## Installation

```bash
npm install @artinet/sdk
```

## Features

- Full implementation of the A2A Protocol using the official Google schema
- Strongly-typed TypeScript interfaces for all protocol structures
- **Client Features:**
  - Reliable streaming support (`tasks/sendSubscribe`) with robust handling of Server-Sent Events (SSE) using `eventsource-parser`.
  - Push notification configuration support (`tasks/pushNotification/set`, `tasks/pushNotification/get`).
  - Built-in, informative error classes (`RpcError`).
  - Easy-to-use methods for `agentCard` discovery and capability checking (`supports`).
  - Flexible header management for authentication (`addHeader`, `setHeaders`).
- **Server Features:**
  - Simplified Express.js server setup (`A2AServer`).
  - Abstracted `TaskHandler` interface for easy integration of agent logic using async generators.
  * Automatic handling of JSON-RPC request parsing, validation, and routing.
  - Pluggable task storage (`InMemoryTaskStore`, `FileStore`, or custom).
  - Full support for streaming responses and artifact updates.
  - Standardized error handling (`A2AError`) mapped to JSON-RPC error codes.
  - Configurable agent card and capabilities.
- **Developer Tools:**
  - Integrated structured logging via `pino`, configurable levels (`configureLogger`).
  - Exhaustive test suite (`jest`) ensuring high reliability.

## Quick Start

Get a basic A2A server running and interact with it using the client in just a few lines of code.

**1. Server (`quick-server.ts`)**

```typescript
import {
  A2AServer,
  TaskContext,
  TaskHandler,
  InMemoryTaskStore,
  logger,
  configureLogger,
} from "@artinet/sdk";

// Set the log level to info to see startup messages
configureLogger({ level: "info" });

// Define the simplest possible agent logic
const quickAgentLogic: TaskHandler = async function* (context: TaskContext) {
  const userInput =
    context.userMessage.parts[0].type === "text"
      ? context.userMessage.parts[0].text
      : "";
  logger.info(`Quick server received: ${userInput}`);
  yield {
    state: "working",
    message: { role: "agent", parts: [{ type: "text", text: "Thinking..." }] },
  };
  await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate work
  yield {
    state: "completed",
    message: {
      role: "agent",
      parts: [{ type: "text", text: `You said: ${userInput}` }],
    },
  };
  logger.info(`Quick server responded.`);
};

// Configure and start the server
const server = new A2AServer({
  taskHandler: quickAgentLogic,
  taskStore: new InMemoryTaskStore(),
  port: 4000,
  basePath: "/a2a",
  card: {
    name: "QuickStart Agent",
    url: "http://localhost:4000/a2a",
    version: "0.1.0",
    capabilities: { streaming: true }, // Our handler uses yield
    skills: [{ id: "echo", name: "Echo Skill" }],
  },
});

server.start();
logger.info("Quick Start A2A Server running on http://localhost:4000/a2a");
```

**2. Client (`quick-client.ts`)**

```typescript
import { A2AClient, logger, configureLogger } from "@artinet/sdk";

// Set the log level to info to see client messages
configureLogger({ level: "info" });

async function runClient() {
  const client = new A2AClient("http://localhost:4000/a2a");
  const message = {
    role: "user" as const,
    parts: [{ type: "text" as const, text: "Hello Quick Start!" }],
  };

  try {
    logger.info("Sending task to quick server...");
    const stream = client.sendTaskSubscribe({ id: "quick-task-1", message });

    for await (const update of stream) {
      if ("status" in update && update.status.message) {
        const agentText = update.status.message.parts
          .filter((p) => p.type === "text")
          .map((p: any) => p.text)
          .join(" ");
        logger.info(`Client Received: [${update.status.state}] ${agentText}`);
      }
    }
    logger.info("Client finished.");
  } catch (error) {
    logger.error("Client Error:", error);
  }
}

runClient();
```

**3. Run It**

- Save the files above.
- Install the SDK: `npm install @artinet/sdk`
- Run the server: `npx tsx quick-server.ts`
- In another terminal, run the client: `npx tsx quick-client.ts`

You'll see the server start, the client send a message, and the server respond with status updates.

## Client Usage

### Basic Client Usage

```typescript
import { A2AClient, Message, Part, TaskSendParams } from "@artinet/sdk";

// Create a new client instance targeting the agent's A2A endpoint
const client = new A2AClient("https://your-a2a-server.com/a2a"); // Ensure '/a2a' or your server's basePath is included

// Discover agent capabilities via its card (often at /.well-known/agent.json relative to the base URL)
// Note: The client needs the *direct* A2A endpoint URL. Card discovery might be a separate step.
// const agentCard = await client.agentCard(); // Assuming agentCard is fetched by other means or URL is known
// console.log(`Agent capabilities:`, agentCard.capabilities);

// Example: Check if the agent supports streaming before using it
const supportsStreaming = await client.supports("streaming");
console.log("Supports Streaming:", supportsStreaming);

// Create a message following the A2A schema
const message: Message = {
  role: "user",
  parts: [{ type: "text", text: "What is the weather in London?" }],
};

// Send a task using the standard request/response pattern
try {
  const task = await client.sendTask({
    id: "task-" + Date.now(), // Generate a unique task ID
    message,
  });
  console.log(`Task ${task?.id} status: ${task?.status.state}`);

  // Fetch task status later if needed
  const updatedTask = await client.getTask({ id: task!.id });
  console.log(`Updated Task Status: ${updatedTask?.status.state}`);
} catch (error) {
  console.error("A2A Client Error:", error);
  if (error instanceof RpcError) {
    console.error(`RPC Error Code: ${error.code}, Message: ${error.message}`);
  }
}
```

### Streaming Updates

Leverage real-time updates for long-running tasks if the agent supports it.

```typescript
import {
  A2AClient,
  Message,
  RpcError,
  TaskStatusUpdateEvent,
  TaskArtifactUpdateEvent,
} from "@artinet/sdk";

const client = new A2AClient("https://your-a2a-server.com/a2a");

async function runStreamingTask() {
  if (!(await client.supports("streaming"))) {
    console.log("Agent does not support streaming.");
    return;
  }

  const message: Message = {
    role: "user",
    parts: [
      { type: "text", text: "Generate a short story and a cover image." },
    ],
  };

  try {
    const stream = client.sendTaskSubscribe({
      id: "streaming-task-" + Date.now(),
      message,
    });

    console.log("Subscribed to task updates...");

    for await (const update of stream) {
      if ((update as TaskStatusUpdateEvent).status) {
        // Type guard for status updates
        const statusUpdate = update as TaskStatusUpdateEvent;
        console.log(`Task Status: ${statusUpdate.status.state}`);
        if (statusUpdate.status.message) {
          const text = statusUpdate.status.message.parts
            .filter((p) => p.type === "text")
            .map((p: any) => p.text)
            .join(" ");
          if (text) console.log("Agent Message:", text);
        }
        if (statusUpdate.final) {
          console.log("Task stream finished.");
        }
      } else if ((update as TaskArtifactUpdateEvent).artifact) {
        // Type guard for artifact updates
        const artifactUpdate = update as TaskArtifactUpdateEvent;
        console.log(
          `Received Artifact: ${artifactUpdate.artifact.name ?? "Unnamed"}`
        );
        // Process artifact parts (e.g., save file, display data)
        artifactUpdate.artifact.parts.forEach((part) => {
          if (part.type === "text")
            console.log(` -> Text Part: ${part.text.substring(0, 50)}...`);
          if (part.type === "file")
            console.log(
              ` -> File Part: ${part.file.name} (${part.file.mimeType})`
            );
          // Add logic to handle file bytes or URI
        });
      }
    }
  } catch (error) {
    console.error("A2A Streaming Error:", error);
    if (error instanceof RpcError) {
      console.error(`RPC Error Code: ${error.code}, Message: ${error.message}`);
    }
  }
}

runStreamingTask();
```

### Authentication

Pass authentication credentials easily.

```typescript
import { A2AClient } from "@artinet/sdk";

const client = new A2AClient("https://your-secure-a2a-server.com/a2a");

// Add a single header (e.g., Bearer token)
client.addHeader("Authorization", "Bearer your-api-token");

// Or set multiple headers at once
client.setHeaders({
  Authorization: "Bearer your-api-token",
  "X-Custom-Header": "value",
});

// Now make requests as usual
// await client.sendTask(...)
```

## Server Usage

Setting up an A2A-compliant agent server is remarkably straightforward with the Artinet SDK. The `A2AServer` class abstracts away the complexities of the A2A protocol and underlying JSON-RPC communication, allowing you to focus purely on implementing your agent's behavior.

### Implementing an A2A Agent

Define your agent's core logic using an async generator `TaskHandler`.

```typescript
import {
  A2AServer,
  TaskContext,
  TaskHandler
  InMemoryTaskStore,
  logger, // Use the built-in logger
} from "@artinet/sdk";
import path from "path";

// Define your agent's logic
async function* myAgentLogic(
  context: TaskContext
): TaskHandler {
  logger.info({ taskId: context.taskId }, "Received new task");

  // 1. Acknowledge receipt and indicate work is starting
  yield {
    state: "working",
    message: {
      role: "agent",
      parts: [{ type: "text", text: "Got it! Processing your request..." }],
    },
  };

  // Simulate some work
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // 2. Check for cancellation periodically during long operations
  if (context.isCancelled()) {
    logger.warn({ taskId: context.taskId }, "Task cancelled by client");
    yield { state: "canceled" };
    return; // Stop processing
  }

  // 3. Process the user's message
  const userRequest = context.userMessage.parts
    .filter((part) => part.type === "text")
    .map((part: any) => part.text)
    .join(" ");
  logger.debug(
    { taskId: context.taskId, request: userRequest },
    "Processing user text"
  );

  // 4. (Optional) Yield an artifact
  const artifactContent = `This is a generated report for: "${userRequest}"`;
  yield {
    // Artifact details
    name: "report.txt",
    mimeType: "text/plain",
    parts: [{ type: "text", text: artifactContent }],
  };
  logger.info({ taskId: context.taskId }, "Generated artifact report.txt");

  // Simulate more work
  await new Promise((resolve) => setTimeout(resolve, 1500));
  if (context.isCancelled()) {
    /* ... check again ... */
  }

  // 5. Yield the final response
  const finalResponse = `Finished processing: "${userRequest}". See attached report.`;
  yield {
    state: "completed",
    message: { role: "agent", parts: [{ type: "text", text: finalResponse }] },
  };
  logger.info({ taskId: context.taskId }, "Task completed successfully");
}

// Create a task store (in-memory for this example)
const store = new InMemoryTaskStore();

// Configure and create the A2A server instance
const server = new A2AServer({
  myAgentLogic,
  taskStore: store,
  port: 3000,
  basePath: "/a2a", // The path where A2A routes will be mounted
  // Customize the agent card served at /.well-known/agent.json
  card: {
    name: "Artinet Example Agent",
    description: "A robust A2A agent built with Artinet SDK",
    url: "http://localhost:3000/a2a", // Must match your server's accessible A2A endpoint
    version: "1.0.0",
    capabilities: {
      streaming: true, // This agent handler supports streaming via yields
      pushNotifications: false, // This agent doesn't implement push logic
    },
    skills: [
      // Define agent skills
      {
        id: "text-processing",
        name: "Text Processor",
        description: "Processes text requests and generates reports.",
      },
    ],
    // Add provider, auth details etc. as needed
  },
});

// Start the server
server.start();
logger.info(
  `A2A Server started on http://localhost:3000${server.options.basePath}`
);
logger.info(
  `Agent Card available at http://localhost:3000/.well-known/agent.json`
);
```

### Persistent Storage

Easily switch to file-based persistence. Ensure the data directory exists and is writable.

```typescript
import { A2AServer, FileStore, logger } from "@artinet/sdk";
import path from "path";
import fs from "fs";

// Assume myAgentLogic is defined as above

const dataDir = path.join(process.cwd(), "a2a-data");
// Ensure the directory exists
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
  logger.info(`Created data directory: ${dataDir}`);
}

// Create a file-based store
const store = new FileStore(dataDir);
logger.info(`Using FileStore at ${dataDir}`);

// Use the file store with your server
const server = new A2AServer(myAgentLogic, {
  taskStore: store,
  port: 3001,
  basePath: "/a2a-persistent",
  card: {
    /* ... configure card ... */ name: "Persistent Agent",
    url: "http://localhost:3001/a2a-persistent",
    version: "1.0.1",
    capabilities: { streaming: true },
    skills: [{ id: "persistent-skill", name: "Persistent Task Handler" }],
  },
});
server.start();
logger.info(
  `Persistent A2A Server started on http://localhost:3001${server.options.basePath}`
);
```

## Logging

Leverage the built-in `pino` logger for structured, performant logging.

```typescript
import { logger, configureLogger, LogLevel } from "@artinet/sdk";

// Configure logging (optional, defaults to 'error' level)
configureLogger({
  level: "debug", // 'silent', 'fatal', 'error', 'warn', 'info', 'debug', 'trace'
  name: "MyA2AApp", // Optional logger name
});

// Use the logger throughout your application
logger.info("Server starting...");
logger.error(
  { err: new Error("Config Error"), detail: "Missing API key" },
  "Initialization failed"
);
logger.debug({ taskId: "task-123", status: "working" }, "Processing task");

// Create child loggers for specific modules
const clientLogger = logger.child({ component: "A2AClient" });
clientLogger.info("Sending request to agent...");

// Set level via environment variable (e.g., LOG_LEVEL=debug) for flexibility
// configureLogger(); // Reads from process.env.LOG_LEVEL if set

// In production, typically use 'info' or 'warn'
// configureLogger({ level: "info" });
```

## Advanced Server Customization

While the `A2AServer` provides a convenient setup using a default [Jayson](https://github.com/tedeh/jayson) JSON-RPC server, you might need more control for specific use cases, such as:

- Integrating A2A methods into an existing Express application with custom middleware.
- Adding non-A2A custom JSON-RPC methods alongside the standard A2A ones.
- Using a different JSON-RPC library or implementation.

The SDK allows you to provide your own function to create the JSON-RPC server instance via the `createJSONRPCServer` option in `A2AServerOptions`.

### Custom `createJSONRPCServer` Function

To provide your own server, implement a function that adheres to the `JSONRPCServerFactory` type defined by the SDK:

```typescript
import {
  CreateJSONRPCServerParams,
  JSONRPCServerType,
  JSONRPCServerFactory, // Import the factory type
} from "@artinet/sdk";
import jayson from "jayson"; // Assuming Jayson is used

// Your function implements the JSONRPCServerFactory interface
const myCustomCreateServer: JSONRPCServerFactory = (
  params: CreateJSONRPCServerParams
): JSONRPCServerType => {
  // 'params' contains everything needed: taskStore, card, taskHandler, etc.
  // 'JSONRPCServerType' is expected to be a Jayson server instance by default

  // 1. Create your Jayson server instance (or adapt for another library)
  const jaysonServer = new jayson.Server(
    {
      // 2. Define A2A methods using the provided params (taskStore, taskHandler, etc.)
      "tasks/send": async (args: any, callback: jayson.JSONRPCCallback) => {
        // Implement tasks/send logic, potentially calling helper functions
        // from the SDK or using params.taskStore, params.taskHandler directly.
        // Remember to handle errors and use the callback.
        console.log("Custom tasks/send called!");
        // ... implementation ...
        callback(null, { id: args.id, status: { state: "submitted" } }); // Example response
      },
      "tasks/get": (/* ... */) => {
        /* ... */
      },
      "tasks/cancel": (/* ... */) => {
        /* ... */
      },
      // ... other A2A methods ...

      // 3. Add any custom methods
      myCustomMethod: (args: any, callback: jayson.JSONRPCCallback) => {
        console.log("My custom method called with:", args);
        callback(null, { result: "Custom success!" });
      },
    },
    {
      // Jayson server options
    }
  );

  return jaysonServer;
};
```

Refer to the `src/server/lib/json-middleware.ts` file for the default implementation (`defaultCreateJSONRPCServer`) as a reference.

### Using the Custom Function

Pass your function during `A2AServer` initialization:

```typescript
import {
  A2AServer,
  InMemoryTaskStore /* ... other imports ... */,
} from "@artinet/sdk";
// Assume myAgentLogic and myCustomCreateServer are defined as above

const store = new InMemoryTaskStore();

const server = new A2AServer({
  taskHandler: myAgentLogic,
  taskStore: store,
  port: 3002,
  basePath: "/a2a-custom",
  createJSONRPCServer: myCustomCreateServer, // Pass your custom function here
  card: {
    /* ... configure card ... */ name: "Custom RPC Agent",
    url: "http://localhost:3002/a2a-custom",
    version: "1.1.0",
    capabilities: { streaming: true }, // Ensure capabilities match your implementation
    skills: [{ id: "custom-skill", name: "Custom RPC Handler" }],
  },
});

server.start(); // This will now use your custom server setup
```

This provides maximum flexibility for integrating the A2A protocol handling into diverse server environments.

## API Reference

### Core Classes

- `A2AClient`: Client for interacting with A2A servers.
- `A2AServer`: Express-based server implementation.
- `RpcError`: Client-side A2A protocol errors.
- `A2AError`: Server-side A2A protocol errors (used internally).
- `InMemoryTaskStore`: Simple in-memory task persistence.
- `FileStore`: File-based task persistence.

### Key Types & Interfaces

- `TaskHandler`: Async generator function defining agent logic (`async function*(context: TaskContext): AsyncGenerator<TaskYieldUpdate>`).
- `TaskContext`: Provides task details (`taskId`, `userMessage`, `isCancelled`, `metadata`, `store`) to the `TaskHandler`.
- `TaskYieldUpdate`: Union type for updates yielded by `TaskHandler` (status changes or artifacts).
- `A2AServerOptions`: Configuration for `A2AServer` (port, store, card, basePath, etc.).
- `AgentCard`, `Message`, `Part`, `Artifact`, `Task`, `TaskStatus`, etc.: Types mirroring the A2A JSON Schema.

## Contributing

Contributions are welcome! Please open an issue or submit a Pull Request.

## License

This project is licensed under the MIT License - see the `LICENSE` file for details.

## Acknowledgements

This SDK builds upon the [official A2A Protocol schema](https://github.com/google/A2A/blob/main/samples/js/src/schema.ts) created by Google, providing a robust and developer-friendly implementation suitable for production environments.
