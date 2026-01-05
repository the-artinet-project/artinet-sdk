import { logger, configure, cr8 } from "@artinet/sdk";
import { configurePino } from "@artinet/sdk/pino";
import pino from "pino";
import pinoCaller from "pino-caller";

logger.info("Quick server starting");

configure({
  logger: configurePino(
    pinoCaller(
      pino({
        level: "info",
        transport: {
          target: "pino-pretty",
          options: { colorize: true },
        },
      })
    )
  ),
});

// Configure and start the server
const { app } = cr8(
  {
    protocolVersion: "0.3.0",
    name: "QuickStart Agent",
    url: "http://localhost:4000/a2a",
    version: "0.1.0",
    capabilities: {
      streaming: true,
      extensions: [
        {
          uri: "artinet:symphony",
          params: {
            teams: ["development", "documentation"],
          },
        },
      ],
    },
    preferredTransport: "JSONRPC",
    supportsAuthenticatedExtendedCard: false,
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
  {
    agentCardPath: "/.well-known/agent-card.json",
    basePath: "/a2a",
  }
)
  .text(({ content: userInput }) => {
    logger.info(`Server received: ${userInput}`);
    return "Thinking...";
  })
  .text(async ({ context, content: userInput }) => {
    if (context.userMessage?.messageId?.includes("mapping-test")) {
      logger.debug("Mapping test message received");
      let counter = 0;
      while (true) {
        await new Promise((resolve) => setTimeout(resolve, 100));
        counter++;
        if (counter > 30) {
          break;
        }
        if (await context.isCancelled()) {
          logger.debug("Mapping test message cancelled");
          break;
        }
      }
      logger.debug(
        `Mapping test message completed: ${await context.isCancelled()}`
      );
    }
    // Simulate work
    await new Promise((resolve) => setTimeout(resolve, 500));
    return `You said: ${userInput}`;
  }).server;

app.listen(4000);
