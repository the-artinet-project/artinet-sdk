# Advanced Server Customization

Our architecture provides multiple ways to customize your agent.

## Using cr8 with Custom Parameters

The `cr8` builder accepts optional parameters for server configuration:

```typescript
import { cr8 } from "@artinet/sdk";

const { app } = cr8("Custom Agent", {
  basePath: "/a2a",
  agentCardPath: "/.well-known/agent-card.json",
}).text("Hello from custom agent!").server;

// Add custom middleware
app.use((req, res, next) => {
  console.log("Request received:", req.path);
  next();
});

// Add custom endpoints
app.get("/health", (req, res) => {
  res.json({ status: "healthy" });
});

app.listen(3000);
```

## Native

The _`@artinet/sdk`_ provides tools for integrating with the `@a2a-js/sdk`, so you can use your agents anywhere.

### `A2ARequestHandler` Support

You can convert any _`@artinet/sdk`_ agent into an `@a2a-js/sdk` compatible `RequestHandler` using `native`.

_Below is an example of how the `@artinet/sdk` creates JSONRPC Express Servers internally_

```typescript
import { cr8, native, Agent } from "@artinet/sdk";
import { jsonRpcHandler } from "@a2a-js/sdk/server/express";
import type { A2ARequestHandler } from "@a2a-js/sdk/server";
import express, { RequestHandler } from "express";

// Create an `Agent`
const agent: Agent = cr8("Test Agent").text("Hello World").agent;

// Convert it into an `A2ARequestHandler`
const nativeHandler: A2ARequestHandler = native(agent);

// Use it with `@a2a-js/sdk`
const rpcHandler: RequestHandler = jsonRpcHandler({
  requestHandler: nativeHandler,
});
```

- `native` provides a comprehensive compatibility layer with robust support for push notifications.

### `TaskStore` -> `Tasks`

Transform a `TaskStore` from the `@a2a-js/sdk` into an _`@artinet/sdk`_ `ResourceManager` with the `tasks` utility:

```typescript
import { cr8, tasks, Agent } from "@artinet/sdk";
import { TaskStore, InMemoryTaskStore } from "@a2a-js/sdk/server";

const nativeStore: TaskStore = new InMemoryTaskStore();

const agent: Agent = cr8("Native Agent", {
  tasks: tasks(nativeStore),
}).text("artinet compliant").agent;
```

- `tasks` upgrades `TaskStore` with additional methods (`get`,`set`,`delete`,`has`, `create`, `update`).

> Additional methods coming soon with caching.

## Using Custom Transport Layers

Use our preconfigured tRPC router, or create your own integration:

```typescript
import { createAgentRouter } from "@artinet/sdk/trpc";

const agentRouter = createAgentRouter();
```

## Using `AgentEngine`s Directly

Access and use the `AgentEngine` separately from an `Agent`:

```typescript
import { cr8, AgentEngine } from "@artinet/sdk";

// Build your workflow
const builder = cr8("MyAgent").text("Step 1").data({ processed: true });

// Get just the engine
const engine: AgentEngine = builder.engine;
```

Create an `Agent` with a custom `AgentEngine`:

```typescript
import { cr8, describe } from "@artinet/sdk";

const custom = cr8("Custom Agent").from(async function* (context: A2A.Context) {
  yield describe.message("Hello User!");
});
```

Or a custom server:

```typescript
cr8("Custom Server")
  .serve(async function* (context: A2A.Context) {
    yield describe.message(
      `Hello Remote User! ${context.userMessage?.parts[0]?.text}`
    );
  })
  .start(3000);
```

## Serverless Deployment

Deploy your agents to serverless environments like AWS Lambda using the `createServerlessHandler` factory.

### Required

```bash
npm install serverless-http
```

### Basic Usage

```typescript
import { Handler } from "aws-lambda";
import { cr8 } from "@artinet/sdk";
import { createServerlessHandler } from "@artinet/sdk/serverless";

const agent = cr8("Serverless Agent")
  .text(({ content }) => `You said: ${content}`)
  .agent;

export const handler: Handler = createServerlessHandler(
  { agent, basePath: "/a2a" },
  { provider: "aws" }
);
```

> Streaming capabilities are not supported in serverless-http handlers.

### Supported Providers

The serverless handler supports multiple cloud providers via [serverless-http](https://github.com/dougmoscrop/serverless-http):

| Provider         | Value       |
| ---------------- | ----------- |
| AWS Lambda       | `"aws"`     |
| Azure Functions  | `"azure"`   |