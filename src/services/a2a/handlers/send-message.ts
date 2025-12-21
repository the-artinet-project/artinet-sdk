/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */

import { A2A } from "~/types/index.js";
import { getLatestHistory } from "../helpers/index.js";
import { v2 } from "~/types/interfaces/services/v2/index.js";
import { INTERNAL_ERROR } from "~/utils/index.js";

export const sendMessage: v2.a2a.RequestHandler["sendMessage"] = async (
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

export type SendMessageHandler = typeof sendMessage;

/**
 * @deprecated Use SendMessageHandler instead
 */
export type SendMessageMethod = SendMessageHandler;
