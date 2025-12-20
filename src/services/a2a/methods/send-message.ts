/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */

import { createContext } from "../factory/context.js";
import { A2A, MethodParams, A2ARuntime } from "~/types/index.js";
import { getLatestHistory } from "../helpers/index.js";

export async function sendMessage(
  input: A2ARuntime["command"],
  params: MethodParams
): Promise<A2A.SendMessageSuccessResult> {
  const { service, engine, contextManager, signal } = params;
  const contextId: string | null | undefined = input.message.contextId;
  const context: A2ARuntime["context"] = createContext(
    input,
    service,
    contextManager,
    signal,
    contextId ?? undefined,
    service.eventOverrides
  );

  context.events.on("complete", () => {
    contextManager.deleteContext(context.events.contextId);
  });
  context.events.on("error", () => {
    context.events.onComplete();
  });
  if (input.configuration?.blocking === false) {
    const result: A2A.SendMessageSuccessResult = await Promise.race([
      service.execute(engine, context).then(() => {
        const state: A2ARuntime["state"] = context.events.getState();
        return state.task ?? state;
      }),
      new Promise<A2A.SendMessageSuccessResult>((resolve) => {
        context.events.on("start", (_, state: A2ARuntime["state"]) => {
          resolve(state.task ?? state);
        });
      }),
    ]);
    return result;
  }
  await service.execute(engine, context);
  const state: A2ARuntime["state"] = context.events.getState();
  const task: A2A.Task = state.task ?? state;
  task.history = getLatestHistory(task, input.configuration?.historyLength);
  return task;
}

export type SendMessageMethod = typeof sendMessage;
import { v2 } from "~/types/interfaces/services/v2/index.js";
import { INTERNAL_ERROR } from "~/utils/index.js";

export const sendMessageV2: v2.a2a.RequestHandler["sendMessage"] = async (
  { configuration }: A2A.MessageSendParams,
  context?: v2.a2a.Context
): Promise<A2A.SendMessageSuccessResult> => {
  if (!context) {
    throw INTERNAL_ERROR({ error: { message: "Context is required" } });
  }
  context.publisher.on("complete", () => {
    context.service.contexts.delete(context.contextId);
  });

  context.publisher.on("error", () => {
    context.publisher.onComplete();
  });

  const service = context.service;
  if (configuration?.blocking === false) {
    const result: A2A.SendMessageSuccessResult = await Promise.race([
      service.execute({ engine: service.engine, context }).then(async () => {
        return await context.getTask();
      }),
      new Promise<A2A.SendMessageSuccessResult>((resolve) => {
        context.publisher.on("start", (_, task: A2A.Task) => {
          resolve(task);
        });
      }),
    ]);
    return result;
  }

  await service.execute({ engine: service.engine, context });
  const task: A2A.Task = await context.getTask();
  task.history = getLatestHistory(task, configuration?.historyLength);
  return task;
};
