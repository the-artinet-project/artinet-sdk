# Persistent Storage

For `Task` storage, use one of our simple storage providers like `FileStore`, or implement the `Tasks` interface to create your own.

## SQLite Store

Use our built in `SQLiteStore` for production-ready `Task` storage.

```typescript
import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import { SQLiteStore, TaskTable } from "@artinet/sdk/sqlite";
import { cr8 } from "@artinet/sdk";

const sqlite: Database.Database = new Database(":memory:");
const db = drizzle<TaskTable>(sqlite);

const sqlStore = new SQLiteStore(db);

const agent = cr8("SQL Agent", {
  tasks: sqlStore,
}).agent;
```

- `SQLiteStore` uses [`drizzle-orm`](https://www.npmjs.com/package/drizzle-orm) under the hood, so its compatible with any [drizzle](https://orm.drizzle.team/docs/overview) supported database.

Required:

```bash
npm install drizzle-orm
```

## FileStore

```typescript
import path from "path";
import fs from "fs";
import { FileStore, cr8 } from "@artinet/sdk";

// Make sure the directory exists
const dataDir = path.join(process.cwd(), "a2a-data");
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const myStore = new FileStore(dataDir);

const agent = cr8("My Agent", {
  tasks: myStore,
  basePath: "/a2a",
}).agent;
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

  override async update(
    context: A2A.Context,
    update: A2A.Update
  ): Promise<A2A.Task> {
    // Update task with new state
  }

  async create(params: Partial<A2A.Task>): Promise<A2A.Task> {
    // Create a new task for the agent
  }
}
```
