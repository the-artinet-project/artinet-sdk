import { core, A2A } from "~/types/index.js";
import { Stream } from "./streams.js";
import {
  createBaseContext,
  createContext,
} from "~/services/a2a/factory/context.js";
import { v4 } from "uuid";
import { getCurrentTimestamp } from "~/utils/index.js";
import { handleUpdate } from "~/services/a2a/handlers/update.js";
import { Manager } from "~/services/core/manager.js";
import { logger } from "~/config/index.js";

export class Cancellations extends Manager<void> implements A2A.Cancellations {
  constructor(cancellations: Map<string, void> = new Map()) {
    super(cancellations, false);
  }
}

export class Connections extends Manager<void> implements A2A.Connections {
  constructor(connections: Map<string, void> = new Map()) {
    super(connections, false);
  }
}

export class Contexts extends Manager<A2A.Context> implements A2A.Contexts {
  constructor(contexts: Map<string, A2A.Context> = new Map()) {
    super(contexts, true);
  }
  async create(params: A2A.ContextParams): Promise<A2A.Context> {
    if (await this.has(params.contextId)) {
      logger.warn("Contexts[create]: context already exists", {
        contextId: params.contextId,
      });
      return (await this.get(params.contextId))!;
    }
    logger.info(`Contexts[create]: creating context`, {
      contextId: params.contextId,
    });
    logger.debug(`Contexts[create]: params`, { params });
    const baseContext: A2A.BaseContext = createBaseContext(params);
    const context: A2A.Context = {
      ...createContext({
        baseContext: baseContext,
        taskId: params.task?.id ?? params.taskId ?? v4(),
        messenger: params.messenger,
        references: params.references,
        extensions: params.extensions,
      }),
      // ...params,
    };
    logger.debug(`Contexts[create]: context`, context);
    await this.set(context.contextId, context);
    return context;
  }
}

export class Streams extends Manager<A2A.Stream> implements A2A.Streams {
  constructor(streams: Map<string, A2A.Stream> = new Map()) {
    super(streams, true);
  }
  async create({
    contextId,
    context,
    updates,
  }: core.Optional<A2A.Stream> & {
    context: A2A.Context;
  }): Promise<A2A.Stream> {
    if (await this.has(contextId)) {
      throw new Error("Stream already exists");
    }
    await this.set(contextId, new Stream(contextId, context, updates));
    return (await this.get(contextId))!;
  }
}

export class Tasks extends Manager<A2A.Task> implements A2A.Tasks {
  constructor(tasks: Map<string, A2A.Task> = new Map()) {
    super(tasks, true);
  }

  async update(context: A2A.Context, update: A2A.Update): Promise<A2A.Task> {
    logger.info(`Tasks[update]: updating task`, { taskId: context.taskId });
    const task = await handleUpdate({
      context,
      task: await context.getTask(),
      update,
    });
    logger.debug(`Tasks[update]: task`, task);
    await this.set(task.id, task);
    return task;
  }

  async create(params: Partial<A2A.Task>): Promise<A2A.Task> {
    if (params.id && (await this.has(params.id))) {
      return (await this.get(params.id))!;
    }
    logger.info(`Tasks[create]: creating task`, { id: params.id });
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
    logger.debug(`Tasks[create]:`, { taskId: task.id });
    await this.set(task.id, task);
    return task;
  }
}
