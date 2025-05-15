import { IRegistration, MetadataValidator } from "@artinet/metadata-validator";
import { AgentCard, AgentSkill } from "../../types/index.js";
import { logDebug, logInfo, logWarn } from "../logging/log.js";

/**
 * Registers an agent with the A2A registry.
 * @param metadata The metadata to register.
 * @returns A promise that resolves to the registration ID.
 */
export async function apiRegister(
  metadata: string
): Promise<{ success: boolean; registrationId?: string; error?: string }> {
  const restResponse: any = await fetch("https://api.artinet.io/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Methods": "*",
      "Access-Control-Allow-Credentials": "true",
    },
    body: JSON.stringify({
      registrationPayload: metadata,
    }),
  });
  const response = await restResponse.json();
  return JSON.parse(response.body).registrationResponse;
}

/**
 * Converts an AgentCard object into a RegistrationSchema object.
 * @param card The AgentCard to convert.
 * @returns A RegistrationSchema object.
 */
export function convert(card: AgentCard): IRegistration {
  // Extract skill names for capabilities and tags, limiting capabilities to 5
  const skillNames = card.skills.map((skill: AgentSkill) => skill.name);
  const capabilities = skillNames.slice(0, 5) as IRegistration["capabilities"]; // Type assertion based on slice limit

  // Determine if authentication is required based on the agent card, ensuring type is boolean | undefined
  const requiresAuth = card.authentication
    ? card.authentication.schemes.length > 0
    : undefined;

  const registration: IRegistration = {
    schemaVersion: "1.0.0",
    serviceName: card.name,
    description:
      card.description ?? "sdk-generated registration for " + card.name,
    version: card.version,
    capabilities: capabilities,
    tags: ["a2a"],
    communication: {
      endpoints: [
        {
          url: card.url,
          type: "jsonrpc",
          authentication: requiresAuth,
          description: "Primary agent interaction endpoint",
          protocols: ["jsonrpc-2.0", "a2a"],
        },
      ],
    },
    metadata: {
      agentCard: card,
    },
  };

  return registration;
}

/**
 * Registers an agent with the A2A registry.
 * @param card The AgentCard to register.
 * @returns A promise that resolves to the registration ID.
 */
export async function register(card: AgentCard): Promise<string> {
  if (!card) {
    logWarn("A2AServer", "No card provided");
    return "";
  }

  if (
    card.url === undefined ||
    card.url === null ||
    card.url === "" ||
    card.url.includes("localhost") ||
    card.url.includes("127.0.0.1")
  ) {
    logDebug("A2AServer", "Invalid URL provided", card.url);
    return "";
  }

  try {
    const registration = convert(card);
    logInfo("A2AServer", "Registration", registration);

    const validator = new MetadataValidator();
    const { isValid, error: validationError } =
      await validator.validateMetadata(registration);
    if (!isValid) {
      logDebug("A2AServer", "Validation failed", validationError);
      throw new Error(validationError);
    }
    const { success, error, registrationId } = await apiRegister(
      JSON.stringify(registration)
    );
    if (!success || !registrationId) {
      logDebug("A2AServer", "API registration failed", error);
      throw new Error(error);
    }

    logInfo("A2AServer", "Registration successful", registrationId);
    return registrationId;
  } catch (error) {
    //we dont want to throw an error here, because we want to allow the server to start even if registration fails
    //we will log the error and return an empty string
    //it is up to the developer to decide if they want to register their server or not
    logWarn("A2AServer", "Registration failed", error);
    return "";
  }
}
