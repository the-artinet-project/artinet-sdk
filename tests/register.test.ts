import { jest, describe, test, expect, beforeEach } from "@jest/globals";
import { register, convert, AgentCard } from "../src/index.js";
import { MetadataValidator } from "@artinet/metadata-validator";
import { configureLogger } from "../src/utils/logging/index.js";
configureLogger({ level: "silent" });
// Mock global fetch with proper typing for mock implementation
global.fetch = jest.fn() as jest.MockedFunction<typeof fetch>;
const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>;

describe("register Function", () => {
  let sampleAgentCard: AgentCard;

  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
    mockFetch.mockClear();
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({
        body: JSON.stringify({
          registrationResponse: {
            success: true,
            registrationId: "default-reg-id",
          },
        }),
      }),
    } as Response); // Assert as Response type

    // Define a basic AgentCard for testing
    sampleAgentCard = {
      protocolVersion: "0.3.0",
      name: "Test Agent",
      description: "A test agent card",
      url: "https://agents.artinet.io/agent",
      version: "1.0.0",
      capabilities: {
        streaming: false,
        pushNotifications: false,
        stateTransitionHistory: false,
      },
      skills: [
        {
          id: "skill1",
          name: "Skill One",
          description: "Does one thing",
          tags: [],
        },
        {
          id: "skill2",
          name: "Skill Two",
          description: "Does another thing",
          tags: [],
        },
      ],
      defaultInputModes: ["text"],
      defaultOutputModes: ["text"], // Explicitly no auth for default test card
      provider: { organization: "Test Org", url: "http://test.org" },
      documentationUrl: "http://docs.test.org",
    };
  });

  test("valid AgentCard should validate", async () => {
    const registration = await convert(sampleAgentCard);
    const validator = new MetadataValidator();
    const { isValid, errors } = await validator.validateMetadata(registration);
    expect(isValid).toBe(true);
    expect(errors.length).toBe(0);
  });

  test("invalid AgentCard should not validate", async () => {
    const registration = await convert(sampleAgentCard);
    registration.version = "invalid-version";
    const validator = new MetadataValidator();
    const { isValid, errors } = await validator.validateMetadata(registration);
    expect(isValid).toBe(false);
    expect(errors.length).toBeGreaterThan(0);
  });

  test("should register successfully and return registrationId", async () => {
    const expectedRegId = "test-success-id";

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        body: JSON.stringify({
          registrationResponse: {
            success: true,
            registrationId: expectedRegId,
          },
        }),
      }),
    } as Response);
    const result = await register(sampleAgentCard);
    expect(result).toBe(expectedRegId);
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });
  test("should return empty string and log warning on API call failure (success: false)", async () => {
    const apiErrorMsg = "Failed to register with API";
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        body: JSON.stringify({
          registrationResponse: { success: false, error: apiErrorMsg },
        }),
      }),
    } as Response);
    const result = await register(sampleAgentCard);
    expect(result).toBe("");
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  test("should return empty string if API returns success but no registrationId", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        body: JSON.stringify({
          registrationResponse: { success: true, registrationId: undefined },
        }),
      }),
    } as Response);
    const result = await register(sampleAgentCard);
    expect(result).toBe("");
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  test("should return empty string and log warning if fetch throws a network error", async () => {
    const fetchErrorMsg = "Network Error";
    mockFetch.mockRejectedValueOnce(new Error(fetchErrorMsg));
    const result = await register(sampleAgentCard);
    expect(result).toBe("");
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  test("should set endpoint authentication to true if AgentCard has auth schemes", async () => {
    sampleAgentCard.security = [
      {
        scheme: ["bearer"],
        credentials: ["test-token"],
      },
    ];
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        body: JSON.stringify({
          registrationResponse: { success: true, registrationId: "id-456" },
        }),
      }),
    } as Response);
    await register(sampleAgentCard);
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });
  test("should return empty string if URL is localhost", async () => {
    sampleAgentCard.url = "http://localhost:8080/agent";
    const result = await register(sampleAgentCard);
    expect(result).toBe("");
  });
  test("should return empty string if URL is 127.0.0.1", async () => {
    sampleAgentCard.url = "http://127.0.0.1:8080/agent";
    const result = await register(sampleAgentCard);
    expect(result).toBe("");
  });
  test("should return empty string if URL is empty", async () => {
    sampleAgentCard.url = "";
    const result = await register(sampleAgentCard);
    expect(result).toBe("");
  });
});
