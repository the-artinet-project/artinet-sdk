[![npm version](https://img.shields.io/npm/v/@artinet/sdk.svg)](https://www.npmjs.com/package/@artinet/sdk)
[![npm downloads](https://img.shields.io/npm/dt/@artinet/sdk.svg)](https://www.npmjs.com/package/@artinet/sdk)
[![Apache License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](LICENSE)
[![Known Vulnerabilities](https://snyk.io/test/npm/@artinet/sdk/badge.svg)](https://snyk.io/test/npm/@artinet/sdk)

<!-- [![Coverage Status](https://coveralls.io/repos/github/the-artinet-project/artinet-sdk/badge.svg?branch=main)](https://coveralls.io/github/the-artinet-project/artinet-sdk?branch=main) -->

# artinet SDK

The artinet SDK is a TypeScript library designed for Agentic Communication. It's written for [node.js](https://nodejs.org/) and aims to simplify the creation of interoperable AI agents. Learn more at [the artinet project](https://artinet.io/).

This SDK leverages a service-oriented architecture for building AI agents allowing developers to easily create agents as simple processes or seamlessly embed them within a dedicated server.

### Quick Start

To build your own agent/server use the [`create-quick-agent`](https://www.npmjs.com/package/@artinet/create-quick-agent) (supports v0.5.2) command:

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
        - [AgentBuilder](#agentbuilder)
        - [AgentEngine](#agentengine)
      - [Event Handling/Monitoring \& Message Streaming](#event-handlingmonitoring--message-streaming)
      - [Persistent Storage](#persistent-storage)
      - [Logging](#logging)
      - [Server Registration \& Discovery (v0.5.2)](#server-registration--discovery-v052)
      - [Advanced Server Customization](#advanced-server-customization)
      - [Cross Protocol Support](#cross-protocol-support)
    - [Quick-Agents (Alpha v0.5.2)](#quick-agents-alpha-v052)
  - [Contributing](#contributing)
  - [License](#license)
  - [Acknowledgements](#acknowledgements)

## Features

- **Service-Oriented Architecture:** Modern, modular design with a dedicated layer for protocol handling and state management.
- **Modern Express Server:** Quickly create an Express Server with the `createAgentServer()` function. It handles all of the transport-layer complexity, adds an A2A <-> JSON-RPC middleware, and manages Server-Sent Events (SSE) automatically.
- **TypeScript First:** Written in TypeScript with a fully implemented Zod <-> A2A schema.
- **Protocol Compliance:** Implements the complete A2A specification (v0.3.0) with support for any kind of transport layer (Express, tRPC, WebSockets, etc).
- **Code Deployment:** Bundle, test, and deploy agent code onto the artinet via the `./deployment` module (v0.5.3). Includes bundler, agent handler, and deployment utilities.

| Component/Feature    | Description                                                                 | Key Classes/Types                                                                                    |
| :------------------- | :-------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------- |
| **Client**           | Interact with A2A-compliant agents. Supports standard & streaming requests. | `A2AClient`                                                                                          |
| **Server**           | Quickly spin up an Agent as a Server.                                       | `createAgentServer`, `ExpressAgentServer`, `jsonRPCMiddleware`                                       |
| **Agent Creation**   | Design agents with the Agent Builder or take control with the Agent Engine. | `AgentEngine`, `Context`, `AgentBuilder`                                                             |
| **Storage**          | Persist event state. In-memory and file-based options included.             | `Store`, `InMemoryTaskStore`, `FileStore`                                                            |
| **Streaming (SSE)**  | Handle real-time updates via Server-Sent Events with middleware support.    | Built-in SSE handling, streaming generators                                                          |
| **Event Handling**   | Monitor agent execution with our event system.                              | `EventManager`, `eventOverrides`, Event listeners (`start`, `update`, `error`, `complete`, `cancel`) |
| **Logging**          | Configure structured logging for debugging and monitoring.                  | `logger`, `configureLogger`, `LogLevel`                                                              |
| **Transport Layers** | Built-in support for Express/TRPC.                                          | Express middleware, tRPC router, or easily create your own.                                          |
| **Core Types**       | Fully implement A2A schema in Zod.                                          | `AgentCard`, `Task`, `Message`, `Part`, `Artifact`, etc.                                             |
| **Deployment**       | Bundle, test, and deploy agents onto the artinet platform (v0.5.2).         | `@artinet/sdk/deployment`, `fullDeployment`, `testDeployment`, `bundle`                              |
| **Agent Utilities**  | Run agents in managed environments with our proxy system.                   | `artinet.v0.taskManager`, `artinet.v0.connect`, `artinet.v0.agent`                                   |

## Installation

```bash
npm install @artinet/sdk
```

## Requirements

- Node.js (v22.0.0 or higher recommended)

## Documentation

For more detailed documentation visit our documentation site [here](https://the-artinet-project.github.io/artinet-documentation/).

## Example

A basic A2A server and client interaction (For simple agents see the [AgentBuilder](#agentbuilder) section). For more detailed examples, see the `examples/` directory.

**1. Server (`quick-server.ts`)**

```typescript
import {
  createAgentServer,
  ExecutionContext,
  AgentEngine,
  TaskManager,
  MessageSendParams,
  getParts,
} from "@artinet/sdk";

//Define your Agents Behaviour
const quickAgentLogic: AgentEngine = async function* (context: Context) {
  const params: MessageSendParams = context.command; //MessageSendParams
  const { text: userInput} = getParts(params.message.parts); //helper function to consume parts
  const task = context.State(); //TaskAndHistory
  yield {
      ...
      state: "working"
      ...
    };

  yield {
    ...
    state: "completed",
    message: {
      role: "agent",
      parts: [{ kind: "text", text: `You said: ${userInput}` }],
    },
    ...
  };
};

// Create an agent server
const { app, agent } = createAgentServer({
  agent: {
    engine: quickAgentLogic,
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
  agentCardPath: "/.well-known/agent.json"
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

The SDK provides a variety of options for creating complex ([AgentEngine](#agentengine)) or simple agents ([AgentBuilder](#agentbuilder)).

##### AgentBuilder

**Option 1: Using AgentBuilder (Recommended for Simple Workflows)**

For simple agents with one or more processing steps, use the `AgentBuilder` pattern:

```typescript
import { createAgentServer, AgentBuilder, TaskManager } from "@artinet/sdk";

//create a simple agent
const simpleAgent = AgentBuilder().text(() => "hello world!");

//or design a powerful workflow
const { app, agent } = createAgentServer({
  agent: AgentBuilder()
    .text(({ command, context }) => {
      const userMessage =
        command.message.parts[0]?.kind === "text"
          ? command.message.parts[0].text
          : "";
      return {
        parts: [`Processing: ${userMessage}`], //parts are immediately sent back to the caller as TaskStatusUpdateEvents
        args: [userMessage], //args are passed to the next step
      };
    })
    .file(({ command, args }) => {
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
    .text(({ command, args }) => {
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
- **Different content types**: Mix text, file, and data processing in a single workflow
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
  const task: TaskAndHistory = context.events.getState();
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
    //or process them asynchronously
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

#### Logging

Use the built-in `pino`-based logger. Configure with `configureLogger`.

```typescript
import { logger, configureLogger, LogLevel, logDebug } from "@artinet/sdk";

// Configure logging level (optional)
configureLogger({ level: "debug" });

logger.info("Server starting...");
//use helper functions
logDebug("LoggerTest", { taskId: "task-123" }, "Task status updated.");

// Create child loggers with bounded contexts
const taskLogger = logger.child({ taskId: "abc" });
taskLogger.info("Processing step X");
```

#### Server Registration & Discovery (v0.5.2)

The SDK includes features to help make your agent discoverable using the new service-based architecture:

- **Automatic Registration:** You can configure your agent server to automatically register your `AgentCard` with the [A2A Registry](https://artinet.io) upon startup by setting `register: true` in the server parameters (temporarily unavailable in v0.5.6).

```typescript
const { app, agent } = createAgentServer({
  agent: {
    engine: myAgent,
    agentCard: {
      // ...
      url: "http://my-public-domain:3000/my-agent", // Publicly accessible URL
      // ...
    },
  },
});
```

- **Custom Agent Card Path:** By default, the server exposes its `AgentCard` at `/.well-known/agent-card.json` following [RFC8615](https://datatracker.ietf.org/doc/html/rfc8615). You can specify a custom path using the `agentCardPath` option.

```typescript
const { app, agent } = createAgentServer({
  ...
  basePath: "/apiV2",
  agentCardPath: "/apiV2/custom-card-info", // Custom agent card path
});
// The AgentCard is now accessible at http://localhost:3000/apiV2/custom-card-info
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

// custom middleware
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

### Quick-Agents (Alpha v0.5.2)

We are excited to introduce new capabilities for deploying agents directly onto the artinet.

We've added a `testDeployment` utility which is available for all users letting you bundle and test your agent logic in a temporary sandboxed environment.

**QUICK-AGENTS** Use the `fullDeployment` utility, which allows direct deployment of your bundled agent code and `AgentCard` to the Artinet platform (requires an `ARTINET_API_KEY`).

To join the beta waitlist, please email us at humans@artinet.io and stay tuned for more updates!

Key features include:

- **Easy Agent Bundling:** Bundle your agent's code and dependencies into a single file using the `bundle` utility from the new deployment export.

  ```typescript
  import { bundle } from "@artinet/sdk/deployment";

  const bundledCode = await bundle(new URL("./your-agent.ts", import.meta.url));
  ```

- **Sandboxed Enviroments:** Streamline agent logic for quick and easy deployments. The new `artinet.v0` namespace (accessible via `@artinet/sdk/agents`) provides `taskManager`, `connect`, and `agent`.

  - `artinet.v0.taskManager`: Manages the agent's lifecycle by iterating over the agent's `TaskHandler` and communicating updates to the host environment.
  - `artinet.v0.connect`: Replaces the deprecated `fetchResponseProxy`. Allows agents to make proxied calls to other agents or LLMs via the host environment.
  - `artinet.v0.agent`: A factory function to obtain a `ClientProxy` for type-safe communication with other agents, managed by the host environment.

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

  _Note: The `taskHandlerProxy` and `fetchResponseProxy` utilities are now deprecated in favor of `artinet.v0.taskManager` and `artinet.v0.connect` respectively._

- **Test-Agents (Experimental):** Simulate and test your agents @ agents.artinet.io/test/deploy using the `testDeployment` tool.

  ```typescript
  import {
    testDeployment,
    ServerDeploymentRequestParams,
    SendTaskRequest,
  } from "@artinet/sdk/deployment";

  const deploymentParams: ServerDeploymentRequestParams = {
    code: "/* bundled code string */",
  };
  //create a list of tasks for your agent to complete once deployed
  const testRequests: SendTaskRequest[] = [
    {
      id: "t1",
      message: { role: "user", parts: [{ type: "text", text: "Hi!" }] },
    },
  ];

  for await (const result of testDeployment(deploymentParams, testRequests)) {
    console.log(result); //process the task completion requests as they come in to confirm your agents logic
  }
  ```

- **Full Deployment (Experimental):** Deploy your agent to the Artinet platform using the `fullDeployment` utility.

  ```typescript
  import {
    fullDeployment,
    ServerDeploymentRequestParams,
  } from "@artinet/sdk/deployment";

  const deploymentParams: ServerDeploymentRequestParams = {
    name: "My Awesome Agent",
    agentCard: {
      /* your agent card */
    },
    code: "/* bundled code string */",
  };

  const deploymentResult = await fullDeployment(deploymentParams); // Requires an ARTINET_API_KEY environment variable
  console.log("Deployment Result:", deploymentResult);
  ```

- **Dedicated Endpoints:** Once deployed your agent will be available On-Demand at its dedicated enpoint. (e.g. "https://agents.artinet.io/agentId=0xabf698845743538727a81352bfcfdb724e5c2bbe3113a26362482248f9f3e5fa/.well-known/agent-card.json")
- **New Types:** To support these features, new types for server deployment requests and responses (such as `ServerDeploymentRequestParams`, `ServerDeploymentResponse`) have been added to `src/types/extended-schema.ts`. New types for sandboxed agent interactions (`TaskProxy`, `ConnectAPICallback`, `ClientProxy`, etc.) are in `src/types/proxy.ts`.

**QUICK-AGENT FAQs**

- Test-Agents expire after 60s (need more time? let us know @humans@artinet.io)
- Quick-Agents do not have access to a filesystem or networking (limited persistance & networking capabalities are on the project roadmap).
- Quick-Agents v0 does not support streaming, push notifications or state transition history (these capabilities are on the project roadmap).
- Larger deployments can take significant time to deploy which may cause `fullDeployment` to timeout. In such cases wait to see if the listing has been added to your account before trying to deploy again.
- Quick-Agent logic is public, therefore the artinet project is not liable for any sensitive material held within a deployment.
- Available with version 0.5.6+ of the SDK with enhanced deployment capabilities.

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
- [Pino](https://getpino.io/) for logging.
- [EventSource Parser](https://github.com/rexxars/eventsource-parser) for SSE streaming.
