import {
  logger,
  configureLogger,
  createAgentServer,
  AgentBuilder,
} from "@artinet/sdk";

configureLogger({ level: "info" });

// Configure and start the server
const { app } = createAgentServer({
  agent: AgentBuilder()
    .text(({ content: userInput }) => {
      logger.info(`Server received: ${userInput}`);
      return "Thinking...";
    })
    .text(async ({ content: userInput }) => {
      // Simulate work
      await new Promise((resolve) => setTimeout(resolve, 500));
      return `You said: ${userInput}`;
    })
    .createAgent({
      agentCard: {
        protocolVersion: "0.3.0",
        name: "QuickStart Agent",
        url: "http://localhost:4000/a2a",
        version: "0.1.0",
        capabilities: { streaming: true },
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
    }),
  basePath: "/a2a",
});

app.listen(4000, () => {
  logger.info("A2A Server running on http://localhost:4000/a2a");
});
