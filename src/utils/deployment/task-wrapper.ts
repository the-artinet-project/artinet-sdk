import { Task, TaskContext, TaskYieldUpdate } from "../../index.js";
import { env } from "process";
import { logDebug, logError } from "../../utils/logging/log.js";
//todo: remove this function
export async function fetchAgentResponse(
  agentID: string,
  messages: { role: string; content: string }[]
): Promise<string> {
  try {
    logDebug("fetchAgentResponse: ", "messages: ", messages);
    const restResponse: any = await fetch("https://api.artinet.io/connect", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Methods": "*",
        "Access-Control-Allow-Credentials": "true",
      },
      body: JSON.stringify({
        identifier: agentID,
        session: messages,
        preferredEndpoint: "hf-inference",
        options: {
          isAuthRequired: false,
          isFallbackAllowed: true,
        },
      }),
    });

    logDebug("fetchAgentResponse: ", "restResponse: ", restResponse);
    if (!restResponse.ok) {
      throw new Error("Failed to fetch agent response");
    }

    const bodyJson = await restResponse.json();
    const innerResponse = JSON.parse(bodyJson.body);
    logDebug("fetchAgentResponse: ", "innerResponse:", innerResponse);

    const agentResponseArray = JSON.parse(innerResponse.agentResponse);
    logDebug("fetchAgentResponse: ", "agentResponseArray:", agentResponseArray);

    const generatedText = agentResponseArray[0]?.generated_text;
    logDebug("fetchAgentResponse: ", "generatedText:", generatedText);

    return generatedText;
  } catch (error: any) {
    logError("fetchAgentResponse: ", "Error fetching agent response:", error);
    return `Client error: Unfortunately, this agent is currently experiencing issues. Please try again later.`;
  }
}

/**
 * @fileoverview This module provides proxy functions for agent task handling and
 * fetching responses within a managed deployment environment. These proxies
 * abstract the communication with the host environment, allowing agent code to
 * remain clean and focused on its core logic.
 */

/**
 * Proxies task execution to a host-provided handler.
 * This function is intended to be used within an agent's code when deployed to a
 * managed environment. It takes the agent's core task-handling generator function
 * and iterates over its yielded updates, passing them to a `hostOnYield` function
 * made available in the `env` by the host environment.
 *
 * The `Context` (TaskContext) is also expected to be provided by the host environment via `env`.
 *
 * @param taskHandler - An asynchronous generator function that takes a `TaskContext`
 *                      and yields `TaskYieldUpdate` objects, eventually returning a `Task` or void.
 * @throws An error if the required `env.hostOnYield` or `env.Context` are not found,
 *         indicating an invalid runtime environment.
 */
export const taskHandlerProxy = async (
  taskHandler: (
    context: TaskContext
  ) => AsyncGenerator<TaskYieldUpdate, Task | void, unknown>
) => {
  if (!env.hostOnYield && !env.Context) {
    const err = new Error("invalid runtime environment");
    throw err;
  }
  const context = env.Context as unknown as TaskContext;
  const onYieldProxy = env.hostOnYield as unknown as (
    yieldValue: TaskYieldUpdate
  ) => Promise<void>;

  if (!onYieldProxy || !context) {
    const err = new Error("invalid runtime environment");
    throw err;
  }
  const generator = taskHandler(context);
  for await (const yieldValue of generator) {
    onYieldProxy(yieldValue);
  }
};

/**
 * Proxies requests to fetch responses from other agents or LLMs to a host-provided implementation.
 * This allows agents in a managed environment to make external calls (e.g., to an LLM)
 * without needing direct network access or credentials. The actual implementation of fetching
 * the response is delegated to `env.hostFetchResponse`, provided by the host environment.
 *
 * @param agentID - The identifier of the target agent or LLM to which the request is directed.
 * @param messages - An array of messages forming the conversation history or prompt.
 * @returns A promise that resolves to the string response from the target agent/LLM.
 * @throws An error if the required `env.hostFetchResponse` is not found,
 *         indicating an invalid runtime environment.
 */
export const fetchResponseProxy = async (
  agentID: string,
  messages: { role: string; content: string }[]
): Promise<string> => {
  if (!env.hostFetchResponse) {
    const err = new Error("invalid runtime environment");
    throw err;
  }
  const fetchResponseImpl = env.hostFetchResponse as unknown as (
    agentID: string,
    messages: { role: string; content: string }[]
  ) => Promise<string>;
  return fetchResponseImpl(agentID, messages);
};
