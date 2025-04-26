/**
 * Test client for the file storage server example - part 2
 * This test demonstrates history retrieval after server restart
 */

import { A2AClient } from "../dist/index.js";

// Use the same task ID as in the previous run
const taskId = `conversation-1745596127049`;

async function main() {
  try {
    // Create a new client instance
    const client = new A2AClient("http://localhost:3000");
    console.log("Client initialized");

    // Get the agent card to discover capabilities
    try {
      const agentCard = await client.agentCard();
      console.log(`Connected to agent: ${agentCard.name}`);
    } catch (error) {
      console.log("Could not retrieve agent card, continuing anyway...");
    }

    console.log(`\nSending third message with task ID: ${taskId}`);
    const message =
      "This is my third message. The server was restarted. Do you still remember our conversation?";
    console.log(`Message: "${message}"`);

    // Send a task
    const task = await client.sendTask({
      id: taskId,
      message: {
        role: "user",
        parts: [
          {
            type: "text",
            text: message,
          },
        ],
      },
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
