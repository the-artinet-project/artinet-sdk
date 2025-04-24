import { A2AClient, configureLogger, logger } from "@artinet/sdk";

configureLogger({ level: "info" });

async function runClient() {
  logger.info("Running client...");
  const client = new A2AClient("http://localhost:4000/a2a");
  const message = {
    role: "user" as const,
    parts: [{ type: "text" as const, text: "Hello Quick Start!" }],
  };

  try {
    logger.info("Sending task to quick server...");
    const stream = client.sendTaskSubscribe({ id: "quick-task-1", message });

    for await (const update of stream) {
      if ("status" in update && update.status.message) {
        const agentText = update.status.message.parts
          .filter((p) => p.type === "text")
          .map((p: any) => p.text)
          .join(" ");
        logger.info(`Client Received: [${update.status.state}] ${agentText}`);
      }
    }
    logger.info("Client finished.");
  } catch (error) {
    logger.error("Client Error:", error);
  }
}

runClient();
