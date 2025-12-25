# Migration Guide (v0.6.0)

## Breaking Changes

### 1. Peer Dependencies Required

The following packages are now peer dependencies. Install them explicitly:

```bash
npm install @a2a-js/sdk @modelcontextprotocol/sdk @trpc/server
```

### 2. New Configuration API

```typescript
// Before (v0.5.x)
import { configureLogger } from "@artinet/sdk";
configureLogger({ level: "info" });

// After (v0.6.0)
import { configure } from "@artinet/sdk";
import { configurePino } from "@artinet/sdk/pino";
import pino from "pino";

configure({ logger: configurePino(pino({ level: "info" })) });
```

### 3. Types Now Use A2A Namespace

```typescript
// Before (v0.5.x)
import { Task, Message, Context } from "@artinet/sdk";

// After (v0.6.0)
import { A2A } from "@artinet/sdk";
// Use A2A.Task, A2A.Message, A2A.Context
```

## Additional Changes (since v0.5.8)

### Logging

- Pino has been removed and replaced with pluggable logger extensions (`@artinet/sdk/pino`, `@artinet/sdk/winston`, `@artinet/sdk/otel`).

### Streaming

- The default handler for streamMessage no longer automatically emits an initial `submitted` and `working` event.

### Removed Features

- Agent Registration, Bundling and Deployment utils are returning soon.
- `@artinet/metadata-validator` has been removed due to build issues.
- The examples folder will be removed in favor of [`create-agent`](https://github.com/the-artinet-project/create-agent).

### AgentBuilder

- AgentBuilder now returns a unique messageId for each status update instead of the original user provided messageId.
- AgentBuilder now prefers the contextId & taskId from the calling context.
- AgentBuilder now supports `skip()` to conditionally skip workflow steps.
- AgentBuilder now checks for cancellations after each step.
- `AgentBuilder` will now throw an error if it receives an invalid `FilePart`.

### A2AClient

- The `A2AClient` now checks `/.well-known/agent-card.json` as opposed to `/.well-known/agent.json` in-line with the A2A spec.
- The `A2AClient` now uses the `AgentCard`.url if an `AgentCard` has been successfully retrieved, else it will default to the `baseUrl`.
- `A2AClient` now exposes `mergePath` making it easier to access `AgentCards` that are not exposed at the root.
- `getTask` now correctly takes `TaskQueryParams` as an argument vs `TaskIdParams` in accordance with the A2A spec.

### Server

- `createAgentServer` no longer adds `express.json()` to the root of the express server and now uses the utility function `rpcParser` only on the agents `basePath`.
- The Express Server now provides support for `AuthenticatedExtendedCard`.
- `createAgent` now enforces parameter validation.

### Types

- The `history` object from `TaskAndHistory` is deprecated and no longer being updated. Use `Task.history` instead.
- In `Task` the `contextId` field is now required (inline with the A2A spec).
- In `AgentSkill` the `tag` field is now required (inline with the A2A spec).
- The `EngineBuilder` constructor is now protected and open for extension.

### createAgent

- `createAgent`/`createService` can now take a single string (i.e. agentName) as valid value for the AgentCard.
- `AgentCardBuilder` now sets the `preferredTransport` field to the default (`JSONRPC`) if none is provided.
- The default `sendMessage` implementation now supports the `MessageSendConfiguration`.`blocking` toggle.
- The default `sendMessage` and `getTask` implementations now support the `MessageSendConfiguration`.`historyLength` parameter.

## Ecosystem Integration

> **Note:** v0.6.0 marks the beginning of our integration with the official A2A JavaScript SDK (`@a2a-js/sdk`). This enables interoperability with the broader Agent2Agent ecosystem while maintaining the artinet-sdk's unique architecture.

> This will **NOT** require modification of existing `AgentEngine` implementations. The architecture was designed with this shift in mind, using loosely typed interfaces, MPSC & SPMC queues, and the `CoreExecute` contract (onStart, onUpdate, onError, onCancel & onComplete).

> v0.6 is the final preview before our first LTS release.

