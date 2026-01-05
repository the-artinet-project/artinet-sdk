# AgentMessenger

The `AgentMessenger` wraps the native `@a2a-js/sdk`s `Client`/`ClientFactory` in a more ergonomic interface with robust result validation (`zod`), a built-in `CallInterceptor` for adding headers and comprehensive error capturing ( with logging ).

## Basic Usage

Send a message using `sendMessage`:

```typescript
import { AgentMessenger, A2A, createMessenger } from "@artinet/sdk";

const messenger: AgentMessenger = await createMessenger({
  baseUrl: "https://your-a2a-server.com/a2a",
});

const task: A2A.Task | A2A.Message = await messenger.sendMessage(
  "What is the capital of France?"
);
```

## Streaming Updates

Receive real-time updates via SSE using `message/stream`:

```typescript
import { AgentMessenger, createMessenger, A2A, logger } from "@artinet/sdk";

async function streamMessages() {
  const messenger = await createMessenger({
    baseUrl: "https://your-a2a-server.com/a2a",
  });

  const stream = messenger.sendMessageStream("Tell me a short story.");

  for await (const update of stream) {
    if ((update as A2A.TaskStatusUpdateEvent).status) {
      logger.info(
        "Status:",
        (update as A2A.TaskStatusUpdateEvent).status.state
      );
    } else if ((update as A2A.TaskArtifactUpdateEvent).artifact) {
      logger.info(
        "Artifact:",
        (update as A2A.TaskArtifactUpdateEvent).artifact.name
      );
    }
  }
  logger.info("Stream finished.");
}

await streamMessages();
```

## Authentication

Add headers using `addHeader`:

```typescript
import { AgentMessenger, createMessenger } from "@artinet/sdk";

const messenger: AgentMessenger = await createMessenger({
  baseUrl: "https://your-secure-a2a-server.com/a2a",
});

// Add a single header
messenger.addHeader("Authorization", "Bearer your-api-token");

// Access headers
console.log(messenger.headers);

// Access the baseUrl
console.log(messenger.baseUrl);
```

> **Note:** More robust Authentication using native the `@a2a-js/sdk` on the way.

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
          "zod": "https://esm.sh/zod@3.25",
          "uuid": "https://esm.sh/uuid@13.0.0"
        }
      }
    </script>
  </head>
  <body>
    <script type="module">
      const { createMessenger } = await import("@artinet/sdk/browser");
      const messenger = createMessenger({
        baseUrl: "http://localhost:4000/a2a",
      });

      const stream = await messenger.sendMessageStream("Hello!");
      for await (const update of stream) {
        console.log(update);
      }
    </script>
  </body>
</html>
```

> **Note:** Uses [esm.sh](https://esm.sh) as a CDN. See [`examples/browser-example.html`](../examples/browser-example.html) for a complete example.

## Parameters

| Name           | Type                             | Description                                        |
| -------------- | -------------------------------- | -------------------------------------------------- |
| `baseUrl`      | `string`/`URL`                   | The target Agents url                              |
| `headers`      | `Record<string, string>`         | Headers to be sent to server (e.g. "Bearer":"xxx") |
| `fallbackPath` | `string`                         | A fallback path should the baseURL fail            |
| `baseUrl`      | `ClientFactoryOptions`(optional) | `@a2a-js/sdk` native `ClientFactoryOptions`        |
| `baseUrl`      | `ClientConfig` (optional)        | `@a2a-js/sdk` native `ClientConfig`                |

## Methods

| Method                             | Description                     |
| ---------------------------------- | ------------------------------- |
| `getAgentCard`                     | Fetch the agent's card          |
| `sendMessage`                      | Send a message (blocking)       |
| `sendMessageStream`                | Send with streaming updates     |
| `getTask`                          | Get a task by ID                |
| `cancelTask`                       | Cancel a running task           |
| `resubscribeTask`                  | Resubscribe to task updates     |
| `setTaskPushNotification`          | Configure push notifications    |
| `getTaskPushNotification`          | Get push notification config    |
| `listTaskPushNotificationConfig`   | List push notification configs  |
| `deleteTaskPushNotificationConfig` | Delete push notification config |
| `supports`                         | Check supported capabilities    |
| `addHeader`                        | Add a custom header             |
| `removeHeader`                     | Remove a custom header          |
