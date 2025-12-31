# Server Implementation

Use the `cr8` builder to quickly create agents and servers.

## cr8 Builder (Recommended)

The `cr8` function provides a fluent API for building agents with multiple processing steps:

```typescript
import { cr8 } from "@artinet/sdk";

// Create a simple agent
const simpleAgent = cr8("HelloAgent")
  .text(() => "hello world!")
  .agent;

// Or design a powerful multi-step agent with integrated server
const { app, agent } = cr8("Multi-Step Agent", { basePath: "/a2a" })
  .text(({ content }) => {
    const userMessage = content ?? "no message detected";
    return {
      reply: [`Processing: ${userMessage}`], // reply is sent back as TaskStatusUpdateEvent
      args: { userMessage }, // args are passed to the next step
    };
  })
  .file(({ args }) => {
    const processedText = args?.userMessage;
    return {
      reply: [
        {
          name: "result.txt",
          mimeType: "text/plain",
          bytes: `Processed result: ${processedText}`,
        },
      ],
      args: { status: "file-generated" },
    };
  })
  .text(({ args }) => {
    return `Task completed. Status: ${args?.status}`;
  })
  .server.start(3000); // Start an express server on port 3000

```

### When to Use cr8

- **Step-by-step processing**: Break down complex tasks into discrete, manageable steps
- **Data flow between steps**: Pass results from one step to the next using typed `args`
- **Different content types**: Mix text, file, data, messages, artifacts, and status updates
- **Agent orchestration**: Chain multiple agents together with `.sendMessage()`
- **Quick prototyping**: Get a server running with minimal boilerplate

### Step Types

| Method | Output Type | Use Case |
|--------|-------------|----------|
| `.text()` | `TextPart` | Text processing, responses |
| `.file()` | `FilePart` | File generation, downloads |
| `.data()` | `DataPart` | Structured data, JSON |
| `.message()` | `Message` | Full message control with multiple parts |
| `.artifact()` | `Artifact` | Persistent outputs, versioned content |
| `.status()` | `StatusUpdate` | Progress updates, state changes |
| `.task()` | `Task` | Complete task objects |
| `.sendMessage()` | Task | Agent-to-agent orchestration |

### Builder Properties

| Property | Returns | Description |
|----------|---------|-------------|
| `.agent` | `Service` | The agent service instance |
| `.engine` | `A2A.Engine` | The execution engine |
| `.server` | `{ app, agent, start }` | Express app, agent, start utility |
| `.steps` | `Array<Step>` | The workflow steps |
| `.agentCard` | `A2A.AgentCard` | The agent card |

### Skipping Steps

Use the `skip()` function to conditionally skip a step:

```typescript
cr8("Conditional Agent")
  .text(({ content, skip }) => {
    if (!content) {
      skip();
      return;
    }
    return `Processing: ${content}`;
  })
  .text("Default response")
  .agent;
```

## Advanced Step Types

### Message Steps

Create full messages with multiple parts and role control:

```typescript
cr8("MessageAgent")
  .message(({ content }) => ({
    role: "agent",
    parts: [
      { kind: "text", text: "Here are your results:" },
      { kind: "data", data: { results: [1, 2, 3] } },
    ],
  }))
  .agent;
```

### Artifact Steps

Create persistent, versioned outputs:

```typescript
import { describe } from "@artinet/sdk";

cr8("ArtifactAgent")
  .artifact(({ context, content }) => ({
    artifactId: `report-${context.taskId}`,
    name: "Analysis Report",
    parts: [{ kind: "text", text: `Analysis of: ${content}` }],
  }))
  .agent;
```

### Status Steps

Emit progress updates during execution:

```typescript
cr8("ProgressAgent")
  .status("working")
  .text(async () => {
    // Long running task
    await processData();
    return "Processing complete";
  })
  .status(() => ({
    status: {
      state: A2A.TaskState.completed,
      message: describe.message("All done!"),
    },
  }))
  .agent;
```

### Task Steps

Return complete task objects with full control:

```typescript
cr8("TaskAgent")
  .task(({ context }) => ({
    id: context.taskId,
    contextId: context.contextId,
    status: {
      state: A2A.TaskState.completed,
      message: describe.message("Task finished"),
    },
    artifacts: [],
  }))
  .agent;
```

## Agent Orchestration

Use `.sendMessage()` to orchestrate multiple agents:

```typescript
import { cr8 } from "@artinet/sdk";

// Create specialized agents
const analyzerAgent = cr8("Analyzer")
  .text(({ content }) => `Analysis: ${content}`)
  .agent;

const summarizerAgent = cr8("Summarizer")
  .text(({ content }) => `Summary: ${content}`)
  .agent;

// Create orchestrator that uses other agents
const orchestrator = cr8("Orchestrator")
  .text("Starting multi-agent workflow...")
  .sendMessage({
    agent: analyzerAgent,
    message: "Analyze this data",
  })
  .text(({ args }) => `Analyzer result: ${args?.task?.status.state}`)
  .sendMessage({
    agent: summarizerAgent,
    // If no message provided, forwards the user's original message
  })
  .text(({ args }) => `Summarizer result: ${args?.task?.status.state}`)
  .text("Workflow complete!")
  .agent;
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

The first parameter to `cr8()` can be a string (agent name) or a full `AgentCard`:

```typescript
// Simple - just a name
cr8("My Agent")
  .text("Hello!")
  .agent;

// Full configuration
cr8({
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
})
  .text("Hello!")
  .agent;

// Using describe helper
import { describe } from "@artinet/sdk";

cr8(describe.card({
  name: "My Agent",
  version: "1.0.0",
}))
  .text("Hello!")
  .agent;
```

