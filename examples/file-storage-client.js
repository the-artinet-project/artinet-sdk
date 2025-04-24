/**
 * Test client for the file storage server example
 */

import { A2AClient } from "../dist/index.js";

async function main() {
  try {
    // Create a new client instance
    const client = new A2AClient("http://localhost:3000");
    console.log("Client initialized");

    // Get the agent card to discover capabilities
    try {
      const agentCard = await client.agentCard();
      console.log(`Connected to agent: ${agentCard.name}`);
      console.log(`Agent version: ${agentCard.version}`);
      console.log(
        `Streaming supported: ${
          agentCard.capabilities.streaming ? "Yes" : "No"
        }`
      );
    } catch (error) {
      console.log("Could not retrieve agent card, continuing anyway...");
      console.error(error);
    }

    // Generate a unique task ID - we'll reuse this for the second message
    const taskId = `conversation-${Date.now()}`;

    // First message
    await sendMessage(client, taskId, "Hello! This is my first message!");

    // Second message to the same conversation
    await sendMessage(
      client,
      taskId,
      "This is my second message. Do you remember our conversation?"
    );
  } catch (error) {
    console.error("Error:", error.message);
  }
}

async function sendMessage(client, taskId, text) {
  console.log(`\nSending message with task ID: ${taskId}`);
  console.log(`Message: "${text}"`);

  const message = {
    role: "user",
    parts: [
      {
        type: "text",
        text: text,
      },
    ],
  };

  // Send a task
  const task = await client.sendTask({
    id: taskId,
    message,
  });

  if (task) {
    console.log(`Task status: ${task.status.state}`);

    if (task.status.message) {
      // Extract the text parts from the response
      const textParts = task.status.message.parts
        .filter((part) => part.type === "text")
        .map((part) => part.text);

      console.log("Agent response:", textParts.join("\n"));
    }
  } else {
    console.log("No task response received");
  }
}

// Run the example
main().catch(console.error);
