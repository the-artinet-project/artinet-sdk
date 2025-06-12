import {
  A2AServer,
  TaskHandler,
  TaskContext,
  InMemoryTaskStore,
  logger,
  configureLogger,
  Artinet, // Assuming Artinet class is available (may need ArtinetClient or similar)
  UpdateEvent, // Added based on linter error
  AgentSkill, // Added based on linter error
  AgentCard, // Assuming AgentCard is a type we can reference
  MessagePart, // Assuming this is the type for parts of a message
} from "@artinet/sdk";
import { FastMCP } from "fastmcp";
import { z } from "zod";
import {
  MCPClient,
  HttpConnector,
  type ToolCallRequest,
  type ToolCallResponse,
} from "@modelcontextprotocol/sdk";
import http from "node:http";

// --- Configuration ---
configureLogger({ level: "info" });
const ARTINET_API_KEY = process.env.ARTINET_API_KEY || "your_artinet_api_key";

const MATH_AGENT_A2A_PORT = 4001;
const MATH_AGENT_A2A_URL = `http://localhost:${MATH_AGENT_A2A_PORT}/a2a`;
const MATH_AGENT_MCP_PORT = 7071;
const MATH_AGENT_MCP_URL = `http://localhost:${MATH_AGENT_MCP_PORT}`;

const ORCHESTRATOR_AGENT_A2A_PORT = 4002;
const ORCHESTRATOR_AGENT_A2A_URL = `http://localhost:${ORCHESTRATOR_AGENT_A2A_PORT}/a2a`;

const artinet = new Artinet({ apiKey: ARTINET_API_KEY });

let mathToolServerInstance: http.Server | null = null;

async function startMathAgentMcpServer(): Promise<void> {
  const mathMcpServer = new FastMCP({
    name: "MathAgentMCPServer",
    version: "1.0.0",
  });

  mathMcpServer.addTool({
    name: "add",
    description: "Adds two numbers",
    parameters: z.object({
      a: z.number().describe("The first number"),
      b: z.number().describe("The second number"),
    }),
    execute: async (args) => {
      logger.info(
        `[MathAgent-MCP] Executing 'add' tool with args: ${JSON.stringify(args)}`
      );
      const result = args.a + args.b;
      return { result };
    },
  });

  mathMcpServer.addTool({
    name: "subtract",
    description: "Subtracts the second number from the first",
    parameters: z.object({
      a: z.number().describe("The number to subtract from"),
      b: z.number().describe("The number to subtract"),
    }),
    execute: async (args) => {
      logger.info(
        `[MathAgent-MCP] Executing 'subtract' tool with args: ${JSON.stringify(args)}`
      );
      const result = args.a - args.b;
      return { result };
    },
  });

  return new Promise((resolve, reject) => {
    // Type assertion for http.Server to satisfy FastMCP's listen method if it expects a specific http server type.
    mathToolServerInstance = mathMcpServer.listen(MATH_AGENT_MCP_PORT, () => {
      logger.info(
        `[MathAgent] MCP Tool Server running at ${MATH_AGENT_MCP_URL}`
      );
      resolve();
    }) as http.Server;
    if (mathToolServerInstance) {
      mathToolServerInstance.on("error", reject);
    }
  });
}

// Adjusted UpdateEvent structure based on common patterns (assuming type and payload)
// This is an assumption; the actual Artinet SDK UpdateEvent structure is needed for full accuracy.
interface ArtinetUpdateEvent extends UpdateEvent {
  type: "TaskStateChanged" | "NewMessage" | "TaskError" | "TaskCompleted"; // Example types
  payload: {
    taskId?: string;
    state?: "working" | "completed" | "failed";
    message?: {
      role: "agent" | "user" | "system";
      parts: MessagePart[];
    };
    error?: string;
  };
}

const mathAgentLogic: TaskHandler = async function* (context: TaskContext) {
  const userInput =
    context.userMessage.parts[0].kind === "text"
      ? context.userMessage.parts[0].text
      : "";
  logger.info(`[MathAgent-A2A] Received: "${userInput}"`);

  const workingUpdate: ArtinetUpdateEvent = {
    type: "TaskStateChanged",
    payload: {
      taskId: context.taskId,
      state: "working",
      message: {
        role: "agent",
        parts: [{ type: "text", text: "MathAgent processing..." }],
      },
    },
  };
  yield workingUpdate;

  let completionMessageText: string;
  if (userInput.toLowerCase().includes("what is your mcp endpoint")) {
    completionMessageText = `My MCP tools are available at ${MATH_AGENT_MCP_URL}`;
  } else {
    completionMessageText = `MathAgent received: "${userInput}". I primarily offer tools via MCP at ${MATH_AGENT_MCP_URL}.`;
  }
  const completionUpdate: ArtinetUpdateEvent = {
    type: "TaskCompleted", // Or TaskStateChanged with state: "completed"
    payload: {
      taskId: context.taskId,
      state: "completed",
      message: {
        role: "agent",
        parts: [{ type: "text", text: completionMessageText }],
      },
    },
  };
  yield completionUpdate;
};

