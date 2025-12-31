# Advanced Server Customization

Our architecture provides multiple ways to customize your agent server.

## Using cr8 with Custom Parameters

The `cr8` builder accepts optional parameters for server configuration:

```typescript
import { cr8 } from "@artinet/sdk";

const { app } = cr8("Custom Agent", {
  basePath: "/a2a",
  agentCardPath: "/.well-known/agent-card.json",
  port: 3000,
})
  .text("Hello from custom agent!")
  .server;

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

## Using createAgentServer (deprecated)

For more control, use `createAgentServer` with an existing Express app:

```typescript
import express from "express";
import { createAgentServer, cr8 } from "@artinet/sdk";

const initialApp = express();

// Custom middleware
initialApp.use((req, res, next) => {
  console.log("Request received:", req.path);
  next();
});

const myAgent = cr8("Custom Agent")
  .text("Hello!")
  .agent;

const { app, agent } = createAgentServer({
  app: initialApp,
  agent: myAgent,
  basePath: "/a2a",
});

// More custom middleware
app.use("/custom", (req, res, next) => {
  // Custom endpoint logic
});

app.listen(3000);
```

## Using JSON-RPC Middleware

Directly import our preconfigured JSON-RPC middleware:

```typescript
import express from "express";
import { createAgent, jsonRPCMiddleware, errorHandler } from "@artinet/sdk";

const customApp = express();

const agent = createAgent({
  engine: myAgentLogic,
  agentCard: {
    name: "Custom Agent",
    // ...
  },
});

customApp.use("/auth", yourAuthMiddleware);
customApp.use("/metrics", yourMetricsMiddleware);
customApp.use(express.json());

// Add A2A middleware
customApp.post("/", async (req, res, next) => {
  return await jsonRPCMiddleware(agent, req, res, next);
});

// Don't forget to add error handling
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

## Using Custom Transport Layers

Use our preconfigured tRPC router, or create your own integration:

```typescript
import { createAgentRouter } from "@artinet/sdk/trpc";

const agentRouter = createAgentRouter();
```

## Direct Agent Invocation

Directly invoke the agent to use it locally:

```typescript
import { cr8 } from "@artinet/sdk";

const agent = cr8("Local Agent")
  .text(({ content }) => `Echo: ${content}`)
  .agent;

// Wrap these calls in your desired transport logic
const result = await agent.sendMessage({
  message: { parts: [{ kind: "text", text: "Hello" }] },
});

// Directly process streams
const stream = agent.streamMessage({
  message: { parts: [{ kind: "text", text: "Stream this" }] },
});

for await (const update of stream) {
  console.log(update);
}
```

## Using Engines Directly

Access and use the engine separately from the service:

```typescript
import { cr8 } from "@artinet/sdk";

// Build your workflow
const builder = cr8("MyAgent")
  .text("Step 1")
  .data({ processed: true });

// Get just the engine
const engine = builder.engine;

// Or create a custom service with the engine
const customAgent = builder.from(engine);

// Or create a custom server
const { app } = builder.serve(engine);
```

## Custom Implementation Checklist

When using custom implementations, ensure you handle:

- [ ] Server-Sent Events (SSE) for `message/stream` and `tasks/resubscribe`
- [ ] Agent card endpoints at `/.well-known/agent-card.json`
- [ ] Proper error handling and JSON-RPC compliance
- [ ] CORS headers if needed for web clients
