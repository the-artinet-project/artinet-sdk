/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ClientFactory,
  ClientProps,
  ClientProxy,
  ConnectAPICallback,
  ConnectProps,
  AgentExecutor,
  TaskManagerProps,
  TaskProxy,
} from "~/types/schemas/deployment/index.js";
import { Context as ExecutionContext } from "~/types/index.js";

const env = process.env;

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace artinet {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  export namespace v0 {
    /**
     * Manages the execution of an agent's task.
     * This function is intended to be used within an agent's code when deployed to a
     * managed environment. It takes the agent's core task-handling generator function
     * and iterates over its yielded updates, passing them to a proxy function
     * made available by the host environment.
     *
     * The `TaskContext` and the `TaskProxy` (for yielding updates) are expected
     * to be provided by the host environment via `process.env`.
     *
     * @param {TaskManagerProps} props - The properties for the task manager, including the taskHandler.
     * @param {function(TaskContext): AsyncGenerator<any, any, unknown>} props.taskHandler - An asynchronous generator function that takes a `TaskContext`
     * and yields updates, eventually returning a `Task` or void.
     * @returns {Promise<void>} A promise that resolves when the task handler has completed.
     * @throws An error if the `taskManagerStub` or `context` is not set in `process.env`,
     *         indicating an invalid runtime environment.
     */
    export const agentExecutor: AgentExecutor = async (props: TaskManagerProps) => {
      const { taskHandler } = props;
      if (!env.taskManagerStub && !env.context) {
        console.warn(
          "taskManager: taskManagerStub or context is not set",
          "task-manager"
        );
        return;
      }

      const context = env.context as unknown as ExecutionContext;
      const taskManagerProxy = env.taskManagerStub as unknown as TaskProxy;

      if (!taskManagerProxy || !context) {
        console.warn(
          "taskManager: taskManagerStub or context is not set",
          "task-manager"
        );
        return;
      }

      const generator = taskHandler(context);
      for await (const yieldValue of generator) {
        console.info("taskManager: yieldValue", "task-manager", yieldValue);
        taskManagerProxy(yieldValue);
      }
    };

    /**
     * Establishes a connection or sends a request to another agent or service.
     * This function proxies requests to a host-provided implementation, enabling
     * agents in a managed environment to make external calls (e.g., to an LLM or another agent)
     * without needing direct network access or credentials. The actual implementation
     * is delegated to `env.connectStub`, provided by the host environment.
     *
     * @param {ConnectProps} props - The properties for the connect call, including the target agentID and messages.
     * @param {string} props.agentID - The identifier of the target agent or LLM to which the request is directed.
     * @param {object[]} props.messages - An array of messages forming the conversation history or prompt.
     * @returns {Promise<string>} A promise that resolves to the string response from the target agent/LLM or a connection identifier.
     * @throws An error if `env.connectStub` is not found,
     *         indicating an invalid runtime environment.
     */
    export const connect: ConnectAPICallback = async (
      props: ConnectProps
    ): Promise<string> => {
      if (!env.connectStub) {
        throw new Error("connectStub is not set");
      }
      const connectProxy = env.connectStub as unknown as ConnectAPICallback;
      if (!connectProxy) {
        throw new Error("connectStub is not set");
      }
      return connectProxy(props);
    };

    /**
     * Creates a client proxy for interacting with other agents or services.
     * This function acts as a factory to obtain a `ClientProxy` instance.
     * The actual implementation of the client factory is delegated to `env.clientStub`,
     * provided by the host environment. This allows agents to communicate with
     * other entities in a managed environment without direct awareness of the
     * underlying communication mechanisms.
     *
     * @param {ClientProps} props - The properties for creating the client.
     * @returns {ClientProxy} A proxy object for interacting with a client service or agent.
     * @throws An error if `env.clientStub` is not found,
     *         indicating an invalid runtime environment.
     */
    export const agent: ClientFactory = (props: ClientProps): ClientProxy => {
      if (!env.clientStub) {
        throw new Error("clientStub is not set");
      }
      const clientProxy = env.clientStub as unknown as ClientFactory;
      if (!clientProxy) {
        throw new Error("clientStub is not set");
      }
      return clientProxy(props);
    };
  }
}
