/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
import { A2A, core } from "~/types/index.js";
import { logger } from "~/config/index.js";
import { TaskStore, ServerCallContext } from "@a2a-js/sdk/server";
import { handleUpdate } from "~/services/a2a/handlers/update.js";
import { v4 } from "uuid";
import { getCurrentTimestamp } from "~/utils/utils.js";

/**In a perfect world, the surface of PushNotificationStore and TaskStore would be aligned*/
interface Loadable<T, Context extends ServerCallContext = ServerCallContext> {
  load(id: string, context?: Context): Promise<T | undefined>;
  save(data: T, context?: Context, id?: string): Promise<void>;
}

type Context = Partial<A2A.Context> & ServerCallContext;
class LoadManager<T> implements core.Manager<T> {
  constructor(private readonly _loadable: Loadable<T>) {}
  async get(id: string, _context?: Context): Promise<T | undefined> {
    return await this._loadable.load(id, _context);
  }
  async set(id: string, data?: T, context?: Context): Promise<void> {
    return await this._loadable.save(data!, context, id);
  }
  async delete(id: string): Promise<void> {
    logger.warn("Delete not supported for loadable", { id });
    return;
  }
  async has(id: string): Promise<boolean> {
    return (await this._loadable.load(id)) !== undefined;
  }
  async list(): Promise<T[]> {
    logger.warn("List not supported for loadable");
    return [];
  }
}

class TaskManager extends LoadManager<A2A.Task> implements A2A.Tasks {
  constructor(_loadable: TaskStore) {
    super(_loadable);
  }
  async update(context: A2A.Context, update: A2A.Update): Promise<A2A.Task> {
    logger.info(`TaskManager[update]: updating task`, {
      taskId: context.taskId,
    });
    logger.debug(`TaskManager[update]: update`, { update });
    logger.debug(`TaskManager[update]: context`, { context });
    const task = await handleUpdate({
      context,
      task: await context.getTask(),
      update,
    });
    logger.debug(`TaskManager[update]: task`, task);
    await this.set(task.id, task);
    return task;
  }
  async create(params: Partial<A2A.Task>): Promise<A2A.Task> {
    if (params.id) {
      const task = await this.get(params.id);
      if (task) {
        return task;
      }
    }
    logger.info(`TaskManager[create]: creating task`, { id: params.id });
    const task: A2A.Task = {
      ...params,
      id: params.id ?? v4(),
      contextId: params.contextId ?? v4(),
      kind: "task",
      status: {
        state: A2A.TaskState.submitted,
        timestamp: getCurrentTimestamp(),
      },
    };
    logger.debug(`TaskManager[create]:`, { taskId: task.id });
    await this.set(task.id, task);
    return task;
  }
}

export const tasks = (taskStore: TaskStore): A2A.Tasks => {
  return new TaskManager(taskStore);
};
