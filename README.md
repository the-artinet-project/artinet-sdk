[![npm version](https://img.shields.io/npm/v/@artinet/sdk.svg)](https://www.npmjs.com/package/@artinet/sdk)
[![npm downloads](https://img.shields.io/npm/dt/@artinet/sdk.svg)](https://www.npmjs.com/package/@artinet/sdk)
[![Apache License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](LICENSE)
[![Known Vulnerabilities](https://snyk.io/test/npm/@artinet/sdk/badge.svg)](https://snyk.io/test/npm/@artinet/sdk)

<!-- [![Coverage Status](https://coveralls.io/repos/github/the-artinet-project/artinet-sdk/badge.svg?branch=main)](https://coveralls.io/github/the-artinet-project/artinet-sdk?branch=main) -->

# artinet SDK

The artinet SDK is a Full Stack Agent builder written in TypeScript for [node.js](https://nodejs.org/) that aims to simplify the creation of interoperable AI agents. Learn more at [the artinet project](https://artinet.io/).

This SDK significantly supports multiple agentic communication protocols, offering a production-ready solution with a focus on developer experience, reliability, and comprehensive features.

### Quick Start

To build your own agent/server use the [`create-quick-agent`](https://www.npmjs.com/package/@artinet/create-quick-agent) command:

```bash
npx @artinet/create-quick-agent@latest
```

It has [serveral template projects](https://github.com/the-artinet-project/create-quick-agent) that you can use to get started building agents today.

## Table of Contents
- [artinet SDK](#artinet-sdk)
    - [Quick Start](#quick-start)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Installation](#installation)
  - [Requirements](#requirements)
  - [Documentation](#documentation)
  - [Example](#example)
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
    - [Quick-Agents (Alpha)](#quick-agents-alpha)
  - [Contributing](#contributing)
  - [License](#license)
  - [Acknowledgements](#acknowledgements)

## Features

- **Plug-and-Play Server:** Built on Express.js, the `ExpressServer` handles Transport-layer complexity, routing, protocol compliance, and Server-Sent Events (SSE) streaming mechanics automatically. Just provide your core agent logic (`AgentEngine`) and configuration via `ExpressServerOptions`.
- **TypeScript First:** Fully written in TypeScript with comprehensive type definitions for a robust developer experience.
- **Protocol Compliance:** Implements the complete A2A specification with growing support for recieving commands via MCP & ACP.
- **Code Deployment (Experimental)** | Bundle, test, and deploy agent code onto the artinet. Includes bundler, task wrapper, and deployment utilities.

| Component/Feature   | Description                                                                 | Key Classes/Types                                                                            |
| :------------------ | :-------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------- |
| **Client**          | Interact with A2A-compliant agents. Supports standard & streaming requests. | `A2AClient`, `RpcError`                                                                      |
| **Server**          | Host agents that can communicate using a variety of protocols. Handles protocol details, routing, SSE.          | `ExpressServer`, `ExpressServerOptions`                                                               |
| **Reqeust Handling**   | Define agent logic using async generators.                                  | `AgentEngine`, `ExecutionContext`, `UpdateEvent`                                              |
| **Storage**         | Persist event state. In-memory and file-based options included.              | `Store`, `InMemoryTaskStore`, `FileStore`                                                |
| **Streaming (SSE)** | Handle real-time updates via SSE.   |                                           |
| **Logging**         | Configure structured logging for debugging and monitoring.                  | `logger`, `configureLogger`, `LogLevel`                                                      |
| **Advanced Server** | Customize the underlying JSON-RPC server or integrate into existing apps.   | `CreateJSONRPCServerParams`, `createJSONRPCMethod` |
| **Core Types**      | Based on the official JSON Schemas.                                      | `Tool`,`AgentCard`, `Task`, `Message`, `Part`, `Artifact`, etc.                                     |
| **Agent Utilities (for Sandboxed Environments)** | Standardized utilities for agents in managed environments to interact with the host system for task lifecycle, inter-agent communication, and external API calls. | `artinet.v0.taskManager`, `artinet.v0.connect`, `artinet.v0.agent`, `TaskProxy`, `ConnectAPICallback`, `ClientProxy`, `ClientFactory` |

## Installation

```bash
npm install @artinet/sdk
```

## Requirements

- Node.js (v22.0.0 or higher recommended, check `package.json` engines for exact requirement)

## Documentation

For more detailed documentation visit our documentation site [here](https://the-artinet-project.github.io/artinet-documentation/).

## Example
 
A basic A2A server and client interaction. For more detailed examples, see the `examples/` directory.

**1. Server (`quick-server.ts`)**

```typescript
import {
  ExpressServer,
  ExecutionContext,
  AgentEngine,
  InMemoryTaskStore,
} from "@artinet/sdk";

// Minimal agent logic: receive text, yield working state, yield completed state with echo
const quickAgentLogic: AgentEngine = async function* (context: ExecutionContext) {
  const params = context.getRequestParams() as MessageSendParams; //for A2A requests
  const userInput = params.message.parts[0].kind === "text"
      ? context.userMessage.parts[0].text
      : "";
  yield { state: "working" };
  // Simulate some work if needed, check context.isCancelled()
  yield {
    state: "completed",
    message: {
      role: "agent",
      parts: [{ kind: "text", text: `You said: ${userInput}` }],
    },
  };
};

const server = new A2AServer({
  handler: quickAgentLogic,
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
    messageId: "test-message-id",
    kind: "message",
    role: "user",
    parts: [{ kind: "text", text: "Hello Quick Start!" }],
  };

  const stream = client.sendStreamingMessage({ message });

  for await (const update of stream) {
    // process the update
    ...
  }
  console.log("Stream finished.");
}

runClient().catch(console.error);
```

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

Send a message using `message/send`.

```typescript
import { A2AClient, Message } from "@artinet/sdk";

async function runBasicTask() {
  const client = new A2AClient("https://your-a2a-server.com/a2a");
  const message: Message = {
    messageId: "test-message",
    kind: "message",
    role: "user",
    parts: [{ kind: "text", text: "What is the capital of France?" }],
  };

  const task = await client.sendMessage({ message });
  console.log("Task Completed:", task);
}
```

#### Streaming Updates

Receive real-time updates via SSE using `message/stream` (recommended).

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

  const stream = client.sendStreamingMessage({ id: "streaming-task-1", message });

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
  ExecutionContext,
  AgentEngine,
  InMemoryTaskStore,
} from "@artinet/sdk";


const myAgent: AgentEngine = async function* (context: ExecutionContext) {

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
  handler: myAgent,
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

This factory function receives objects of type `CreateJSONRPCServerParams` & `RequestParams` containing the necessary SDK dependencies (`taskHandler`, `taskStore`, `agentCard`, `activeCancellations`, `createTaskContext`, `closeStreamsForTask`) and the specific method parameters (i.e. `SendMessageRequest["params"]`). You can use these dependencies to configure the standard A2A methods and add your own custom JSON-RPC methods.

The SDK exports default handlers for the standard A2A methods (e.g., `defaultSendMessageMethod`), create your own using dedicated A2A method types(`SendMessageMethod`) and use `createJSONRPCMethod` to easily wrap these methods with dependency injection and error handling.

See `src/server/lib/middleware/factory.ts` and `src/server/lib/middleware/a2a-methods.ts` for implementation details.

**Example:**

```typescript

const myCustomSendMethod: SendMessageMethod = (
  deps,
  requestParams,
  callback
) => {
  const { taskStore, taskHandler, createTaskContext } = deps;
  const { id: taskId } = requestParams;
  const { message, sessionId, metadata } = requestParams;
  ...
  callback(null, ...);
};

const myCustomRPCServer: JSONRPCServerFactory = (
  params: CreateJSONRPCServerParams
): JSONRPCServerType => {
  //Use a custom message/send method
  const messageSendMethod = createJSONRPCMethod(params, myCustomSendMethod, "message/send");
  const taskGetMethod = createJSONRPCMethod(params, defaultGetTaskMethod, "tasks/get");
  const taskCancelMethod = createJSONRPCMethod(params, defaultCancelTaskMethod, "tasks/cancel");

  // Note: Push notifications are not fully implemented yet
  const taskPushNotificationSetMethod = createJSONRPCMethod(params, defaultSetTaskPushNotificationMethod, "tasks/pushNotificationConfig/set");
  const taskPushNotificationGetMethod = createJSONRPCMethod(params, defaultGetTaskPushNotificationMethod, "tasks/pushNotificationConfig/get");

  const rpcServer = new JSONRPCServer({
    "message/send": messageSendMethod,
    "tasks/get": taskGetMethod,
    "tasks/cancel": taskCancelMethod,
    "tasks/pushNotificationConfig/set": taskPushNotificationSetMethod,
    "tasks/pushNotificationConfig/get": taskPushNotificationGetMethod,
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

**Important:** The default `A2AServer` setup automatically adds Express middleware to handle Server-Sent Events (SSE) for `message/stream` and `tasks/resubscribe`, as well as the `/agent/card` (and `/.well-known/agent.json`) GET endpoints. If you are **not** using `A2AServer` and integrating the Jayson server middleware into your own Express application, you **must** implement these SSE and card endpoints yourself to maintain full A2A compliance, especially for streaming functionality. See `src/server/lib/express-server.ts` for how the default server handles these routes.

### Quick-Agents (Alpha)

We are excited to introduce new capabilities for deploying agents directly onto the artinet. 

We've added a `testDeployment` utility which is available for all users letting you bundle and test your agent logic in a temporary sandboxed environment. 

**QUICK-AGENTS** Use the `fullDeployment` utility, which allows direct deployment of your bundled agent code and `AgentCard` to the Artinet platform (requires an `ARTINET_API_KEY`).

To join the beta waitlist, please email us at humans@artinet.io and stay tuned for more updates!

Key features include:

-   **Easy Agent Bundling:** Bundle your agent's code and dependencies into a single file using the `bundle` utility.
    ```typescript
    import { bundle } from "@artinet/sdk";

    const bundledCode = await bundle(new URL('./your-agent.ts', import.meta.url));
    ```

-   **Sandboxed Enviroments:** Streamline agent logic for quick and easy deployments. The new `artinet.v0` namespace (accessible via `@artinet/sdk/agents`) provides `taskManager`, `connect`, and `agent`.
    -   `artinet.v0.taskManager`: Manages the agent's lifecycle by iterating over the agent's `TaskHandler` and communicating updates to the host environment.
    -   `artinet.v0.connect`: Replaces the deprecated `fetchResponseProxy`. Allows agents to make proxied calls to other agents or LLMs via the host environment.
    -   `artinet.v0.agent`: A factory function to obtain a `ClientProxy` for type-safe communication with other agents, managed by the host environment.

    Example of using the new `artinet.v0` utilities in an agent:
    ```typescript
    import { TaskContext, TaskYieldUpdate, Task } from "@artinet/sdk";
    import { artinet } from "@artinet/sdk/agents";

    export async function* myAgentLogic(context: TaskContext): AsyncGenerator<TaskYieldUpdate, Task | void, unknown> {
      yield { state: "working" };

      // Call another agent/LLM using artinet.v0.connect
      const llmResponse = await artinet.v0.connect({
        agentId: "SomeLLMAgentID",
        messages: [{ role: "user", content: "Tell me a joke." }]
      });

      // Or communicate tasks with artinet.v0.agent
      const anotherAgent = artinet.v0.agent({
        baseUrl: "https://agents.artinet.io/agentId=456",
      });
      const taskResult = await anotherAgent.sendTask({
        ...
      });

    }

    // The host environment will invoke this taskManager with the agent's logic.
    await artinet.v0.taskManager({ taskHandler: myAgentLogic });
    ```
    *Note: The `taskHandlerProxy` and `fetchResponseProxy` utilities are now deprecated in favor of `artinet.v0.taskManager` and `artinet.v0.connect` respectively.*

-   **Test-Agents (Experimental):** Simulate and test your agents @ agents.artinet.io/test/deploy using the `testDeployment` tool.
    ```typescript
    import { testDeployment, ServerDeploymentRequestParams, SendTaskRequest } from "@artinet/sdk";

    const deploymentParams: ServerDeploymentRequestParams = {
      code: "/* bundled code string */",
    };
    //create a list of tasks for your agent to complete once deployed
    const testRequests: SendTaskRequest[] = [
      { id: "t1", message: { role: "user", parts: [{ type: "text", text: "Hi!" }] } }
    ];

    for await (const result of testDeployment(deploymentParams, testRequests)) {
      console.log(result); //process the task completion requests as they come in to confirm your agents logic
    }
    ```

-   **Full Deployment (Experimental):** Deploy your agent to the Artinet platform using the `fullDeployment` utility.
    ```typescript
    import { fullDeployment, ServerDeploymentRequestParams } from "@artinet/sdk";

    const deploymentParams: ServerDeploymentRequestParams = {
      name: "My Awesome Agent",
      agentCard: { /* your agent card */ },
      code: "/* bundled code string */",
    };

    const deploymentResult = await fullDeployment(deploymentParams); // Requires an ARTINET_API_KEY environment variable
    console.log("Deployment Result:", deploymentResult);
    ```

-   **Dedicated Endpoints:** Once deployed your agent will be available On-Demand at its dedicated enpoint. (e.g. "https://agents.artinet.io/agentId=0xabf698845743538727a81352bfcfdb724e5c2bbe3113a26362482248f9f3e5fa/.well-known/agent.json")
-   **New Types:** To support these features, new types for server deployment requests and responses (such as `ServerDeploymentRequestParams`, `ServerDeploymentResponse`) have been added to `src/types/extended-schema.ts`. New types for sandboxed agent interactions (`TaskProxy`, `ConnectAPICallback`, `ClientProxy`, etc.) are in `src/types/proxy.ts`.

  **QUICK-AGENT FAQs**
-   Test-Agents expire after 60s (need more time? let us know @humans@artinet.io)
-   Quick-Agents do not have access to a filesystem or networking (limited persistance & networking capabalities are on the project roadmap).
-   Quick-Agents v0 does not support streaming, push notifications or state transition history (these capabilities are on the project roadmap).
-   Larger deployments can take significant time to deploy which may cause `fullDeployment` to timeout. In such cases wait to see if the listing has been added to your account before trying to deploy again.
-   Quick-Agent logic is public, therefore the artinet project is not liable for any sensitive material held within a deployment.
-   Only availble with version 0.5.3 of the SDK.
  
Sign-up at [artinet.io](https://artinet.io/) to deploy your Quick-Agent today!

## Contributing

Contributions are welcome! Please open an issue or submit a Pull Request on [GitHub](https://github.com/the-artinet-project/artinet-sdk).

Ensure code adheres to the project style and passes linting (`npm run lint`) and tests (`npm test`).

## License

This project is licensed under the Apache License 2.0 - see the `LICENSE` file for details.

## Acknowledgements

This SDK builds upon the concepts and specifications of the [Agent2Agent (A2A) Protocol](https://github.com/google-a2a/A2A) initiated by Google. It utilizes the official [A2A JSON Schema](https://github.com/google-a2a/A2A/blob/main/specification/json/a2a.json) for protocol compliance.

Libraries used include:

- [Express.js](https://expressjs.com/) for the server framework.
- [Jayson](https://github.com/tedeh/jayson) for JSON-RPC handling.
- [Pino](https://getpino.io/) for logging.
- [EventSource Parser](https://github.com/rexxars/eventsource-parser) for SSE streaming.
