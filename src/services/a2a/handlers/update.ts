/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */

import { getCurrentTimestamp, formatJson } from "~/utils/common/utils.js";
import { validateSchema } from "~/utils/common/schema-validation.js";
import { upsertArtifact } from "./artifact.js";
import { A2A } from "~/types/index.js";
import { logger } from "~/config/index.js";

export interface UpdateParams<Update extends A2A.Update = A2A.Update> {
  context: A2A.Context;
  task: A2A.Task;
  update: Update;
}

type Updater<Update extends A2A.Update> = (
  props: UpdateParams<Update>
) => Promise<A2A.Task>;

const isMessageInHistory = (task: A2A.Task, message: A2A.Message) => {
  return task.history?.find((msg) => msg.messageId === message.messageId);
};

const updateHistory = (task: A2A.Task, updateMessage: A2A.Message) => {
  if (!isMessageInHistory(task, updateMessage)) {
    task.history = [...(task.history ?? []), updateMessage];
  }
};

export const handleMessageUpdate: Updater<A2A.Message> = async ({
  task,
  update,
}: UpdateParams<A2A.Message>) => {
  const validated = await validateSchema(A2A.MessageSchema, update);
  if (validated.taskId && task.id !== validated.taskId) {
    throw new Error(
      `updateMessage: Invalid task id: incoming: ${
        validated.taskId
      } expected: ${task.id} ${formatJson({
        cause: {
          validated,
          actual: task.id,
          task,
        },
      })}`
    );
  }
  updateHistory(task, validated);
  return task;
};

export const handleTaskUpdate: Updater<A2A.Task> = async ({
  context,
  task,
  update,
}: UpdateParams<A2A.Task>) => {
  const validated = await validateSchema(A2A.TaskSchema, update);

  if (task.id !== validated.id) {
    throw new Error(
      `updateTask: Invalid task id: incoming: ${validated.id} expected: ${task.id}`,
      {
        cause: validated,
      }
    );
  }

  task = { ...task, ...validated };

  if (context.userMessage) {
    updateHistory(task, context.userMessage);
  }
  return task;
};

export const handleStatusUpdate: Updater<A2A.TaskStatusUpdateEvent> = async ({
  task,
  update,
}: UpdateParams<A2A.TaskStatusUpdateEvent>) => {
  const validated = await validateSchema(
    A2A.TaskStatusUpdateEventSchema,
    update
  );

  if (validated.taskId && task.id !== validated.taskId) {
    throw new Error(
      `updateTaskStatusUpdate: Invalid task id: incoming: ${validated.taskId} expected: ${task.id}`,
      { cause: validated }
    );
  }

  task.status = validated.status;
  task.status.timestamp = getCurrentTimestamp();
  if (validated.status.message) {
    updateHistory(task, validated.status.message);
  }
  return task;
};

export const handleArtifactUpdate: Updater<
  A2A.TaskArtifactUpdateEvent
> = async ({ task, update }: UpdateParams<A2A.TaskArtifactUpdateEvent>) => {
  const validated = await validateSchema(
    A2A.TaskArtifactUpdateEventSchema,
    update
  );

  if (validated.taskId && task.id !== validated.taskId) {
    throw new Error(
      `updateTaskArtifactUpdate: Invalid task id: incoming: ${validated.taskId} expected: ${task.id}`,
      {
        cause: validated,
      }
    );
  }
  validated.taskId = task.id;

  task.artifacts = upsertArtifact(task.artifacts ?? [], validated);
  return task;
};
// The onus is now on the caller to handle errors when processing updates
// and to decide whether the updated task should be saved or not
export const handleUpdate: Updater<A2A.Update> = async ({
  context,
  task,
  update,
}: UpdateParams): Promise<A2A.Task> => {
  if (!update || !update.kind) {
    throw new Error("updateState: Invalid update", { cause: update });
  }

  logger.debug(`handleUpdate:`, {
    contextId: context?.contextId,
    taskId: task?.id,
  });

  task = await validateSchema(A2A.TaskSchema, task);

  if (!context || !context.contextId) {
    throw new Error("updateState: Invalid context", { cause: context });
  }

  switch (update.kind) {
    case A2A.Kind.message: {
      return handleMessageUpdate({
        context,
        task,
        update,
      });
    }
    case A2A.Kind.task: {
      return handleTaskUpdate({
        context,
        task,
        update,
      });
    }
    case A2A.Kind["status-update"]: {
      return handleStatusUpdate({
        context,
        task,
        update,
      });
    }
    case A2A.Kind["artifact-update"]: {
      return handleArtifactUpdate({
        context,
        task,
        update,
      });
    }
    default: {
      throw new Error(`updateState: Invalid update kind: {"kind": "unknown"}`, {
        cause: update,
      });
    }
  }
};
