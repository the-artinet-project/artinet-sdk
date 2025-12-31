[![Website](https://img.shields.io/badge/website-artinet.io-black)](https://artinet.io/)
[![npm version](https://img.shields.io/npm/v/@artinet/sdk.svg?logoColor=black)](https://www.npmjs.com/package/@artinet/sdk)
[![npm downloads](https://img.shields.io/npm/dt/@artinet/sdk.svg)](https://www.npmjs.com/package/@artinet/sdk)
[![Apache License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](LICENSE)
[![Known Vulnerabilities](https://snyk.io/test/npm/@artinet/sdk/badge.svg)](https://snyk.io/test/npm/@artinet/sdk)
[![GitHub stars](https://img.shields.io/github/stars/the-artinet-project/artinet-sdk?style=social)](https://github.com/the-artinet-project/artinet-sdk/stargazers)
[![Discord](https://dcbadge.limes.pink/api/server/DaxzSchmmX?style=flat)](https://discord.gg/DaxzSchmmX)

# artinet-sdk

Create agents that communicate across frameworks.

The artinet-sdk is a TypeScript library that adds a standardized, interoperable communication layer to your agents using the [Agent2Agent (A2A) Protocol](https://github.com/google-a2a/A2A).

## Features

- **Hassle Free:** Use the AgentBuilder to quickly setup an AgentServer.
- **No Vendor Lock-In:** Let your agents communicate with other agents across frameworks and ecosystems.
- **Flexible Design:** Everything you need to build collaborative agents while remaining modular enough for advanced configuration.
- **Pluggable Observability:** Bring your own logger (Pino, Winston) and tracer (OpenTelemetry) with zero-config defaults.

## Quick Start

**Use the [`create-agent`](https://www.npmjs.com/package/@artinet/create-agent) command:**

```bash
npx @artinet/create-agent@latest
```

It has [several template projects](https://github.com/the-artinet-project/create-agent/tree/main/templates) to jump right into agent building.

**Or use [`easy-a2a`](https://github.com/the-artinet-project/easy-a2a):**

```typescript
const agent = a2a({
  baseURL: "https://your-api.com/api/v1",
  apiKey: "your-api-key",
})
  .ai("You are a helpful assistant.")
  .createAgent({
    agentCard: "MyAgent",
  });
```

```bash
npm install easy-a2a
```

## Installation

```bash
npm install @artinet/sdk
```

**Peer dependencies (required):**

```bash
npm install @a2a-js/sdk @modelcontextprotocol/sdk @trpc/server
```

## Requirements

- [Node.js](https://nodejs.org/en/download) ≥ 18.9.1 (Recommended: 20 or ≥ 22)

## Example

**Server:**

```typescript
import { createAgentServer, AgentBuilder } from "@artinet/sdk";

const { app } = createAgentServer({
  agent: AgentBuilder()
    .text(async ({ content }) => {
      return `You said: ${content}`;
    })
    .createAgent({
      agentCard: "QuickStart Agent",
    }),
  basePath: "/a2a",
});

app.listen(3000, () => {
  console.log("A2A Server running at http://localhost:3000/a2a");
});
```

**Client:**

```typescript
import { A2AClient } from "@artinet/sdk";

const client = new A2AClient("http://localhost:3000/a2a");

const stream = client.sendStreamingMessage("Hello World!");

for await (const update of stream) {
  console.log(update);
}
```

## Documentation

| Topic                                       | Description                                           |
| ------------------------------------------- | ----------------------------------------------------- |
| [**API Reference**](docs/api-reference.md)  | Complete reference of SDK objects, types, and methods |
| [**Configuration**](docs/configuration.md)  | Logging (Pino, Winston) and OpenTelemetry setup       |
| [**Client Usage**](docs/client.md)          | A2AClient methods, streaming, browser support         |
| [**Server Implementation**](docs/server.md) | AgentBuilder, AgentEngine, and AgentCard              |
| [**Event Handling**](docs/events.md)        | Event subscriptions and custom handlers               |
| [**Storage**](docs/storage.md)              | FileStore and custom storage backends                 |
| [**Customization**](docs/customization.md)  | Middleware, tRPC, custom transports                   |
| [**MCP Integration**](docs/mcp.md)          | Model Context Protocol compatibility                  |
| [**Migration Guide**](docs/migration.md)    | Upgrading from v0.5.x to v0.6.0                       |

## Running Tests

```bash
npm test
```

## Contributing

Contributions are welcome! Please open an issue or submit a Pull Request on [GitHub](https://github.com/the-artinet-project/artinet-sdk).

Ensure code adheres to the project style and passes linting (`npm run lint`) and tests (`npm test`).

## License

This project is licensed under the Apache License 2.0 - see the `LICENSE` file for details.

## Acknowledgements

This SDK builds upon the concepts and specifications of the [Agent2Agent (A2A) Protocol](https://github.com/google-a2a/A2A).
