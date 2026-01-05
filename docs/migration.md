# Migration Guide (v0.6.0)

### Peer Dependencies Required

The following packages are now peer dependencies. Install them explicitly:

```bash
npm install @a2a-js/sdk @modelcontextprotocol/sdk express
```

### New Configuration API

```typescript
// Before (v0.5.x)
import { configureLogger } from "@artinet/sdk";
configureLogger({ level: "info" });

// After (v0.6.0)
import { applyDefaults } from "@artinet/sdk";

applyDefaults();
```

- See [configuration](./configuration.md) for more options (Pino/Winston/Otel).

### Types Now Use A2A Namespace

```typescript
// Before (v0.5.x)
import { Task, Message, Context } from "@artinet/sdk";

// After (v0.6.0)
import { A2A } from "@artinet/sdk";
// Use A2A.Task, A2A.Message, A2A.Context
```

- See [api-reference](./api-reference.md) for details.

### Logging

- Logging utilities have been restored via pluggable logger extensions (`@artinet/sdk/pino`, `@artinet/sdk/winston`, `@artinet/sdk/otel`).

### AgentBuilder -> cr8

- **New `cr8` tool**: The recommended way to build agents is now `cr8` instead of `AgentBuilder`.
- New step types: `message`, `artifact`, `status`, `task`, `sendMessage`.
- New builder properties: `agent`, `engine`, `server` (no more need for `createAgent`).
- Agent orchestration via `sendMessage` for multi-agent workflows.

#### Migration Example

```typescript
// Before (v0.5.x)
import { AgentBuilder, createAgentServer } from "@artinet/sdk";

const { app } = createAgentServer({
  agent: AgentBuilder()
    .text(() => "Hello!")
    .createAgent({ agentCard: "MyAgent" }),
  basePath: "/a2a",
});

// After (v0.6.0)
import { cr8 } from "@artinet/sdk";

const { app } = cr8("MyAgent", { basePath: "/a2a" }).text("Hello!").server;
```

- For a detailed breakdown of all the new capabilities see [create](./create.md).

### A2AClient -> AgentMessenger

- **New `AgentMessenger` Class**: The recommended way to connect to remote agents is now `AgentMessenger` instead of `A2AClient`.
- `AgentMessenger` is now backed by the `a2a-js/sdk` `ClientFactory` and provides an easy to use & familiar interface for scaffolding A2A compliant clients via the `createMessenger` method.

#### Migration Example

```typescript
// Before (v0.5.x)
import { A2AClient } from "@artinet/sdk";

const client = A2AClient("https://example.com");

// After (v0.6.0)
import { createMessenger } from "@artinet/sdk";

const messenger = createMessenger({ baseUrl: "https://example.com" });
```

- See [messenger](./messenger.md) for more details.

## New Features in v0.6.0

### `describe`

The new `describe` namespace provides utilities for creating A2A objects:

```typescript
import { describe } from "@artinet/sdk";

const card = describe.card({ name: "MyAgent" });
const message = describe.message("Hello!");
const task = describe.task({ id: "123", contextId: "456" });
const artifact = describe.artifact({ artifactId: "abc", parts: [] });
const submitted = describe.update.submitted({
  taskId: "123",
  contextId: "456",
});
```

## `@a2a-js/sdk` compatibility

In v0.6 we've fully adopted the `a2a-js/sdk` at the transport layer for both `Server`s and `Client`s (`AgentMessenger`). Meaning _`@artinet/sdk`_ servers will always be fully compliant with the A2A specification as it evolves!

- `PushNotifications` are now supported by the `@artinet/sdk`.
- See [native](./customization.md#native) for more details.

> **Note:** v0.6.0 marks the beginning of our integration with the official A2A JavaScript SDK (`@a2a-js/sdk`). This enables interoperability with the broader Agent2Agent ecosystem while maintaining the artinet-sdk's unique architecture.
