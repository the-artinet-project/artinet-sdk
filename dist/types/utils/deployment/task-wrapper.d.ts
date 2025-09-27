/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
import { AgentEngine } from "../../types/index.js";
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
 * The `Context` (ExecutionContext) is also expected to be provided by the host environment via `env`.
 * @deprecated This function is deprecated and will be removed in a future version. Use the `artinet.v0.agentExecutor` function instead.
 * @param taskHandler - An asynchronous generator function that takes a `ExecutionContext`
 *                      and yields `UpdateEvent` objects, eventually returning a `Task` or void.
 * @throws An error if the required `env.hostOnYield` or `env.Context` are not found,
 *         indicating an invalid runtime environment.
 */
export declare const taskHandlerProxy: (taskHandler: AgentEngine) => Promise<void>;
/**
 * Proxies requests to fetch responses from other agents or LLMs to a host-provided implementation.
 * This allows agents in a managed environment to make external calls (e.g., to an LLM)
 * without needing direct network access or credentials. The actual implementation of fetching
 * the response is delegated to `env.hostFetchResponse`, provided by the host environment.
 * @deprecated This function is deprecated and will be removed in a future version. Use the `Artinet.v0.connect` function instead.
 * @param agentID - The identifier of the target agent or LLM to which the request is directed.
 * @param messages - An array of messages forming the conversation history or prompt.
 * @returns A promise that resolves to the string response from the target agent/LLM.
 * @throws An error if the required `env.hostFetchResponse` is not found,
 *         indicating an invalid runtime environment.
 */
export declare const fetchResponseProxy: (agentID: string, messages: {
    role: string;
    content: string;
}[]) => Promise<string>;
//# sourceMappingURL=task-wrapper.d.ts.map