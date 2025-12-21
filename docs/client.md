# Client Usage

Interact with A2A-compliant agents using the `A2AClient`.

## Basic Usage

Send a message using `message/send`:

```typescript
import { A2AClient, A2A } from "@artinet/sdk";

const client = new A2AClient("https://your-a2a-server.com/a2a");

const task: A2A.Task = await client.sendMessage(
  "What is the capital of France?"
);
```

## Streaming Updates

Receive real-time updates via SSE using `message/stream`:

```typescript
import { A2AClient, A2A } from "@artinet/sdk";

async function runStreamingTask() {
  const client = new A2AClient("https://your-a2a-server.com/a2a");

  const stream = client.sendStreamingMessage("Tell me a short story.");

  for await (const update of stream) {
    if ((update as A2A.TaskStatusUpdateEvent).status) {
      console.log(
        "Status:",
        (update as A2A.TaskStatusUpdateEvent).status.state
      );
    } else if ((update as A2A.TaskArtifactUpdateEvent).artifact) {
      console.log(
        "Artifact:",
        (update as A2A.TaskArtifactUpdateEvent).artifact.name
      );
    }
  }
  console.log("Stream finished.");
}
```

## Authentication

Add headers using `addHeader` or `setHeaders`:

```typescript
import { A2AClient } from "@artinet/sdk";

const client = new A2AClient("https://your-secure-a2a-server.com/a2a");

// Add a single header
client.addHeader("Authorization", "Bearer your-api-token");

// Set multiple headers (overwrites existing)
client.setHeaders({ Authorization: "Bearer ...", "X-Custom": "value" });
```

## Browser Usage

_Experimental_

The Client can be used directly in browsers. You'll need to load the required external dependencies: `zod`, `uuid`, and `eventsource-parser`.

```html
<!DOCTYPE html>
<html>
  <head>
    <!-- Required external dependencies -->
    <script type="importmap">
      {
        "imports": {
          "zod": "https://esm.sh/zod@3.23.8",
          "uuid": "https://esm.sh/uuid@11.1.0",
          "eventsource-parser": "https://esm.sh/eventsource-parser@3.0.1"
        }
      }
    </script>
  </head>
  <body>
    <script type="module">
      const { A2AClient } = await import("@artinet/sdk");
      const client = new A2AClient("http://localhost:4000/a2a");

      const stream = await client.sendStreamingMessage("Hello!");
      for await (const update of stream) {
        console.log(update);
      }
    </script>
  </body>
</html>
```

> **Note:** Uses [esm.sh](https://esm.sh) as a CDN. See [`examples/browser-example.html`](../examples/browser-example.html) for a complete example.

## Client Methods

| Method                            | Description                  |
| --------------------------------- | ---------------------------- |
| `agentCard()`                     | Fetch the agent's card       |
| `sendMessage(params)`             | Send a message (blocking)    |
| `sendStreamingMessage(params)`    | Send with streaming updates  |
| `getTask(params)`                 | Get a task by ID             |
| `cancelTask(params)`              | Cancel a running task        |
| `resubscribeTask(params)`         | Resubscribe to task updates  |
| `setTaskPushNotification(params)` | Configure push notifications |
| `getTaskPushNotification(params)` | Get push notification config |
