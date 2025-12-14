/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */

import { createContext } from "../factory/context.js";
import {
  SendMessageSuccessResult,
  MethodParams,
  Task,
  A2A,
} from "~/types/index.js";
import { getLatestHistory } from "../helpers/index.js";

export async function sendMessage(
  input: A2A["command"],
  params: MethodParams
): Promise<SendMessageSuccessResult> {
  const { service, engine, contextManager, signal } = params;
  const contextId: string | null | undefined = input.message.contextId;
  const context: A2A["context"] = createContext(
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
    const result: SendMessageSuccessResult = await Promise.race([
      service.execute(engine, context).then(() => {
        const state = context.events.getState();
        return state.task ?? state;
      }),
      new Promise<SendMessageSuccessResult>((resolve) => {
        context.events.on("start", (_, state: A2A["state"]) => {
          resolve(state.task ?? state);
        });
      }),
    ]);
    return result;
  }
  await service.execute(engine, context);
  const state: A2A["state"] = context.events.getState();
  const task: Task = state.task ?? state;
  task.history = getLatestHistory(task, input.configuration?.historyLength);
  return task;
}

export type SendMessageMethod = typeof sendMessage;
