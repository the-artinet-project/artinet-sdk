import {
  AgentMessenger,
  applyDefaults,
  logger,
  extractTextContent,
  A2A,
  createMessenger,
} from "@artinet/sdk";

applyDefaults();

async function runClient() {
  logger.info("Running client...");
  const messenger: AgentMessenger = await createMessenger({
    baseUrl: "http://localhost:4000/a2a",
  });
  try {
    logger.info("Sending task to quick server...");
    const stream: AsyncIterable<A2A.Update> =
      messenger.sendMessageStream("Hello, World!");

    for await (const update of stream) {
      if ("status" in update && update.status.message) {
        const agentText: string | undefined = extractTextContent(update);
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
