/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */

import { A2A } from "~/types/index.js";
import { getLatestHistory } from "../helpers/index.js";
import { INTERNAL_ERROR } from "~/utils/index.js";
import { logger } from "~/config/index.js";

export const sendMessage: A2A.RequestHandler["sendMessage"] = async (
  { configuration }: A2A.MessageSendParams,
  context?: A2A.Context
): Promise<A2A.SendMessageSuccessResult> => {
  if (!context) {
    throw INTERNAL_ERROR({ error: { message: "Context is required" } });
  }

  const service = context.service;

  let task: A2A.Task;
  if (configuration?.blocking === false) {
    task = await Promise.race([
      service.execute({ engine: service.engine, context }).then(async () => {
        return await context.getTask();
      }),
      new Promise<A2A.Task>((resolve) => {
        context.publisher.on("start", (_, task: A2A.Task) => {
          resolve(task);
        });
      }),
    ]);
  } else {
    await service.execute({ engine: service.engine, context });
    task = await context.getTask();
  }

  task.history = getLatestHistory(task, configuration?.historyLength);
  return task;
};

export type SendMessageHandler = typeof sendMessage;

/**
 * @deprecated Use SendMessageHandler instead
 */
export type SendMessageMethod = SendMessageHandler;