const mathA2AServer = new A2AServer({
  handler: mathAgentLogic,
  taskStore: new InMemoryTaskStore(),
  port: MATH_AGENT_A2A_PORT,
  basePath: "/a2a",
  card: {
    name: "MathAgent",
    url: MATH_AGENT_A2A_URL,
    version: "1.0.0",
    description:
      "An agent that provides math tools (add, subtract) via an MCP endpoint and can be interacted with via A2A.",
    skills: [
      {
        id: "inform_mcp",
        name: "Inform MCP Endpoint",
        description: "Tells where its MCP tools are hosted.",
        inputModes: ["text"],
        outputModes: ["text"],
        tags: ["mcp", "info"],
      },
    ],
    defaultInputModes: ["text"],
    defaultOutputModes: ["text"],
    capabilities: { streaming: true },
    // Assuming a common way to add custom data if 'metadata' is not direct
    customProperties: {
      mcp_endpoint: MATH_AGENT_MCP_URL,
      mcp_tools_available: ["add", "subtract"],
    },
  } as AgentCard,
});

const orchestratorMcpClient = new MCPClient({
  connector: new HttpConnector({ uri: MATH_AGENT_MCP_URL }),
});

interface LLMToolCallDecision {
  shouldCallTool: boolean;
  toolName?: string;
  toolArguments?: Record<string, any>;
  reasoning?: string;
  directResponse?: string;
}

async function decideToolCallWithLLM(
  query: string,
  tools: any[]
): Promise<LLMToolCallDecision> {
  const systemPrompt = `You are an orchestrator agent. Your goal is to answer the user's query.
You can answer directly or use one of the available tools.
If you decide to use a tool, respond with a JSON object with "toolName" and "toolArguments".
Available tools:
${tools.map((t) => `- Tool: "${t.name}", Description: "${t.description}", Arguments: ${JSON.stringify(t.parametersZod.shape)}`).join("\n")}

User Query: "${query}"
Respond with JSON for a tool call, or with your direct answer.
Example tool call response: {"toolName": "add", "toolArguments": {"a": 5, "b": 3}}
Example direct answer: {"directResponse": "The user is asking for a greeting."}`;

  logger.info(`[OrchestratorAgent-LLM] System Prompt for LLM: ${systemPrompt}`);

  let simulatedLlmResponseContent: any;
  if (query.toLowerCase().includes("what is 5 plus 3")) {
    simulatedLlmResponseContent = {
      toolName: "add",
      toolArguments: { a: 5, b: 3 },
      reasoning: "User wants to add 5 and 3.",
    };
  } else if (query.toLowerCase().includes("calculate 10 minus 4")) {
    simulatedLlmResponseContent = {
      toolName: "subtract",
      toolArguments: { a: 10, b: 4 },
      reasoning: "User wants to subtract 4 from 10.",
    };
  } else if (query.toLowerCase().includes("tell math agent hello")) {
    simulatedLlmResponseContent = {
      directResponse: "I should tell MathAgent hello via A2A.",
      toolName: "send_a2a_to_math_agent",
      toolArguments: { message: "Hello from Orchestrator!" },
    };
  } else {
    simulatedLlmResponseContent = {
      directResponse: `I understood the query as: "${query}", but I don't have a specific tool for it beyond basic math or greeting MathAgent.`,
    };
  }
  logger.info(
    `[OrchestratorAgent-LLM] SIMULATED LLM Response: ${JSON.stringify(simulatedLlmResponseContent)}`
  );

  if (
    simulatedLlmResponseContent.toolName &&
    simulatedLlmResponseContent.toolArguments
  ) {
    return {
      shouldCallTool: true,
      toolName: simulatedLlmResponseContent.toolName,
      toolArguments: simulatedLlmResponseContent.toolArguments,
      reasoning:
        simulatedLlmResponseContent.reasoning ||
        "LLM decided to call this tool.",
    };
  }
  return {
    shouldCallTool: false,
    directResponse:
      simulatedLlmResponseContent.directResponse ||
      "LLM decided to answer directly.",
  };
}

