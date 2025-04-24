/**
 * Streaming updates example for the Artinet SDK
 *
 * This example demonstrates how to:
 * - Create an A2AClient instance
 * - Check if streaming is supported
 * - Send a task with streaming updates
 * - Process updates as they arrive
 */

import { A2AClient } from "../dist/index.js";

async function main() {
  try {
    // Create a new client instance pointing to our local server
    const client = new A2AClient("http://localhost:3000/api");
    console.log("Client initialized");

    // Check if streaming is supported
    let streamingSupported = false;
    try {
      streamingSupported = await client.supports("streaming");
      console.log(`Streaming supported: ${streamingSupported ? "Yes" : "No"}`);
    } catch (error) {
      console.log(
        "Could not check streaming support, assuming it is supported..."
      );
      streamingSupported = true; // Assume it's supported for this example
    }

    if (streamingSupported) {
      // Create a message to send
      const message = {
        role: "user",
        parts: [
          {
            type: "text",
            text: "Tell me a story about space exploration. Take your time and give details about different missions.",
          },
        ],
      };

      // Generate a unique task ID
      const taskId = `streaming-task-${Date.now()}`;
      console.log(`Sending streaming task with ID: ${taskId}...`);

      // Send the task and subscribe to updates
      const stream = client.sendTaskSubscribe({
        id: taskId,
        message,
      });

      console.log("Processing streaming updates...");

      // Process the updates as they arrive
      let responseText = "";

      for await (const update of stream) {
        // Check the type of update
        if ("status" in update) {
          console.log(`Task status update: ${update.status.state}`);

          // If there's a message in this status update
          if (update.status.message) {
            const textParts = update.status.message.parts
              .filter((part) => part.type === "text")
              .map((part) => part.text);

            const newText = textParts.join("\n");

            // Check if this is new text or a replacement
            if (
              update.status.message.parts.some((part) => part.metadata?.append)
            ) {
              responseText += newText;
            } else {
              responseText = newText;
            }

            // Print the text received so far
            console.log(`\nResponse so far (${responseText.length} chars):`);
            console.log("-------------------");
            console.log(responseText);
            console.log("-------------------\n");
          }

          // If this is the final update, we're done
          if (update.final) {
            console.log("Final update received");
          }
        } else if ("artifact" in update) {
          // Handle artifact updates
          console.log(
            `Received artifact: ${update.artifact.name || "unnamed"}`
          );

          // Process artifact parts
          for (const part of update.artifact.parts) {
            if (part.type === "text") {
              console.log(`Artifact text: ${part.text.substring(0, 100)}...`);
            } else if (part.type === "file") {
              console.log(`Artifact file: ${part.file.name || "unnamed"}`);
              // In a real app, you might download the file from part.file.uri
            }
          }

          // If this is the final artifact, note it
          if (update.final) {
            console.log("Final artifact received");
          }
        }
      }

      console.log("Stream completed");
    } else {
      console.log("Streaming is not supported by this agent");
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
}

// Run the example
main().catch(console.error);
