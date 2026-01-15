# State Machine & Message Handling

The SDK provides highly customisable event handling & message streaming capabilities that allow you to modify agent execution, subscribe to events, stream commands, and respond to state changes in real-time.

## Override Event Behaviour

When using the service layer, you can provide your own Event Handlers:

```typescript
import { cr8, A2A } from "@artinet/sdk";

const agent = cr8("Event-Monitored Agent", {
  overrides: {
    // For even greater control, create your own Event Handlers
    onStart: async (context: A2A.Context) => {
      // Prepares the current Task
      // Use this to sanitize user Messages or provide important configuration details
      return await context.getTask();
    },
    onUpdate: async (update: A2A.Update, task: A2A.Task) => {
      // Custom update logic
      // Use this to save Tasks or extract information to send to other processes
      return task; //updates the current task
    },
    onError: async (error: any, task: A2A.Task) => {
      // Custom error handling
    },
    onComplete: async (task: A2A.Task) => {
      // Custom completion logic
      // This is triggered whenever the agent has fully completed a request
    },
    onCancel: async (update: A2A.Update, task: A2A.Task) => {
      // Custom cancellation logic
    },
  },
}).agent;
```

_Explore the default handlers in [`state-machine.ts`](../src/services/a2a/factory/state-machine.ts)_

## Message Streaming

There are several ways to handle incoming/outgoing messages:

```typescript
import { cr8, A2A, describe } from "@artinet/sdk";

const agent = cr8("Message Agent").from(async function* (context: A2A.Context) {
  // Handle message streams directly within an agent
  for await (const message of context.messages) {
    console.log("new message received: ", message);
    // Will continue polling until the message stream is closed
  }

  // Or process sent messages
  context.messages.on("message", (message) => {
    // Handle message
  });

  // yield a message
  yield describe.message("Hello User!");

  // Or publish an update
  context.publisher.onUpdate(
    describe.update.working({
      contextId: context.contextId,
      taskId: context.taskId,
    })
  );
}).agent;

```

## Available Event Types

| Event      | Trigger                          |
| ---------- | -------------------------------- |
| `start`    | Agent execution begins           |
| `update`   | State update during execution    |
| `error`    | Error occurs during execution    |
| `complete` | Execution completes successfully |
| `cancel`   | Execution is cancelled           |

## Event Handler Signatures

```typescript
interface EventHandlers {
  onStart: (context: A2A.Context) => Promise<A2A.Task>;
  onUpdate: (update: A2A.Update, task: A2A.Task) => Promise<A2A.Task>;
  onError: (error: Error, task: A2A.Task) => Promise<void>;
  onComplete: (task: A2A.Task) => Promise<void>;
  onCancel: (update: A2A.Update, task: A2A.Task) => Promise<void>;
}
```
