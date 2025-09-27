/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
import { UpdateEvent, TaskHandler } from "../../interfaces/services/a2a/index.js";
import { Client } from "../../interfaces/client.js";
/**
 * Represents a proxy function for sending task yield updates.
 * This function is typically provided by the host environment to allow
 * an agent to communicate updates about its task execution.
 * @param updateEvent - The update object yielded by the task.
 * @returns A promise that resolves when the update has been processed.
 */
export type TaskProxy = (updateEvent: UpdateEvent) => Promise<void>;
/**
 * Properties for the TaskManager function.
 */
export interface TaskManagerProps {
    /**
     * The core task-handling generator function of an agent.
     * This function takes a `TaskContext` and yields `UpdateEvent` objects,
     * eventually returning a `Task` or void.
     */
    taskHandler: TaskHandler;
}
/**
 * Defines the signature for a TaskManager function.
 * An AgentExecutor is responsible for orchestrating the execution of an agent's task,
 * typically by interfacing with a host environment.
 * @param props - The properties for the agent executor, including the taskHandler.
 * @returns A promise that resolves when the task handler has completed.
 */
export type AgentExecutor = (props: TaskManagerProps) => Promise<void>;
/**
 * @deprecated Use AgentExecutor instead.
 * A TaskManager is responsible for orchestrating the execution of an agent's task,
 * typically by interfacing with a host environment.
 * @param props - The properties for the task manager, including the taskHandler.
 * @returns A promise that resolves when the task handler has completed.
 */
export type TaskManager = AgentExecutor;
/**
 * Properties for the Connect function.
 * These properties are used when an agent needs to establish a connection
 * or send a request to another agent or an external service (e.g., an LLM).
 */
export interface ConnectProps {
    /**
     * The identifier of the target agent or LLM to which the request is directed.
     */
    agentId: string;
    /**
     * An array of messages forming the conversation history or prompt.
     * Each message should have a `role` (e.g., "user", "assistant") and `content`.
     */
    messages: {
        role: string;
        content: string;
    }[];
}
/**
 * Defines the signature for a Connect function.
 * This function is used by agents to make external calls, such as to LLMs or other agents,
 * often proxied by a host environment.
 * @param props - The properties for the connect call, including agentID and messages.
 * @returns A promise that resolves to a string, which could be a response from the
 *          target or a connection identifier.
 */
export type ConnectAPICallback = (props: ConnectProps) => Promise<string>;
/**
 * Represents a proxy for a client, providing a subset of `Client` functionalities.
 * This interface omits methods related to direct task management and header manipulation,
 * focusing on core interaction capabilities suitable for a proxied environment.
 */
export interface ClientProxy extends Omit<Client, "sendTaskSubscribe" | "getTask" | "cancelTask" | "getTaskPushNotification" | "setTaskPushNotification" | "resubscribeTask" | "refreshAgentCard" | "setHeaders" | "addHeader" | "removeHeader" | "clearHeaders"> {
}
/**
 * Properties for the ClientFactory function.
 * These properties are used to configure and create a `ClientProxy` instance.
 */
export interface ClientProps {
    /**
     * The base URL for the client to connect to.
     * Can be a URL object or a string.
     */
    baseUrl: URL | string;
    /**
     * Optional record of headers to be included in client requests.
     */
    headers?: Record<string, string>;
    /**
     * Optional fallback path for client requests.
     */
    fallbackPath?: string;
}
/**
 * Defines the signature for a ClientFactory function.
 * A ClientFactory is responsible for creating `ClientProxy` instances,
 * allowing agents to interact with services or other agents.
 * @param props - The properties required to configure the client.
 * @returns A `ClientProxy` instance.
 */
export type ClientFactory = (props: ClientProps) => ClientProxy;
//# sourceMappingURL=proxy.d.ts.map