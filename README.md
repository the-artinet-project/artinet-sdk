[![Website](https://img.shields.io/badge/website-artinet.io-black)](https://artinet.io/)
[![npm version](https://img.shields.io/npm/v/@artinet/sdk.svg?logoColor=black)](https://www.npmjs.com/package/@artinet/sdk)
[![npm downloads](https://img.shields.io/npm/dt/@artinet/sdk.svg)](https://www.npmjs.com/package/@artinet/sdk)
[![Apache License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](LICENSE)
[![Known Vulnerabilities](https://snyk.io/test/npm/@artinet/sdk/badge.svg)](https://snyk.io/test/npm/@artinet/sdk)
[![GitHub stars](https://img.shields.io/github/stars/the-artinet-project/artinet-sdk?style=social)](https://github.com/the-artinet-project/artinet-sdk/stargazers)
[![Discord](https://dcbadge.limes.pink/api/server/DaxzSchmmX?style=flat)](https://discord.gg/DaxzSchmmX)

<!-- [![Coverage Status](https://coveralls.io/repos/github/the-artinet-project/artinet-sdk/badge.svg?branch=main)](https://coveralls.io/github/the-artinet-project/artinet-sdk?branch=main) -->

# artinet SDK

The artinet SDK is a TypeScript library designed for Agentic Communication. It's written for [node.js](https://nodejs.org/) and aims to simplify the creation of interoperable AI agents. Learn more at [the artinet project](https://artinet.io/).

This SDK leverages a service-oriented architecture for building AI agents allowing developers to easily create agents as simple processes or seamlessly embed them within a dedicated server.

## Quick Start

Use the [`create-agent`](https://www.npmjs.com/package/@artinet/create-agent) command:

```bash
npx @artinet/create-agent@latest
```

It has [serveral template projects](https://github.com/the-artinet-project/create-agent/tree/main/templates) that you can use to jump right into agent building.

## Table of Contents

- [artinet SDK](#artinet-sdk)
  - [Quick Start](#quick-start)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Installation](#installation)
  - [Requirements](#requirements)
  - [Example](#example)
  - [Running Tests](#running-tests)
  - [Usage](#usage)
    - [Client](#client)
      - [Basic Client Usage](#basic-client-usage)
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
  - [Contributing](#contributing)
  - [License](#license)
  - [Acknowledgements](#acknowledgements)

**Breaking Changes in v0.5.8**

- Pino has been removed and replaced with console for better portability and is set to silent by default.
- The default handler for streamMessage no longer automatically emits an initial `submitted` and `working` event.
- Agent Registration, Bundling and Deployment utils have been removed (email us: humans@artinet.io for support).
- `@artinet/metadata-validator` has been removed due to build issues.
- getTask now correctly takes TaskQueryParams as an argument vs TaskIdParams in accordance with the A2A spec.
- AgentBuilder now returns a unique messageId for each status update instead of the original user provided messageId.
- AgentBuilder now prefers the contextId & taskId from the calling context.
- In a future release the following packages will be set as peer dependancies to reduce the size of the build: `@modelcontextprotocol/sdk`, `@trpc/server`, `cors`, `express`
- The `history` object from `TaskAndHistory` is deprecated and no longer being updated. Use `Task.history` instead.
- The A2AClient now checks `/.well-known/agent-card.json` as a opposed to `/.well-known/agent.json` in-line with the A2A spec.

## Features

- **Modular Design:** Everything you need to get started building collaborative agents while remaining flexible enough for advanced configuration.
- **Express Style Agent API:** Similar to scaffolding an Express Server, you can use the AgentBuilder to create an Agent2Agent API.
  - Then wrap it in an actual Express Server with the `createAgentServer()` function. It handles all of the transport-layer complexity, adds A2A <-> JSON-RPC middleware, and manages Server-Sent Events (SSE) automatically.
- **Protocol Compliance:** Implements the complete A2A specification (v0.3.0) with support for any kind of transport layer (tRPC, WebSockets, etc).

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
  TaskandHistory
} from "@artinet/sdk";

//Define your Agents Behaviour
const quickAgentEngine: AgentEngine = AgentBuilder()
  .text(async ({ content: userInput, context }) => {
    const task: TaskandHistory = context.State();
    ...
    return `You said: ${userInput}`;
  })
  .createAgentEngine();

// Create an agent server
const { app, agent } = createAgentServer({
  agent: {
    engine: quickAgentEngine,
    agentCard: {
      name: "QuickStart Agent",
      url: "http://localhost:4000/a2a",
      version: "0.1.0",
      capabilities: { streaming: true },
      skills: [{ id: "echo", name: "Echo Skill" }],
      ...
    },
    tasks: new TaskManager(),
    ...
  },
  basePath: "/a2a",
  agentCardPath: "/.well-known/agent-card.json"
  ...
});

app.listen(4000, () => {
  console.log("A2A Server running at http://localhost:4000/a2a");
});
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
    parts: [{ kind: "text", text: "Hello World!" }],
    ...
  };

  const stream = client.sendStreamingMessage({ message });

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
import { A2AClient, Message } from "@artinet/sdk";

async function runBasicTask() {
  const client = new A2AClient("https://your-a2a-server.com/a2a");
  const message: Message = {
    messageId: "test-message",
    kind: "message",
    role: "user",
    parts: [{ kind: "text", text: "What is the capital of France?" }],
    ...
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
    parts: [{ kind: "text", text: "Tell me a short story." }],
    ...
  };

  const stream = client.sendStreamingMessage({
    message,
  });

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

**Option 1: Using the AgentBuilder (Recommended for Simple Workflows)**

For simple agents with one or more processing steps, use the `AgentBuilder` pattern:

```typescript
import { createAgentServer, AgentBuilder, TaskManager } from "@artinet/sdk";

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
      agentCard: {
        name: "Multi-Step Agent",
        url: "http://localhost:3000/a2a",
        version: "1.0.0",
        capabilities: { streaming: true },
        skills: [{ id: "multi-processor", name: "Multi-Step Processor" }],
      },
      tasks: new TaskManager(),
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
  TaskManager,
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
    tasks: new TaskManager(),
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
  agentCard: {
    name: "Event-Monitored Agent",
    url: "http://localhost:3000/a2a",
    version: "1.0.0",
    capabilities: { streaming: true },
    skills: [{ id: "monitor", name: "Monitored Agent" }],
  },
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

const result = await agent.sendMessage({
  contextId: "123"
  ...
});

const currentContext = customContextManager.getContext("123");

//subscribe to the events from a specific context
currentContext.events.on("complete", () {
  ...
  //errors thrown here will be triggered in the original context
});

//stream new commands into a running context
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

For storage, use our out of the box storage providers like `FileStore`. Or implement the `Store` interface to create your own.

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

Our new architecture provides multiple ways to customize your agent server:

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

**2. Use the JSON-RPC Middleware:**
Directly import our preconfigured JSON-RPC middleware:

```typescript
import express from "express";
import { createAgent, jsonRPCMiddleware, errorHandler, InMemoryTaskStore } from "@artinet/sdk";

const customApp = express();

const agent = createAgent({
  engine: myAgentLogic,
  agentCard: {
    ...
  },
  tasks: new InMemoryTaskStore(),
});

customApp.use("/auth", yourAuthMiddleware);
customApp.use("/metrics", yourMetricsMiddleware);
customApp.use(express.json());

// Add the A2A middleware
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
  tasks: new InMemoryTaskStore(),
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
    agentCard: {
      name: "My Agent",
      url: "http://localhost:3000/a2a",
      version: "1.0.0",
      capabilities: { streaming: true },
      skills: [{ id: "helper", name: "Helper Agent" }],
    },
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
  - Leverage the A2A Zod Schemas to implement them manually.

## Contributing

Contributions are welcome! Please open an issue or submit a Pull Request on [GitHub](https://github.com/the-artinet-project/artinet-sdk).

Ensure code adheres to the project style and passes linting (`npm run lint`) and tests (`npm test`).

## License

This project is licensed under the Apache License 2.0 - see the `LICENSE` file for details.

## Acknowledgements

This SDK builds upon the concepts and specifications of the [Agent2Agent (A2A) Protocol](https://github.com/google-a2a/A2A).

Libraries used include:

- [Express.js](https://expressjs.com/) for the server framework.
- [EventSource Parser](https://github.com/rexxars/eventsource-parser) for SSE streaming.
