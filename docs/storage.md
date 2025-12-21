# Persistent Storage

For Task storage, use one of our simple storage providers like `Files`, or implement the `Tasks` interface to create your own.

## Using FileStore

```typescript
import path from "path";
import fs from "fs";
import { Files, createAgentServer } from "@artinet/sdk";

// Make sure the directory exists
const dataDir = path.join(process.cwd(), "a2a-data");
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const myStore = new Files(dataDir);

const { app, agent } = createAgentServer({
  agent: {
    engine: myAgent,
    agentCard: {
      name: "Persistent Agent",
      // ...
    },
    tasks: myStore,
  },
  basePath: "/a2a",
});
```

## Custom Storage Implementation

Implement the `A2A.Tasks` interface or extend `Tasks` for custom storage backends:

```typescript
import { Tasks, A2A } from "@artinet/sdk";

class CustomStorage extends Tasks {
  override async get(id: string): Promise<A2A.Task | undefined> {
    // Fetch from your storage
  }

  override async set(id: string, value: A2A.Task): Promise<void> {
    // Save to your storage
  }

  override async has(id: string): Promise<boolean> {
    // Check if exists
  }

  override async delete(id: string): Promise<void> {
    // Remove from storage
  }

  override async update(context: A2A.Context, update: A2A.Update): Promise<A2A.Task> {
    // Update task with new state
  }
}
```

## Storage Use Cases

| Provider | Use Case |
|----------|----------|
| `Files` | Development, single-instance deployments |
| Custom Redis | Multi-instance, distributed deployments |
| Custom Database | Production, querying, analytics |

