[![Website](https://img.shields.io/badge/website-artinet.io-black)](https://artinet.io/)
[![npm version](https://img.shields.io/npm/v/@artinet/sdk.svg?logoColor=black)](https://www.npmjs.com/package/@artinet/sdk)
[![npm downloads](https://img.shields.io/npm/dt/@artinet/sdk.svg)](https://www.npmjs.com/package/@artinet/sdk)
[![Apache License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](LICENSE)
[![Known Vulnerabilities](https://snyk.io/test/npm/@artinet/sdk/badge.svg)](https://snyk.io/test/npm/@artinet/sdk)
[![GitHub stars](https://img.shields.io/github/stars/the-artinet-project/artinet-sdk?style=social)](https://github.com/the-artinet-project/artinet-sdk/stargazers)
[![Discord](https://dcbadge.limes.pink/api/server/DaxzSchmmX?style=flat)](https://discord.gg/DaxzSchmmX)

# artinet-sdk

Give your AI agent the power to communicate with any other agent, no matter the framework.

The artinet-sdk is a TypeScript library that adds a standardized, interoperable communication layer to your agents.

## Features

- **Easy To Use:** The AgentBuilder lets you quickly create an Agent2Agent API, while handling all of the communication complexity.
- **No Vendor Lock-In:** Create agents that can communicate with other agents across frameworks and ecosystems with just a few lines of code.
- **Flexible Design:** Everything you need to build collaborative agents while remaining modular enough for advanced configuration.

## Quick Start

Use the [`create-agent`](https://www.npmjs.com/package/@artinet/create-agent) command:

```bash
npx @artinet/create-agent@latest
```

It has [serveral template projects](https://github.com/the-artinet-project/create-agent/tree/main/templates) that you can use to jump right into agent building.

## Table of Contents

- [artinet-sdk](#artinet-sdk)
  - [Features](#features)
  - [Quick Start](#quick-start)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Requirements](#requirements)
  - [Example](#example)
  - [Running Tests](#running-tests)
  - [Usage](#usage)
    - [Client](#client)
      - [Basic Client Usage](#basic-client-usage)
      - [Browser Usage](#browser-usage)
      - [Streaming Updates](#streaming-updates)
      - [Authentication](#authentication)
    - [Server](#server)
      - [Implementing an A2A Agent](#implementing-an-a2a-agent)
        - [AgentBuilder](#agentbuilder)
        - [AgentEngine](#agentengine)
      - [Event Handling/Monitoring \& Message Streaming](#event-handlingmonitoring--message-streaming)
      - [Persistent Storage](#persistent-storage)
      - [Advanced Server Customization](#advanced-server-customization)
      - [Cross Protocol Support](#cross-protocol-support)
  - [**Migration Changes**](#migration-changes)
  - [Contributing](#contributing)
  - [License](#license)
  - [Acknowledgements](#acknowledgements)

## Installation

```bash
npm install @artinet/sdk
```

## Requirements

- [Node.js](https://nodejs.org/en/download) ≥ 18.9.1
  - Recommended: 20 || ≥ 22

<!--

## Documentation

For more detailed documentation visit our documentation site [here](https://the-artinet-project.github.io/artinet-documentation/). -->

## Example

A basic A2A server and client interaction (For simple agents see the [AgentBuilder](#agentbuilder) section). For more detailed examples, see the `examples/` directory.

**1. Server (`quick-server.ts`)**

```typescript
import {
  createAgentServer,
  AgentBuilder,
  Task
} from "@artinet/sdk";

// Create an agent server
const { app, agent } = createAgentServer({
  agent: AgentBuilder()
  .text(async ({ content: userInput, context }) => {
    const task: Task = context.State().task;
    ...
    return `You said: ${userInput}`;
  })
  .createAgent({
    agentCard: "QuickStart Agent",
  }),
  basePath: "/a2a"
});

app.listen(3000, () => {
  console.log("A2A Server running at http://localhost:3000/a2a");
});
```

**2. Client (`quick-client.ts`)**

```typescript
import { A2AClient, TaskStatusUpdateEvent } from "@artinet/sdk";

async function runClient() {
  const client = new A2AClient("http://localhost:3000/a2a");

  const stream = client.sendStreamingMessage("Hello World!");

  for await (const update of stream) {
    // process the updates
    ...
  }
  console.log("Stream finished.");
}

await runClient().catch(console.error);
```

## Running Tests

```bash
npm test
```

## Usage

### Client

Interact with A2A-compliant agents using the `A2AClient`. See `examples/` for more.

#### Basic Client Usage

Send a message using `message/send`.

```typescript
import { A2AClient, Task } from "@artinet/sdk";

const client = new A2AClient("https://your-a2a-server.com/a2a");

const task: Task = await client.sendMessage("What is the capital of France?");
```

#### Browser Usage

_Experimental_

The Client can be used directly in browsers. You'll need to load the required external dependencies: `zod`, `uuid`, and `eventsource-parser`.

```html
<!DOCTYPE html>
<html>
  <head>
    <!-- Required external dependencies -->
    <script type="importmap">
      {
        "imports": {
          "zod": "https://esm.sh/zod@3.23.8",
          "uuid": "https://esm.sh/uuid@11.1.0",
          "eventsource-parser": "https://esm.sh/eventsource-parser@3.0.1"
        }
      }
    </script>
  </head>
  <body>
    <script type="module">
      const { A2AClient } = await import("@artinet/sdk");
      const client = new A2AClient("http://localhost:4000/a2a");

      const stream = await client.sendStreamingMessage("Hello!");
      for await (const update of stream) {
        console.log(update);
      }
    </script>
  </body>
</html>
```

> **Note:** Uses [esm.sh](https://esm.sh) as a CDN. See [`examples/browser-example.html`](examples/browser-example.html) for a complete example.

#### Streaming Updates

Receive real-time updates via SSE using `message/stream`.

```typescript
import {
  A2AClient,
  Message,
  TaskStatusUpdateEvent,
  TaskArtifactUpdateEvent,
} from "@artinet/sdk";

async function runStreamingTask() {
  const client = new A2AClient("https://your-a2a-server.com/a2a");

  const stream = client.sendStreamingMessage("Tell me a short story.");

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

Use `createAgentServer()` to embed your Agents in an Express App.

#### Implementing an A2A Agent

The SDK provides a variety of options for creating complex ([AgentEngines](#agentengine)) or simple agents ([AgentBuilder](#agentbuilder)).

##### AgentBuilder

**Option 1: Using the AgentBuilder (Recommended)**

For simple agents with one or more processing steps, use the `AgentBuilder` pattern:

```typescript
import { createAgentServer, AgentBuilder } from "@artinet/sdk";

//create a simple agent
const simpleAgent = AgentBuilder().text(() => "hello world!");

//or design a powerful multi-step agent
const { app, agent } = createAgentServer({
  agent: AgentBuilder()
    .text(({ content, context }) => {
      const userMessage = content ?? "no message detected";
      return {
        parts: [`Processing: ${userMessage}`], //parts are immediately sent back to the caller as TaskStatusUpdateEvents
        args: [userMessage], //args are passed to the next step
      };
    })
    .file(({ args }) => {
      const processedText = args[0];
      return {
        parts: [
          {
            name: "result.txt",
            mimeType: "text/plain",
            bytes: `Processed result: ${processedText}`,
          },
        ],
        args: ["file-generated"],
      };
    })
    .text(({ args }) => {
      const status = args[0];
      return `Task completed. Status: ${status}`;
    }) //A final Task is returned to the caller which contains all of the emitted parts.
    .createAgent({
      agentCard: "Multi-Step Agent",
    }),
  basePath: "/a2a",
});

app.listen(3000, () => {
  console.log("Multi-Step A2A Server running on http://localhost:3000/a2a");
});
```

The `AgentBuilder` approach is particularly useful when you need:

- **Step-by-step processing**: Break down complex tasks into discrete, manageable steps
- **Data flow between steps**: Pass results from one step to the next using the `args` parameter
- **Different content types**: Mix text, file, and data processing in a single flow
- **Reusable components**: Build modular agents that can be easily edited or extended

##### AgentEngine

**Option 2: Direct AgentEngine Implementation**

When you need full control over the execution flow, implement an `AgentEngine` directly:

```typescript
import {
  createAgentServer,
  Context,
  AgentEngine,
} from "@artinet/sdk";

const myAgent: AgentEngine = async function* (context: Context) {
  const task: TaskAndHistory = context.State();
  yield {
    state: "working",
    message: {
      ...
      role: "agent",
      parts: [{ kind: "text", text: "Processing..." }],
    },
    ...
  };
  yield {
    ...
    name: "result.txt",
    mimeType: "text/plain",
    parts: [{ kind: "text", text: "Report data" }],
  };

  yield {
    ...
    state: "completed",
    message: {
      kind: "message"
      role: "agent",
      parts: [{ kind: "text", text: "Finished processing." }],
      ...
    },
  };
};

const { app, agent } = createAgentServer({
  agent: {
    engine: myAgent,
    agentCard: {
      name: "Example Agent",
      url: "http://localhost:3000/a2a",
      version: "1.0.0",
      capabilities: { streaming: true },
      skills: [{ id: "processor", name: "Text Processor" }],
      ...
    },
  },
  basePath: "/a2a",
  agentCardPath: "/.well-known/agent-card.json",
});
```

#### Event Handling/Monitoring & Message Streaming

The SDK provides comprehensive event handling & message streaming capabilities that allow you to modify agent execution, subscribe to events, stream commands, and respond to state changes in real-time.

**Override Event Behaviour**

When using the service layer, you can provide your own Event Handlers:

```typescript
import { createAgent, TaskManager, ContextManager, Command, SendCommandInterface } from "@artinet/sdk";

const customContextManager = new ContextManger();
const agent = createAgent({
  engine: (context: Context){
    context.events.on("update", (currentState, nextState) => {
      //allow other processes to subscribe to your agent
    })
    ...
    //handle command streams directly within an agent
    for await (const command of context.command) {
      console.log("new command recieved: ", command);
      //will continue polling until the command stream is closed by calling command.close();
    }
    //or process them via events
    context.command.on("send", (command) => {
      ...
    });
  },
  agentCard: "Event-Monitored Agent",
  contexts: customContextManager,
  tasks: new TaskManager(),
  eventOverrides: { //for even greater control create your own Event Handlers
    onStart: async (context) => {
      ...
      return currentState;
    },
    onUpdate: async (currentState, nextState) => {
      ...
      return currentState;
    },
    ...
  },
});

const resultPromise = agent.sendMessage({
  contextId: "123"
  ...
});

const currentContext = customContextManager.getContext("123");

//subscribe to the events from a specific context
currentContext.events.on("complete", () {
  ...
  //errors thrown here will be triggered in the original context
});

// Advanced: stream new commands into a running context
(currentContext.command as SendCommandInterface<Command>).send({
  ...
});

currentContext.command.close();
```

**Available Event Types**

The EventManager supports the following event types:

- **`OnStart`/`start`**: Fired when agent execution begins
- **`OnUpdate`/`update`**: Fired on each state update during execution
- **`OnError`/`error`**: Fired when an error occurs during execution
- **`OnComplete`/`complete`**: Fired when agent execution completes successfully
- **`OnCancel`/`cancel`**: Fired when agent execution is cancelled

#### Persistent Storage

For Task storage, use one our simple storage providers like `FileStore`. Or implement the `Store` interface to create your own.

```typescript
import path from "path";
import fs from "fs";
import { FileStore } from "@artinet/sdk";

//make sure the directory exists
const dataDir = path.join(process.cwd(), "a2a-data");
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const myStore = new FileStore(dataDir);

const { app, agent } = createAgentServer({
  agent: {
    engine: myAgent,
    agentCard: {
      ...
    },
    tasks: myStore,
  },
  ...
});
```

#### Advanced Server Customization

Our architecture provides multiple ways to customize your agent server:

**1. Using `createAgentServer`:**
Easily spin up an A2A Express app `createAgentServer()`:

```typescript
const initialApp = express();

// custom middleware
initialApp.use((req, res, next) => {
  ...
  next();
});

const { app, agent } = createAgentServer({
  app: initialApp
  agent: {
    ...
  },
});

// more custom middleware
app.use("/custom", (req, res, next) => {
  ...
});

```

**2. Using our JSON-RPC Middleware:**
Directly import our preconfigured JSON-RPC middleware:

```typescript
import express from "express";
import { createAgent, jsonRPCMiddleware, errorHandler } from "@artinet/sdk";

const customApp = express();

const agent = createAgent({
  engine: myAgentLogic,
  agentCard: {
    ...
  },
});

customApp.use("/auth", yourAuthMiddleware);
customApp.use("/metrics", yourMetricsMiddleware);
customApp.use(express.json());

// Add A2A middleware
customApp.post("/", async (req, res, next) => {
  return await jsonRPCMiddleware(agent, req, res, next);
});
// Dont forget to add error handling*
customApp.use(errorHandler);

// Serve the agent card
customApp.get("/.well-known/agent-card.json", (req, res) => {
  res.json(agent.agentCard);
});

// Start your custom server
const server = customApp.listen(3000, () => {
  console.log("Custom A2A server running on port 3000");
});
```

**3. Using Custom Transport Layers:**

Use our preconfigured TRPC router, or create your own integration with WebSockets & other protocols:

```typescript
import { createAgentRouter } from "@artinet/sdk";

const agentRouter = createAgentRouter();
```

**Use the Agent:**

Directly invoke the agent to use it locally:

```typescript
import { createAgent } from "@artinet/sdk";

const agent = createAgent({
  engine: myAgentLogic,
  agentCard: {
    ...
  },
});

// Wrap these calls in your desired transport logic
const result = await agent.sendMessage({
  ...
});

// Directly process streams
const stream = agent.streamMessage({
  ...
});

for await (const update of stream) {
  ...
}
```

**Important:** When using custom implementations, ensure you handle:

- Server-Sent Events (SSE) for `message/stream` and `tasks/resubscribe`
- Agent card endpoints at `/.well-known/agent-card.json`
- Proper error handling and JSON-RPC compliance
- CORS headers if needed for web clients

#### Cross Protocol Support

**MCP (Model Context Protocol) Integration**

The SDK provides a Model Context Protocol (MCP) <-> A2A compatability layer.

Use `createMCPAgent` to expose your agent via MCP:

```typescript
import { createMCPAgent, createAgent } from "@artinet/sdk";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";

// Wrap your agent in an MCP Server
const mcpAgent = createMCPAgent({
  serverInfo: {
    name: "My MCP Agent",
    version: "1.0.0",
  },
  options: {
    ...
  },
  agent: createAgent({
    engine: myAgentEngine,
    agentCard: "MCP Agent",
  }),
  agentCardUri: "agent://card", //customize the URI for your AgentCard
});

// The MCPAgent is a fully compliant MCP Server so you can use it as you normally would.
mcpAgent.registerTool({
  ...
});

await mcpAgent.connect(new StdioServerTransport());
```

Use an MCP Client to interact with an mcpAgent:

```typescript
...
// Access the AgentCard as a Resource
const agentCard = await client.readResource({ uri: "agent://card" });

// or send messages via Tool Calling
const result = await client.callTool({
  name: "send-message",
  arguments: {
    ...
    message: {
      ...
      parts: [{ kind: "text", text: "Hello from MCP!" }],
    },
  },
});
```

**MCP Tools & Resources:**

- `send-message`: Send messages to the A2A agent
- `get-task`: Retrieve tasks by ID
- `cancel-task`: Cancel a running task
- `agent://card`: Retrieve the AgentCard
- `send-streaming-message`, `task-resubscribe` & `push-notifications` etc are currently not supported by default.
- Leverage the A2A Zod Schemas to manually implement your own tools.

## **Migration Changes**

\*since v0.5.8

- Pino has been removed and replaced with console for better portability and is set to silent by default.
- The default handler for streamMessage no longer automatically emits an initial `submitted` and `working` event.
- Agent Registration, Bundling and Deployment utils have been removed (email us: humans@artinet.io for support).
- `@artinet/metadata-validator` has been removed due to build issues.
- getTask now correctly takes TaskQueryParams as an argument vs TaskIdParams in accordance with the A2A spec.
- AgentBuilder now returns a unique messageId for each status update instead of the original user provided messageId.
- AgentBuilder now prefers the contextId & taskId from the calling context.
- In a future release the following packages will be set as peer dependancies to reduce the size of the build: `@modelcontextprotocol/sdk`, `@trpc/server`, `cors`, `express`
- The `history` object from `TaskAndHistory` is deprecated and no longer being updated. Use `Task.history` instead.
- The `A2AClient` now checks `/.well-known/agent-card.json` as a opposed to `/.well-known/agent.json` in-line with the A2A spec.
- The `A2AClient` now uses uses the `AgentCard`.url if an `AgentCard` has been successfully retrieved, else it will default to the `baseUrl`.
- The examples folder will be removed in favor of [`create-agent`](https://github.com/the-artinet-project/create-agent).
- In `Task` the `contextId` field is now required (inline with the A2A spec).
- In `AgentSkill` the `tag` field is now required (inline with the A2A spec).
- ~~Optional fields in Agent2Agent Zod schemas are now nullable for better interoperability.~~ **Nullable Schemas have been reverted.**
- The `EngineBuilder` constructor is now protected and open for extension.
- `AgentBuilder` will now throw an error if it recieves an invalid `FilePart`.
- `createAgent`/`createService` can now take a single string (i.e. agentName) as valid value for the AgentCard and will populate the rest of the required fields with placeholder values (see `src/services/a2a/helpers/agentcard-builder.ts` for reference).
- `createAgentServer` no longer adds `express.json()` to the root of the express server and now uses the utility function `rpcParser` only on the agents `basePath` and has stricter JSON-RPC validation measures.
- `A2AClient` now exposes `mergePath` making it easier to access `AgentCards` that are not exposed at the root.
- `AgentBuilder` now checks for cancellations after each step.
- `createAgent` exposes the `enforceParamValidation` flag which triggers stricter enforcement of `A2ASchemas` (This will be enabled by default in a future release).
- `AgentCardBuilder` now sets the `preferredTransport` field to the default (`JSONRPC`) if none is provided (inline with the A2A spec).
- The default `sendMessage` implementation now supports the `MessageSendConfiguration`.`blocking` toggle.
- The default `sendMessage` and `getTask` implementations now support the `MessageSendConfiguration`.`historyLength` parameter.
- The Express Server now provides support for `AuthenticatedExtendedCard`.

> **Note:** The Official A2A Javascript SDK is now more stable. So over the course of future releases @artinet/sdk will be merging in utilities directly from `@a2a-js/sdk` as a peer-dependancy.

> This will **NOT** change the core architecture or design of @artinet/sdk, but it will make integration with the emerging Agent2Agent ecosystem easier while allowing us to focus on the adoption of additional communication protocols. We aim to complete this migration by v0.6 which will be our first LTS release.

> This will **NOT** require the modification of existing `AgentEngine`'s, the current architecture was designed with this shift in mind and is the reason behind our use of loosely typed Interfaces, MPSC & SPMC queues vs EventBus and the design of the `CoreExecute` contract (onStart, onUpdate, onError, onCancel & onComplete).

> This will mean that the more concrete implementations in `src/services/a2a` will become more generic implementations in `src/services/core`.

## Contributing

Contributions are welcome! Please open an issue or submit a Pull Request on [GitHub](https://github.com/the-artinet-project/artinet-sdk).

Ensure code adheres to the project style and passes linting (`npm run lint`) and tests (`npm test`).

## License

This project is licensed under the Apache License 2.0 - see the `LICENSE` file for details.

## Acknowledgements

This SDK builds upon the concepts and specifications of the [Agent2Agent (A2A) Protocol](https://github.com/google-a2a/A2A).
