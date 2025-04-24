/**
 * Basic A2A Server Example
 *
 * This example demonstrates how to create a simple A2A server
 * that responds to incoming tasks.
 */

import {
  A2AServer,
  InMemoryTaskStore,
  configureLogger,
} from "../dist/index.js";

// Configure logging for this example
configureLogger({ level: "info" });

/**
 * Implement a simple task handler
 */
async function* simpleEchoAgent(context) {
  // Extract the user's message
  const userText = context.userMessage.parts
    .filter((part) => part.type === "text")
    .map((part) => part.text)
    .join(" ");

  console.log(`Processing request: ${userText}`);

  // Send a "working" status update
  yield {
    state: "working",
    message: {
      role: "agent",
      parts: [{ text: "Thinking about your request...", type: "text" }],
    },
  };

  // Simulate some work with delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

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

  // Create a response
  const response = `You said: "${userText}". This is an echo server example.`;

  // Yield an artifact (optional)
  yield {
    name: "response.txt",
    parts: [{ text: response, type: "text" }],
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

// Create a server
const server = new A2AServer({
  // Use in-memory storage (no persistence between restarts)
  handler: simpleEchoAgent,
  taskStore: new InMemoryTaskStore(),
  // Customize the port
  port: 3000,

  // Base path for the API endpoint
  basePath: "/api",

  // CORS options
  corsOptions: {
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  },

  // Customize the agent card
  card: {
    name: "Echo Agent",
    description: "A simple echo agent that responds with your message",
    version: "1.0.0",
    url: "http://localhost:3000",
    skills: [
      {
        id: "echo",
        name: "echo",
        description: "Echoes back the user's message",
      },
    ],
    capabilities: {
      streaming: true,
      pushNotifications: false,
      stateTransitionHistory: true,
    },
  },
});

// Start the server
server.start();
console.log("A2A Server started on port 3000");
console.log("Try connecting with an A2A client:");
console.log("  A2A Endpoint: http://localhost:3000/api");
console.log("  Agent Card: http://localhost:3000/.well-known/agent.json");
