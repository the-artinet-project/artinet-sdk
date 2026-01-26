# MCP (Model Context Protocol) Integration

The SDK provides a Model Context Protocol (MCP) <-> A2A compatibility layer.

## Creating an MCP Agent

Use `createMCPAgent` to expose your agent via MCP:

```typescript
import { createMCPAgent } from '@artinet/sdk';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { myAgent } from './my-agent.ts';

// Wrap your agent in an MCP Server
const mcpAgent = createMCPAgent({
    serverInfo: {
        name: 'My MCP Agent',
        version: '1.0.0',
    },
    options: {
        // MCP server options
    },
    agent: myAgent,
    agentCardUri: 'agent://card', // Customize the URI for your AgentCard
});

// The MCPAgent is a fully compliant MCP Server
mcpAgent.registerTool({
    name: 'custom-tool',
    description: 'A custom tool',
    // ...
});

await mcpAgent.connect(new StdioServerTransport());
```

## Using an MCP Client

Interact with an mcpAgent:

```typescript
import { Client } from '@modelcontextprotocol/sdk/client/index.js';

// Access the AgentCard as a Resource
const agentCard = await client.readResource({ uri: 'agent://card' });

// Or send messages via Tool Calling
const result = await client.callTool({
    name: 'send-message',
    arguments: {
        message: {
            parts: [{ kind: 'text', text: 'Hello from MCP!' }],
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

## In-Memory MCP Servers

Mount MCP servers in-memory for testing, embedding, or direct integration without network overhead.

### Basic Usage

`mountMemServer` dynamically loads MCP Servers On-Demand.

```typescript
import { mountMemServer } from '@artinet/sdk/mcp/mem';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';

// Mount a server from a module
const { server, clientTransport } = await mountMemServer(
    {
        type: 'factory',
        target: 'createServer',
        module: '@modelcontextprotocol/server-everything/dist/everything.js',
    },
    (module) => module.createServer().server,
);

// Connect a client
const client = new Client({ name: 'my-client', version: '1.0.0' });
await client.connect(clientTransport);

// Use MCP features
const tools = await client.listTools();
const result = await client.callTool({ name: 'echo', arguments: { message: 'Hello!' } });

// Cleanup
await client.close();
await server.close();
```

- _The target server must be installed on the System (interested in trying the advanced version with dynamic installation? email us: humans@artinet.io)_

```bash
npm i -D @modelcontextprotocol/server-everything
```

### Configuration Options

| Parameter | Type                           | Description                                    |
| --------- | ------------------------------ | ---------------------------------------------- |
| `type`    | `"factory"` \| `"constructor"` | How to invoke the target export                |
| `target`  | `string`                       | Name of the exported factory function or class |
| `module`  | `string`                       | Module path to dynamically import              |
| `args`    | `Record<string, unknown>`      | Optional arguments for the factory/constructor |

### Custom Extraction

When a module's export structure doesn't match standard patterns, use the `extract` function:

```typescript
const { server, clientTransport } = await mountMemServer(
    { type: 'factory', target: 'createServer', module: './my-server.js' },
    (module) => module.createServer().server, // Custom extraction logic
);
```