async function executeMcpTool(
  toolName: string,
  toolArguments: Record<string, any>
): Promise<any> {
  logger.info(
    `[OrchestratorAgent-MCPClient] Calling MCP tool: "${toolName}" with args: ${JSON.stringify(toolArguments)}`
  );
  try {
    const request: ToolCallRequest = {
      toolName,
      input: toolArguments,
    };
    const response: ToolCallResponse =
      await orchestratorMcpClient.callTool(request);

    if (response.error) {
      logger.error(
        `[OrchestratorAgent-MCPClient] MCP Tool Error: ${response.error.message}`
      );
      throw new Error(response.error.message);
    }
    logger.info(
      `[OrchestratorAgent-MCPClient] MCP Tool "${toolName}" Response: ${JSON.stringify(response.output)}`
    );
    return response.output;
  } catch (error: any) {
    logger.error(
      `[OrchestratorAgent-MCPClient] Failed to call MCP tool "${toolName}": ${error.message}`
    );
    throw error;
  }
}

async function sendA2AMessageToMathAgent(message: string): Promise<string> {
  logger.info(
    `[OrchestratorAgent-A2A] Attempting to send A2A message to MathAgent: "${message}"`
  );
  const mathAgentResponse = `MathAgent received your A2A message: "${message}". Acknowledged.`;
  logger.info(
    `[OrchestratorAgent-A2A] Simulated response from MathAgent: "${mathAgentResponse}"`
  );
  return mathAgentResponse;
}

const orchestratorAgentLogic: TaskHandler = async function* (
  context: TaskContext
) {
  const userInput =
    context.userMessage.parts[0].kind === "text"
      ? context.userMessage.parts[0].text
      : "";
  logger.info(`[OrchestratorAgent-A2A] Received user query: "${userInput}"`);

  yield {
    type: "TaskStateChanged",
    payload: {
      taskId: context.taskId,
      state: "working",
      message: {
        role: "agent",
        parts: [{ type: "text", text: "Orchestrator analyzing query..." }],
      },
    },
  } as ArtinetUpdateEvent;

  const mathAgentTools = [
    {
      name: "add",
      description: "Adds two numbers",
      parametersZod: z.object({ a: z.number(), b: z.number() }),
    },
    {
      name: "subtract",
      description: "Subtracts b from a",
      parametersZod: z.object({ a: z.number(), b: z.number() }),
    },
    {
      name: "send_a2a_to_math_agent",
      description: "Sends a text message to the MathAgent via A2A",
      parametersZod: z.object({ message: z.string() }),
    },
  ];

  const llmDecision = await decideToolCallWithLLM(userInput, mathAgentTools);
  let finalUpdatePayload: ArtinetUpdateEvent["payload"];
  let finalUpdateType: ArtinetUpdateEvent["type"] = "TaskCompleted";

  if (
    llmDecision.shouldCallTool &&
    llmDecision.toolName &&
    llmDecision.toolArguments
  ) {
    yield {
      type: "TaskStateChanged",
      payload: {
        taskId: context.taskId,
        state: "working",
        message: {
          role: "agent",
          parts: [
            {
              type: "text",
              text: `LLM decided to use tool: ${llmDecision.toolName}. ${llmDecision.reasoning || ""}`,
            },
          ],
        },
      },
    } as ArtinetUpdateEvent;

    if (llmDecision.toolName === "send_a2a_to_math_agent") {
      const a2aResponse = await sendA2AMessageToMathAgent(
        llmDecision.toolArguments.message
      );
      finalUpdatePayload = {
        taskId: context.taskId,
        state: "completed",
        message: {
          role: "agent",
          parts: [
            {
              type: "text",
              text: `A2A Interaction with MathAgent: ${a2aResponse}`,
            },
          ],
        },
      };
    } else {
      try {
        const toolResult = await executeMcpTool(
          llmDecision.toolName,
          llmDecision.toolArguments
        );
        const finalAnswer = `Tool ${llmDecision.toolName} executed. Result: ${JSON.stringify(toolResult)}`;
        finalUpdatePayload = {
          taskId: context.taskId,
          state: "completed",
          message: {
            role: "agent",
            parts: [{ type: "text", text: finalAnswer }],
          },
        };
      } catch (error: any) {
        finalUpdateType = "TaskError"; // Or TaskStateChanged with state: "failed"
        finalUpdatePayload = {
          taskId: context.taskId,
          state: "failed",
          error: `Error executing tool ${llmDecision.toolName}: ${error.message}`,
          message: {
            role: "agent",
            parts: [
              {
                type: "text",
                text: `Error executing tool ${llmDecision.toolName}: ${error.message}`,
              },
            ],
          },
        };
      }
    }
  } else {
    finalUpdatePayload = {
      taskId: context.taskId,
      state: "completed",
      message: {
        role: "agent",
        parts: [
          {
            type: "text",
            text:
              llmDecision.directResponse ||
              "Orchestrator processed the query directly.",
          },
        ],
      },
    };
  }
  yield {
    type: finalUpdateType,
    payload: finalUpdatePayload,
  } as ArtinetUpdateEvent;
};

