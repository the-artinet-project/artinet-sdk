import {
  A2AClient,
  configureLogger,
  logger,
  getContent,
  UpdateEvent,
} from "@artinet/sdk";

configureLogger({ level: "info" });

async function runClient() {
  logger.info("Running client...");
  const client: A2AClient = new A2AClient("http://localhost:4000/a2a");
  try {
    logger.info("Sending task to quick server...");
    const stream: AsyncIterable<UpdateEvent> =
      client.sendStreamingMessage("Hello, World!");

    for await (const update of stream) {
      if ("status" in update && update.status.message) {
        const agentText: string | undefined = getContent(update);
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
