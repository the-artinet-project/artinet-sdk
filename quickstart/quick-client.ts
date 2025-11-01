import {
  A2AClient,
  configureLogger,
  logger,
  Message,
  getContent,
} from "@artinet/sdk";

configureLogger({ level: "info" });

async function runClient() {
  logger.info("Running client...");
  const client = new A2AClient("http://localhost:4000/a2a");
  const message: Message = {
    messageId: "quick-task-1",
    kind: "message",
    role: "user",
    parts: [{ kind: "text", text: "Hello Quick Start!" }],
  };

  try {
    logger.info("Sending task to quick server...");
    const stream = client.sendStreamingMessage({ message });

    for await (const update of stream) {
      if ("status" in update && update.status.message) {
        const agentText = getContent(update.status.message);
        logger.info(
          `Client Received: [${update.status.state}] ${agentText ?? "No text"}`
        );
      }
    }
    logger.info("Client finished.");
  } catch (error) {
    logger.error("Client Error:", error);
  }
}

runClient();