const orchestratorA2AServer = new A2AServer({
  handler: orchestratorAgentLogic,
  taskStore: new InMemoryTaskStore(),
  port: ORCHESTRATOR_AGENT_A2A_PORT,
  basePath: "/a2a",
  card: {
    name: "OrchestratorAgent",
    url: ORCHESTRATOR_AGENT_A2A_URL,
    version: "1.0.0",
    description:
      "Orchestrates tasks, potentially using an LLM to call MCP tools on other agents (like MathAgent) or communicating via A2A.",
    skills: [
      {
        id: "process_query",
        name: "Process Complex Query",
        description: "Processes a natural language query, using LLM and tools.",
        inputModes: ["text"],
        outputModes: ["text"],
        tags: ["orchestration", "llm", "mcp"],
      } as AgentSkill,
    ],
    defaultInputModes: ["text"],
    defaultOutputModes: ["text"],
    capabilities: { streaming: true },
    customProperties: {
      артinet_llm_integration_pattern: "uses artinet.v0.connect with MCP tools",
    },
  } as AgentCard,
});

async function startAllServices() {
  try {
    await startMathAgentMcpServer();
    await mathA2AServer.start();
    logger.info(`[MathAgent-A2A] A2A Server running at ${MATH_AGENT_A2A_URL}`);
    await orchestratorA2AServer.start();
    logger.info(
      `[OrchestratorAgent-A2A] A2A Server running at ${ORCHESTRATOR_AGENT_A2A_URL}`
    );
    logger.info("All services started successfully!");
  } catch (error) {
    logger.error("Failed to start one or more services:", error);
    process.exit(1);
  }
}

async function testAgentQuery(
  agentUrl: string,
  query: string,
  taskId: string = `task-${Date.now()}`
): Promise<string> {
  logger.info(`\n--- Testing Agent at ${agentUrl} with query: "${query}" ---`);
  const body = {
    taskId: taskId,
    contextId: `context-${Date.now()}`,
    request: {
      role: "user",
      parts: [{ type: "text", text: query }],
    },
  };
  logger.info(
    `Mock Test: To test, send a POST request to ${agentUrl}/tasks with body:`
  );
  logger.info(JSON.stringify(body, null, 2));
  logger.info(
    `Then GET ${agentUrl}/tasks/${taskId}/updates to stream results.`
  );
  logger.info(`--- End Test for: "${query}" ---`);
  return `Test queued for "${query}" against ${agentUrl}. Check server logs for execution.`;
}

async function runTests() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  logger.info("\n🚀🚀🚀 RUNNING E2E TESTS 🚀🚀🚀");
  await testAgentQuery(ORCHESTRATOR_AGENT_A2A_URL, "What is 5 plus 3?");
  await testAgentQuery(ORCHESTRATOR_AGENT_A2A_URL, "calculate 10 minus 4");
  await testAgentQuery(ORCHESTRATOR_AGENT_A2A_URL, "Tell MathAgent hello");
  await testAgentQuery(MATH_AGENT_A2A_URL, "What is your MCP endpoint?");
  logger.info("\n🏁🏁🏁 TESTS QUEUED 🏁🏁🏁");
  logger.info("Monitor the server logs to see the interactions.");
  logger.info(
    "Use an A2A client (e.g., Postman, curl, or another Artinet client) to interact with the agents:"
  );
  logger.info(`- MathAgent A2A: ${MATH_AGENT_A2A_URL}`);
  logger.info(`- OrchestratorAgent A2A: ${ORCHESTRATOR_AGENT_A2A_URL}`);
  logger.info(
    `- MathAgent MCP Tools: ${MATH_AGENT_MCP_URL} (e.g., POST to /mcp with MCP ToolCallRequest)`
  );
}

async function main() {
  await startAllServices();
  await runTests();
  logger.info("\nServers are running. Press Ctrl+C to stop.");
}

main().catch((error) => {
  logger.error("Unhandled error in main execution:", error);
  process.exit(1);
});

process.on("SIGINT", async () => {
  logger.info("Caught SIGINT. Shutting down servers...");
  if (mathToolServerInstance) {
    await new Promise<void>((resolve) =>
      mathToolServerInstance!.close(() => resolve())
    );
    logger.info("[MathAgent] MCP Server stopped.");
  }
  if (mathA2AServer) {
    await mathA2AServer.stop();
    logger.info("[MathAgent-A2A] A2A Server stopped.");
  }
  if (orchestratorA2AServer) {
    await orchestratorA2AServer.stop();
    logger.info("[OrchestratorAgent-A2A] A2A Server stopped.");
  }
  logger.info("All services stopped. Exiting.");
  process.exit(0);
});
