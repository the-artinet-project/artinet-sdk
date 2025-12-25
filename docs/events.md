# Event Handling & Message Streaming

The SDK provides comprehensive event handling & message streaming capabilities that allow you to modify agent execution, subscribe to events, stream commands, and respond to state changes in real-time.

## Override Event Behaviour

When using the service layer, you can provide your own Event Handlers:

```typescript
import { createAgent, A2A } from "@artinet/sdk";

const agent = createAgent({
  engine: async function* (context: A2A.Context) {
    // Subscribe to events within the agent
    context.publisher.on("update", (currentState, nextState) => {
      // Allow other processes to subscribe to your agent
    });

    // Handle message streams directly within an agent
    for await (const message of context.messenger) {
      console.log("new command received: ", message);
      // Will continue polling until the message stream is closed
    }

    // Or process sent messages
    context.messenger.on("recieved", (command) => {
      // Handle message
    });
  },
  agentCard: "Event-Monitored Agent",
  eventOverrides: {
    // For even greater control, create your own Event Handlers
    onStart: async (context) => {
      // Custom start logic
      return currentState;
    },
    onUpdate: async (currentState, nextState) => {
      // Custom update logic
      return currentState;
    },
    onError: async (error, task) => {
      // Custom error handling
    },
    onComplete: async (task) => {
      // Custom completion logic
    },
    onCancel: async (update, task) => {
      // Custom cancellation logic
    },
  },
});
```

## Subscribing to Context Events

```typescript
import { createAgent, ContextManager } from "@artinet/sdk";

const customContextManager = new ContextManager();

const agent = createAgent({
  engine: myEngine,
  agentCard: "Event-Monitored Agent",
  contexts: customContextManager,
});

// Start a task
const resultPromise = agent.sendMessage({
  contextId: "123",
  message: { parts: [{ kind: "text", text: "Hello" }] },
  ...
});

// Get the context
const currentContext = customContextManager.getContext("123");

// Subscribe to events from a specific context
currentContext.events.on("complete", () => {
  // Errors thrown here will be triggered in the original context
});

// Advanced: stream new commands into a running context
currentContext.command.send({
  // Command data
});

currentContext.command.close();
```

## Available Event Types

| Event | Trigger |
|-------|---------|
| `start` | Agent execution begins |
| `update` | State update during execution |
| `error` | Error occurs during execution |
| `complete` | Execution completes successfully |
| `cancel` | Execution is cancelled |

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

