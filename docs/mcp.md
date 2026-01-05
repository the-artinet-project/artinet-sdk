# MCP (Model Context Protocol) Integration

The SDK provides a Model Context Protocol (MCP) <-> A2A compatibility layer.

## Creating an MCP Agent

Use `createMCPAgent` to expose your agent via MCP:

```typescript
import { createMCPAgent } from "@artinet/sdk";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { myAgent } from "./my-agent.ts";

// Wrap your agent in an MCP Server
const mcpAgent = createMCPAgent({
  serverInfo: {
    name: "My MCP Agent",
    version: "1.0.0",
  },
  options: {
    // MCP server options
  },
  agent: myAgent,
  agentCardUri: "agent://card", // Customize the URI for your AgentCard
});

// The MCPAgent is a fully compliant MCP Server
mcpAgent.registerTool({
  name: "custom-tool",
  description: "A custom tool",
  // ...
});

await mcpAgent.connect(new StdioServerTransport());
```

## Using an MCP Client

Interact with an mcpAgent:

```typescript
import { Client } from "@modelcontextprotocol/sdk/client/index.js";

// Access the AgentCard as a Resource
const agentCard = await client.readResource({ uri: "agent://card" });

// Or send messages via Tool Calling
const result = await client.callTool({
  name: "send-message",
  arguments: {
    message: {
      parts: [{ kind: "text", text: "Hello from MCP!" }],
    },
  },
});
```

## Available MCP Tools & Resources

| Name           | Type     | Description                    |
| -------------- | -------- | ------------------------------ |
| `send-message` | Tool     | Send messages to the A2A agent |
| `get-task`     | Tool     | Retrieve tasks by ID           |
| `cancel-task`  | Tool     | Cancel a running task          |
| `agent://card` | Resource | Retrieve the AgentCard         |

## Limitations

The following A2A features are not supported by default in MCP:

- `send-streaming-message`
- `task-resubscribe`
- `push-notifications`

_*You can leverage the A2A Zod Schemas to implement more A2A tools.*_

## Installation

Required:

```bash
npm install @modelcontextprotocol/sdk
```
