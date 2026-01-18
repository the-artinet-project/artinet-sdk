<p align="center">
<a href="https://artinet.io"><img src="https://img.shields.io/badge/website-artinet.io-black" alt="Website"></a>
<a href="https://www.npmjs.com/package/@artinet/sdk"><img src="https://img.shields.io/npm/v/@artinet/sdk?color=black" alt="Version"></a>
<a href="https://www.npmjs.com/package/@artinet/sdk"><img src="https://img.shields.io/npm/dt/@artinet/sdk?color=black" alt="Downloads"></a>
<a><img src="https://img.shields.io/badge/License-Apache_2.0-black.svg" alt="License"></a>
<a href="https://reddit.com/r/theartinet"><img src="https://img.shields.io/reddit/subreddit-subscribers/theartinet?label=reddit&style=flat&color=black" alt="Subreddit"></a>
<a><img src="https://img.shields.io/github/stars/the-artinet-project/artinet-sdk?style=social&color=black" alt="Github"></a>
<a href="https://snyk.io/test/npm/@artinet/sdk"><img src="https://snyk.io/test/npm/@artinet/sdk/badge.svg" alt="Known Vulnerabilities"></a>
</p>

<h1 align="center"><em>artinet-sdk</em></h1>

Create agents that communicate across frameworks.

The <em><u>@artinet/sdk</u></em> is a universal, robust and production ready <code>AgentExecutor</code> library that adds a standardized, interoperable communication layer to any agent.

> Runs on the <a href="https://github.com/google-a2a/A2A">Agent2Agent (A2A) Protocol</a> from the <a href="https://aaif.io/">Agentic AI Foundation</a>.

## Installation

```bash
npm install @artinet/sdk express @a2a-js/sdk @modelcontextprotocol/sdk
```

## Features

- **Hassle Free:** Use [**`cr8`**](./docs/create.md) to quickly spin-up an A2A compatible agent.
- **No Vendor Lock-In:** Let your agents communicate with other agents no matter the framework and across ecosystems.
- **Flexible Design:** Everything you need to build collaborative agents while remaining modular enough for advanced configuration.
- **Pluggable Observability:** Bring your own logger ([Pino](https://www.npmjs.com/package/pino), [Winston](https://www.npmjs.com/package/winston)) and/or tracer ([OpenTelemetry](https://www.npmjs.com/package/@opentelemetry/sdk-node)).
- **Persistent Storage:** Roll your own `Task` storage or use our built-in [`SQLiteStore`](./docs/storage.md#sqlite-store) (backed by [`drizzle-orm`](https://www.npmjs.com/package/drizzle-orm)).

## Quick Start

**Use the [`create-agent`](https://www.npmjs.com/package/@artinet/create-agent) command:**

```bash
npx @artinet/create-agent@latest
```

It has [several template projects](https://github.com/the-artinet-project/artinet/tree/main/create-agent) to jump right into agent building.

```bash
npm install easy-a2a
```

## Examples

**Create an A2A Server**

Turn your agent into an express server so it can receive messages from anywhere:

```typescript
import { cr8 } from "@artinet/sdk";

cr8("QuickStart Agent")
  .text(async ({ content }) => `The user said: ${content}`)
  //starts an express a2a server on port 3000
  .server.start(3000);
```

- _ensure that the url/path of your AgentCard matches the server._

> 🚧 Coming Soon: Support for Hono.

**No Servers Needed**

Embed agents directly into your app:

```typescript
import { cr8, A2A } from "@artinet/sdk";

const agent = cr8("Local Agent").text(
  ({ content }) => `The user said: ${content}`
).agent;

const response: A2A.Task | A2A.Message = await agent.sendMessage("Hello");
```

- _See [**`cr8`**](./docs/create.md) for more information_

**Connect to Remote Agents**

[`AgentMessenger`](./docs/messenger.md#agentmessenger) provides a streamlined `Client` interface for communicating with remote A2A Servers:

```typescript
import { AgentMessenger, createMessenger } from "@artinet/sdk";

const messenger: AgentMessenger = await createMessenger({
  baseUrl: "http://localhost:3000/a2a",
  headers: {
    Bearer: "xxxx",
  },
});

const stream = messenger.sendMessageStream("Hello World!");

for await (const update of stream) {
  console.log(update);
}
```

- _See [**messenger**](./docs/messenger.md#agentmessenger) for more information._

**Simple Multi-Agent Orchestration**

[**`cr8`**](./docs/create.md#agent-orchestration) provides easy to use tools for orchestrating multiple agents:

```typescript
import { cr8 } from "@artinet/sdk";
import { localAgent } from "./local.ts";
import { remoteAgentMessenger as remoteAgent } from "./remote.ts";

const orchestrator = cr8("Director")
  .text("Request Received")
  .sendMessage({ agent: localAgent, message: "initiate billing" })
  .text("Billing Started")
  .sendMessage({ agent: remoteAgent, message: "Retrieve Secrets" }).agent;
```

> _For more robust multi-agent support, checkout [**orc8**](https://github.com/the-artinet-project/artinet), our dynamic agent orchestration library that can be used with any openai compatible API._

## Documentation

| Topic                                      | Description                                           |
| ------------------------------------------ | ----------------------------------------------------- |
| [**Agent Creation**](docs/create.md)       | Scaffolding agents with `cr8`                         |
| [**API Reference**](docs/api-reference.md) | Complete reference of SDK objects, types, and methods |
| [**Execution**](docs/execution.md)         | Subscriptions and custom event handlers               |
| [**Messenger**](docs/messenger.md)         | `Messenger` methods, streaming, browser support       |
| [**Storage**](docs/storage.md)             | `FileStore`, `SQLiteStore`, custom storage backends   |
| [**Configuration**](docs/configuration.md) | Logging (Pino, Winston) and OpenTelemetry setup       |
| [**Customization**](docs/customization.md) | `native`, tRPC, and `AgentEngine`s                    |
| [**MCP Integration**](docs/mcp.md)         | Model Context Protocol compatibility                  |
| [**Migration Guide**](docs/migration.md)   | Upgrading from v0.5.x to v0.6.0                       |

## Requirements

- [Node.js](https://nodejs.org/en/download) ≥ 18.9.1 (Recommended: 20 or ≥ 22)

## Running Tests

```bash
npm test
```

## Contributing

Contributions are welcome! Please open an issue or submit a Pull Request on [GitHub](https://github.com/the-artinet-project/artinet-sdk).

Ensure code adheres to the project style and passes linting (`npm run lint`) and tests (`npm test`).

## License

This project is licensed under Apache License 2.0.

See the [`LICENSE`](./LICENSE) for details.

## Join the Community

- **Reddit:** [r/theartinet](https://www.reddit.com/r/theartinet/)
- **Discord:** [the artinet channel](https://discord.gg/DaxzSchmmX)
