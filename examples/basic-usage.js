/**
 * Basic usage example for the Artinet SDK
 *
 * This example demonstrates how to:
 * - Create an A2AClient instance
 * - Get the agent card
 * - Send a simple task
 * - Handle the response
 */

import { A2AClient } from "../dist/index.js";

async function main() {
  try {
    // Create a new client instance
    // Replace with your actual A2A server URL
    const client = new A2AClient("https://your-a2a-server.com");
    console.log("Client initialized");

    // You can add authentication if required
    client.addHeader("Authorization", "Bearer your-token-here");

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
    }

    // Create a message to send
    const message = {
      role: "user",
      parts: [
        {
          type: "text",
          text: "Hello! Can you help me with a question about climate change?",
        },
      ],
    };

    // Generate a unique task ID
    const taskId = `task-${Date.now()}`;

    // Send a task
    console.log(`Sending task with ID: ${taskId}...`);

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
  } catch (error) {
    console.error("Error:", error.message);
  }
}

// Run the example
main().catch(console.error);
