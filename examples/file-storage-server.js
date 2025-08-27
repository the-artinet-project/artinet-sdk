/**
 * File Storage A2A Server Example
 *
 * This example demonstrates how to create an A2A server that uses
 * file-based storage for persisting tasks and message history
 * between server restarts.
 */

import {
  createAgentServer,
  FileStore,
  configureLogger,
} from "../dist/index.js";
import path from "path";
import fs from "fs/promises";

// Configure logging
configureLogger({ level: "info" });

// Ensure storage directory exists
const DATA_DIR = path.join(process.cwd(), "data");
try {
  await fs.mkdir(DATA_DIR, { recursive: true });
  console.log(`Storage directory created: ${DATA_DIR}`);
} catch (error) {
  console.error(`Failed to create storage directory: ${error}`);
  process.exit(1);
}

/**
 * Implement a simple task handler with history awareness
 */
async function* historyAwareAgent(context) {
  // Extract the user's most recent message
  const userText = context.command.message.parts
    .filter((part) => part.type === "text")
    .map((part) => part.text)
    .join(" ");

  console.log(`Processing request: ${userText}`);

  // Count user messages in history
  const userMessageCount = context.history.filter(
    (msg) => msg.role === "user"
  ).length;

  // Send a "working" status update
  yield {
    state: "working",
    message: {
      role: "agent",
      parts: [{ text: "Processing your request...", type: "text" }],
    },
  };

  // Simulate work
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Check for task cancellation
  if (context.isCancelled()) {
    console.log("Task was cancelled");
    yield {
      state: "canceled",
      message: {
        role: "agent",
        parts: [{ text: "Processing has been cancelled.", type: "text" }],
      },
    };
    return;
  }

  // Create a history-aware response
  let response;

  if (userMessageCount === 1) {
    response = `Hello! This is your first message: "${userText}". I'll remember our conversation.`;
  } else {
    // Summarize past messages
    const pastUserMessages = context.history
      .filter((msg) => msg.role === "user")
      .slice(0, -1) // Exclude the current message
      .map((msg) =>
        msg.parts
          .filter((part) => part.type === "text")
          .map((part) => part.text)
          .join(" ")
      );

    response = `You've sent ${userMessageCount} messages. Your previous messages were: ${JSON.stringify(
      pastUserMessages
    )}. Your current message is: "${userText}"`;
  }

  // Yield an artifact with conversation stats
  yield {
    name: "conversation-stats.txt",
    parts: [
      {
        text: `Conversation statistics:
- Total messages: ${context.history.length}
- User messages: ${userMessageCount}
- Agent messages: ${context.history.length - userMessageCount}
`,
        type: "text",
      },
    ],
  };

  // Yield a completed status with response message
  yield {
    state: "completed",
    message: {
      role: "agent",
      parts: [{ text: response, type: "text" }],
    },
  };
}

// Create a server with file-based storage
const server = new A2AServer({
  // Use file-based storage for persistence between restarts
  taskStore: new FileStore(DATA_DIR),
  handler: historyAwareAgent,

  // Customize the port
  port: 3000,

  // Customize the agent card
  card: {
    url: "http://localhost:3000",
    name: "History-Aware Agent",
    description: "An agent that remembers your conversation history",
    version: "1.0.0",
    skills: [
      {
        id: "history-aware",
        name: "history-aware",
        description: "An agent that remembers your conversation history",
      },
    ],
    capabilities: {
      streaming: true,
      stateTransitionHistory: true,
    },
  },
});

// Start the server
server.start();
console.log("A2A Server started on port 3000 with file-based storage");
console.log(`Tasks and history will be stored in: ${DATA_DIR}`);
console.log("Try connecting with an A2A client, then restart the server");
console.log("and continue the conversation with the same task ID!");
