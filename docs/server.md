# Server Implementation

Use `createAgentServer()` to embed your Agents in an Express App.

## AgentBuilder (Recommended)

For simple agents with one or more processing steps, use the `AgentBuilder` pattern:

```typescript
import { createAgentServer, AgentBuilder } from "@artinet/sdk";

// Create a simple agent
const simpleAgent = AgentBuilder().text(() => "hello world!");

// Or design a powerful multi-step agent
const { app, agent } = createAgentServer({
  agent: AgentBuilder()
    .text(({ content, context }) => {
      const userMessage = content ?? "no message detected";
      return {
        parts: [`Processing: ${userMessage}`], // parts are immediately sent back as TaskStatusUpdateEvents
        args: [userMessage], // args are passed to the next step
      };
    })
    .file(({ args }) => {
      const processedText = args[0];
      return {
        parts: [
          {
            name: "result.txt",
            mimeType: "text/plain",
            bytes: `Processed result: ${processedText}`,
          },
        ],
        args: ["file-generated"],
      };
    })
    .text(({ args }) => {
      const status = args[0];
      return `Task completed. Status: ${status}`;
    }) // A final Task is returned to the caller which contains all of the emitted parts.
    .createAgent({
      agentCard: "Multi-Step Agent",
    }),
  basePath: "/a2a",
});

app.listen(3000, () => {
  console.log("Multi-Step A2A Server running on http://localhost:3000/a2a");
});
```

### When to Use AgentBuilder

- **Step-by-step processing**: Break down complex tasks into discrete, manageable steps
- **Data flow between steps**: Pass results from one step to the next using the `args` parameter
- **Different content types**: Mix text, file, and data processing in a single flow
- **Reusable components**: Build modular agents that can be easily edited or extended

### Step Types

| Method | Output Type | Use Case |
|--------|-------------|----------|
| `.text()` | `TextPart` | Text processing, responses |
| `.file()` | `FilePart` | File generation, downloads |
| `.data()` | `DataPart` | Structured data, JSON |

### Skipping Steps

Use the `skip()` function to conditionally skip a step:

```typescript
AgentBuilder()
  .text(({ content, skip }) => {
    if (!content) {
      skip();
      return;
    }
    return `Processing: ${content}`;
  })
  .text(() => "Default response")
  .createAgent({ agentCard: "Conditional Agent" });
```

## AgentEngine (Advanced)

When you need full control over the execution flow, implement an `AgentEngine` directly:

```typescript
import { createAgentServer, A2A } from "@artinet/sdk";

const myAgent: A2A.Engine = async function* (context: A2A.Context) {
  // Emit a working status
  yield {
    kind: "status-update",
    taskId: context.taskId,
    contextId: context.contextId,
    status: {
      state: "working",
      message: {
        role: "agent",
        parts: [{ kind: "text", text: "Processing..." }],
      },
    },
    final: false,
  };

  // Emit an artifact
  yield {
    kind: "artifact-update",
    taskId: context.taskId,
    contextId: context.contextId,
    artifact: {
      artifactId: "result-1",
      name: "result.txt",
      mimeType: "text/plain",
      parts: [{ kind: "text", text: "Report data" }],
    },
  };

  // Emit completed status
  yield {
    kind: "status-update",
    taskId: context.taskId,
    contextId: context.contextId,
    status: {
      state: "completed",
      message: {
        role: "agent",
        parts: [{ kind: "text", text: "Finished processing." }],
      },
    },
    final: true,
  };
};

const { app, agent } = createAgentServer({
  agent: {
    engine: myAgent,
    agentCard: {
      name: "Example Agent",
      url: "http://localhost:3000/a2a",
      version: "1.0.0",
      capabilities: { streaming: true },
      skills: [{ id: "processor", name: "Text Processor", tags: ["text"] }],
    },
  },
  basePath: "/a2a",
  agentCardPath: "/.well-known/agent-card.json",
});
```

## AgentCard Configuration

The `agentCard` can be a string (agent name) or a full configuration:

```typescript
// Simple - just a name
agentCard: "My Agent"

// Full configuration
agentCard: {
  name: "My Agent",
  url: "http://localhost:3000/a2a",
  version: "1.0.0",
  description: "A helpful agent",
  capabilities: {
    streaming: true,
    pushNotifications: false,
  },
  skills: [
    { id: "chat", name: "Chat", tags: ["conversation"] },
    { id: "search", name: "Search", tags: ["query"] },
  ],
  defaultInputModes: ["text"],
  defaultOutputModes: ["text"],
}
```

