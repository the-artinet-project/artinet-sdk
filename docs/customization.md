# Advanced Server Customization

Our architecture provides multiple ways to customize your agent server.

## Using createAgentServer

Easily spin up an A2A Express app:

```typescript
import express from "express";
import { createAgentServer } from "@artinet/sdk";

const initialApp = express();

// Custom middleware
initialApp.use((req, res, next) => {
  console.log("Request received:", req.path);
  next();
});

const { app, agent } = createAgentServer({
  app: initialApp,
  agent: {
    engine: myAgent,
    agentCard: "Custom Agent",
  },
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
import { createAgentRouter } from "@artinet/sdk";

const agentRouter = createAgentRouter();
```

## Direct Agent Invocation

Directly invoke the agent to use it locally:

```typescript
import { createAgent } from "@artinet/sdk";

const agent = createAgent({
  engine: myAgentLogic,
  agentCard: {
    name: "Local Agent",
    // ...
  },
});

// Wrap these calls in your desired transport logic
const result = await agent.sendMessage("Hello");

// Directly process streams
const stream = agent.streamMessage({
  message: { parts: [{ kind: "text", text: "Stream this" }] },
  ...
});

for await (const update of stream) {
  console.log(update);
}
```

## Custom Implementation Checklist

When using custom implementations, ensure you handle:

- [ ] Server-Sent Events (SSE) for `message/stream` and `tasks/resubscribe`
- [ ] Agent card endpoints at `/.well-known/agent-card.json`
- [ ] Proper error handling and JSON-RPC compliance
- [ ] CORS headers if needed for web clients

