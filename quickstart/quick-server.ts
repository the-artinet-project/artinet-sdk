import {
  logger,
  configureLogger,
  AgentEngine,
  createAgentServer,
  TaskStatusUpdateEvent,
  TextPart,
  Context,
} from "@artinet/sdk";

configureLogger({ level: "info" });
// Define the simplest possible agent logic
const quickAgentLogic: AgentEngine = async function* (context: Context) {
  const params = context.command;
  const userInput = (params.message.parts[0] as TextPart).text || "";
  logger.info(`Quick server received: ${userInput}`);
  const workingUpdate: TaskStatusUpdateEvent = {
    taskId: params.message.taskId || "",
    contextId: params.message.contextId || "",
    kind: "status-update",
    status: {
      state: "working",
      message: {
        role: "agent",
        parts: [{ text: "Thinking...", kind: "text" }],
        messageId: params.message.messageId || "",
        kind: "message",
      },
    },
    final: false,
  };
  yield workingUpdate;

  await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate work

  const completedUpdate: TaskStatusUpdateEvent = {
    taskId: params.message.taskId || "",
    contextId: params.message.contextId || "",
    kind: "status-update",
    status: {
      state: "completed",
      message: {
        role: "agent",
        parts: [{ text: `You said: ${userInput}`, kind: "text" }],
        messageId: params.message.messageId || "",
        kind: "message",
      },
    },
    final: true,
  };
  yield completedUpdate;
  logger.info(`Quick server responded.`);
};

// Configure and start the server
const { app, agent } = createAgentServer({
  basePath: "/a2a",
  agent: {
    agent: quickAgentLogic,
    agentCard: {
      name: "QuickStart Agent",
      url: "http://localhost:4000/a2a",
      version: "0.1.0",
      capabilities: { streaming: true }, // Our handler uses yield
      skills: [
        {
          id: "echo",
          name: "Echo Skill",
          description: "Echo the user's message",
          tags: ["echo"],
          inputModes: ["text"],
          outputModes: ["text"],
        },
      ],
      description: "A simple agent that echoes the user's message",
      defaultInputModes: ["text"],
      defaultOutputModes: ["text"],
    },
  },
});

app.listen(4000, () => {
  logger.info("Quick Start A2A Server running on http://localhost:4000/a2a");
});
