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
  fullDeployment,
  TaskSendParams,
} from "../src/index.js";
import { logDebug } from "../src/utils/logging/log.js";
import { A2AClient } from "../src/index.js";

configureLogger({ level: "trace" });

// Set a reasonable timeout for all tests
jest.setTimeout(10000);

const basicTest = "throw new Error('test'); export default 'ok';";
const coderCode = await bundle(
  new URL("../examples/code-deployment.js", import.meta.url)
);
const ts_coderCode = await bundle(
  new URL("../examples/code-deployment.ts", import.meta.url)
);

const nestedTestCode = await bundle(
  new URL("../examples/nested-deployment.ts", import.meta.url)
);

const MOCK_AGENT_CARD: AgentCard = {
  name: "Quick-Agent-v0",
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

const MOCK_AGENT_CARD_NESTED: AgentCard = {
  name: "Quick-Agent-v0-Nested",
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

const nestedTestParams: ServerDeploymentRequestParams = {
  name: "Nested Agent",
  agentCard: MOCK_AGENT_CARD_NESTED,
  code: nestedTestCode,
};

const fullTestParams: ServerDeploymentRequestParams = {
  name: "Quick-Agent-v0",
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

describe("TestDeployment", () => {
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
    expect(results.length).toBeGreaterThanOrEqual(4);
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
    expect(results.length).toBeGreaterThanOrEqual(4);
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
    expect(results.length).toBeGreaterThanOrEqual(4);
  }, 90000);

  it("should test nested deployment", async () => {
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
    for await (const result of testDeployment(nestedTestParams, requests)) {
      logDebug("testDeployment", "Received result:", JSON.stringify(result));
      if (result) {
        results.push(result);
      }
    }
    while (true && results.length < 4) {
      await new Promise((resolve) => setTimeout(resolve, 10));
    }
    logDebug("testDeployment", "testDeployment test finished.");
    console.log("results: ", JSON.stringify(results, null, 2));
    expect(results.length).toBeGreaterThanOrEqual(2);
  }, 90000);
});

describe("FullDeployment", () => {
  //ensure valid API Key is set
  it.skip("should fully deploy test logic", async () => {
    logDebug("testDeployment", "Starting fullDeployment test...");
    const deployment = await fullDeployment(fullTestParams);
    expect(deployment).toBeDefined();
    expect(deployment.error).toBeUndefined();
    logDebug("testDeployment", "fullDeployment test finished.");
  }, 90000);

  it.skip("should fully deploy nested test logic", async () => {
    logDebug("testDeployment", "Starting fullDeployment test...");
    const deployment = await fullDeployment(nestedTestParams);
    expect(deployment).toBeDefined();
    expect(deployment.error).toBeUndefined();
    logDebug("testDeployment", "fullDeployment test finished.");
  }, 90000);

  it("should access deployed agent", async () => {
    logDebug("testDeployment", "Starting fullDeployment test...");
    const client = new A2AClient(
      "https://agents.artinet.io/agentId=0x88a03f820c633d580f37e9dae1487a32ae2f59b42eafe0f8396c5a902507f349",
      {},
      "/agentId=0x88a03f820c633d580f37e9dae1487a32ae2f59b42eafe0f8396c5a902507f349/agent-card"
    );
    const card = await client.agentCard();
    const asCard = card as AgentCard;
    logDebug("testDeployment", "agentCard:", JSON.stringify(asCard));
    expect(asCard).toBeDefined();
    console.log(asCard);
    logDebug("testDeployment", "fullDeployment test finished.");
  }, 90000);

  it("should execute task on deployed agent", async () => {
    logDebug("testDeployment", "Starting fullDeployment test...");
    const client = new A2AClient(
      "https://agents.artinet.io/agentId=0x88a03f820c633d580f37e9dae1487a32ae2f59b42eafe0f8396c5a902507f349",
      {},
      "/agentId=0x88a03f820c633d580f37e9dae1487a32ae2f59b42eafe0f8396c5a902507f349/.well-known/agent.json"
    );
    const params: TaskSendParams = {
      message: message,
      id: `task-${Date.now()}`,
    };
    const task = await client.sendTask(params);
    logDebug("testDeployment", "task:", JSON.stringify(task));
    expect(task).toBeDefined();
    expect(task?.status.state).toBe("completed");
    console.log(task);
    console.log(task?.status.message);
    logDebug("testDeployment", "fullDeployment test finished.");
  }, 90000);

  it("should execute task on nested deployed agent", async () => {
    logDebug("testDeployment", "Starting fullDeployment test...");
    const client = new A2AClient(
      "https://agents.artinet.io/agentId=0x350dd68abd99508c3acc5c61d889fe2f83e4cb5dc8740af0cf7444be9ca686af",
      {},
      "/0x350dd68abd99508c3acc5c61d889fe2f83e4cb5dc8740af0cf7444be9ca686af/agent-card"
    );
    const params: TaskSendParams = {
      message: message,
      id: `task-${Date.now()}`,
    };
    const task = await client.sendTask(params);
    logDebug("testDeployment", "task:", JSON.stringify(task));
    expect(task).toBeDefined();
    expect(task?.status.state).toBe("completed");
    console.log(task);
    console.log(task?.status.message);
    logDebug("testDeployment", "fullDeployment test finished.");
  }, 90000);
});
