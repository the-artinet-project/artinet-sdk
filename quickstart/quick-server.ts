import {
  A2AServer,
  TaskContext,
  TaskHandler,
  InMemoryTaskStore,
  logger,
  configureLogger,
} from "@artinet/sdk";
configureLogger({ level: "info" });
// Define the simplest possible agent logic
const quickAgentLogic: TaskHandler = async function* (context: TaskContext) {
  const userInput =
    context.userMessage.parts[0].kind === "text"
      ? context.userMessage.parts[0].text
      : "";
  logger.info(`Quick server received: ${userInput}`);

  yield {
    state: "working",
    message: { role: "agent", parts: [{ type: "text", text: "Thinking..." }] },
  };

  await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate work

  yield {
    state: "completed",
    message: {
      role: "agent",
      parts: [{ type: "text", text: `You said: ${userInput}` }],
    },
  };

  logger.info(`Quick server responded.`);
};

// Configure and start the server
const server = new A2AServer({
  handler: quickAgentLogic,
  taskStore: new InMemoryTaskStore(),
  port: 4000,
  basePath: "/a2a",
  card: {
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
});

server.start();
logger.info("Quick Start A2A Server running on http://localhost:4000/a2a");
