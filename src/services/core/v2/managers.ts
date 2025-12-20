/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */

import { v2 } from "~/types/interfaces/services/v2/index.js";
import { A2A } from "~/types/index.js";
import { Stream } from "./streams.js";
import {
  createBaseContext,
  createContextV2,
} from "~/services/a2a/factory/context.js";
import { v4 } from "uuid";
import { Messenger } from "./messenger.js";
import { getCurrentTimestamp } from "~/utils/index.js";

//TODO: This is a valid core implementation, the ones below are not
export abstract class Manager<T> {
  constructor(
    private _data: Map<string, T> = new Map(),
    private throwOnSet: boolean = true
  ) {}
  get data(): Map<string, T> {
    return this._data;
  }
  async set(id: string, data?: T): Promise<void> {
    if (!data && this.throwOnSet) {
      throw new Error("Data is required");
    } else if (!data) {
      return;
    }
    this.data.set(id, data);
  }
  async get(id: string): Promise<T | undefined> {
    return this.data.get(id);
  }
  async delete(id: string): Promise<void> {
    this.data.delete(id);
  }
  async has(id: string): Promise<boolean> {
    return this.data.has(id);
  }
  async list(): Promise<T[]> {
    return Array.from(this.data.values());
  }
}

//TODO:move to A2A
export class Cancellations
  extends Manager<void>
  implements v2.a2a.Cancellations
{
  constructor(cancellations: Map<string, void> = new Map()) {
    super(cancellations, false);
  }
}

export class Connections extends Manager<void> implements v2.a2a.Connections {
  constructor(connections: Map<string, void> = new Map()) {
    super(connections, false);
  }
}

export class Contexts
  extends Manager<v2.a2a.Context>
  implements v2.a2a.Contexts
{
  constructor(contexts: Map<string, v2.a2a.Context> = new Map()) {
    super(contexts, true);
  }
  async create(params: v2.a2a.ContextParams): Promise<v2.a2a.Context> {
    if (await this.has(params.contextId)) {
      return (await this.get(params.contextId))!;
    }
    const baseContext: v2.a2a.BaseContext = createBaseContext(params);
    const context: v2.a2a.Context = {
      ...createContextV2({
        baseContext: baseContext,
        taskId: params.taskId ?? v4(),
        messenger: params.messenger,
        references: params.references,
        extensions: params.extensions,
      }),
      ...params,
    };
    return context;
  }
}

export class Tasks extends Manager<A2A.Task> implements v2.a2a.Tasks {
  constructor(tasks: Map<string, A2A.Task> = new Map()) {
    super(tasks, true);
  }
  async create(params: Partial<A2A.Task>): Promise<A2A.Task> {
    if (params.id && (await this.has(params.id))) {
      return (await this.get(params.id))!;
    }
    return {
      ...params,
      id: params.id ?? v4(),
      contextId: params.contextId ?? v4(),
      kind: "task",
      status: {
        state: A2A.TaskState.submitted,
        timestamp: getCurrentTimestamp(),
      },
    };
  }
}

export class Streams extends Manager<v2.a2a.Stream> implements v2.a2a.Streams {
  constructor(streams: Map<string, v2.a2a.Stream> = new Map()) {
    super(streams, true);
  }
  async create({
    contextId,
    context,
    updates,
  }: v2.core.Optional<v2.a2a.Stream> & {
    context: v2.a2a.Context;
  }): Promise<v2.a2a.Stream> {
    if (await this.has(contextId)) {
      throw new Error("Stream already exists");
    }
    await this.set(contextId, new Stream(contextId, context, updates));
    return (await this.get(contextId))!;
  }
}
