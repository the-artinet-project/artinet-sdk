import { jest } from "@jest/globals";
import {
  testDeployment,
  configureLogger,
  SendTaskRequest,
  Message,
  AgentCard,
  ServerDeploymentRequestParams,
  ServerDeploymentResponse,
  Task,
  bundle,
} from "../src/index.js";
import { logDebug } from "../src/utils/logging/log.js";

configureLogger({ level: "debug" });

// Set a reasonable timeout for all tests
jest.setTimeout(10000);

const basicTest = "throw new Error('test'); export default 'ok';";
const coderCode = await bundle(
  new URL("../examples/code-deployment.js", import.meta.url)
);
const ts_coderCode = await bundle(
  new URL("../examples/code-deployment.ts", import.meta.url)
);

const MOCK_AGENT_CARD: AgentCard = {
  name: "Test Agent",
  description: "A test agent for unit tests",
  url: "https://test-agent.example.com/api",
  version: "1.0.0",
  capabilities: {
    streaming: true,
    pushNotifications: true,
    stateTransitionHistory: false,
  },
  skills: [
    {
      id: "test-skill",
      name: "Test Skill",
      description: "A test skill for unit tests",
    },
  ],
};

const testParams: ServerDeploymentRequestParams = {
  name: "Test Agent",
  agentCard: MOCK_AGENT_CARD,
  code: basicTest,
};

const coderTestParams: ServerDeploymentRequestParams = {
  name: "Test Agent",
  agentCard: MOCK_AGENT_CARD,
  code: coderCode,
};

const ts_coderTestParams: ServerDeploymentRequestParams = {
  name: "Test Agent",
  agentCard: MOCK_AGENT_CARD,
  code: ts_coderCode,
};

const message: Message = {
  role: "user",
  parts: [
    {
      type: "text",
      text: "Write a python function to share files remotely. Please be concise and respond with code only. Please use the following format: def share_files(files: list[str]) -> str: ...",
    },
  ],
};
const message2: Message = {
  role: "user",
  parts: [
    {
      type: "text",
      text: "Write a javascript function to share files remotely. Please be concise and respond with code only. Please use the following format: function share_files(files: string[]) { ... }",
    },
  ],
};

const sendTaskRequest: SendTaskRequest = {
  method: "tasks/send",
  params: {
    id: `task-${Date.now()}`,
    message: message,
  },
};

describe("Deployment", () => {
  it("should deploy test logic", async () => {
    const requests: SendTaskRequest[] = [
      sendTaskRequest,
      {
        method: "tasks/send",
        params: {
          id: `task-${Date.now()}-2`,
          message: message2,
        },
      },
    ];
    logDebug("testDeployment", "Starting testDeployment test...");
    const results: (Task | ServerDeploymentResponse)[] = [];
    for await (const result of testDeployment(testParams, requests)) {
      logDebug("testDeployment", "Received result:", JSON.stringify(result));
      if (result) {
        results.push(result);
      }
    }
    logDebug("testDeployment", "testDeployment test finished.");
    expect(results).toHaveLength(4);
  });

  it("should bundle and deploy test logic", async () => {
    const requests: SendTaskRequest[] = [
      sendTaskRequest,
      {
        method: "tasks/send",
        params: {
          id: `task-${Date.now()}-2`,
          message: message2,
        },
      },
    ];
    logDebug("testDeployment", "Starting testDeployment test...");
    const results: (Task | ServerDeploymentResponse)[] = [];
    for await (const result of testDeployment(coderTestParams, requests)) {
      logDebug("testDeployment", "Received result:", JSON.stringify(result));
      if (result) {
        results.push(result);
      }
    }
    while (true && results.length < 4) {
      await new Promise((resolve) => setTimeout(resolve, 10));
    }
    logDebug("testDeployment", "testDeployment test finished.");
    expect(results).toHaveLength(4);
  }, 90000);

  it("should bundle and deploy typescript test logic", async () => {
    const requests: SendTaskRequest[] = [
      sendTaskRequest,
      {
        method: "tasks/send",
        params: {
          id: `task-${Date.now()}-2`,
          message: message2,
        },
      },
    ];
    logDebug("testDeployment", "Starting testDeployment test...");
    const results: (Task | ServerDeploymentResponse)[] = [];
    for await (const result of testDeployment(ts_coderTestParams, requests)) {
      logDebug("testDeployment", "Received result:", JSON.stringify(result));
      if (result) {
        results.push(result);
      }
    }
    while (true && results.length < 4) {
      await new Promise((resolve) => setTimeout(resolve, 10));
    }
    logDebug("testDeployment", "testDeployment test finished.");
    expect(results).toHaveLength(4);
  }, 90000);
});
