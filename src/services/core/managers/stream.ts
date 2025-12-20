/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  StreamManagerInterface,
  ExecutionEngine,
  ServiceInterface,
  Core,
} from "~/types/index.js";
import { coreExecute } from "../execution/execute.js";
import { sleep } from "~/utils/common/utils.js";
const STREAM_INTERVAL = 10;
export class StreamManager<
  TCommand extends Core["command"] = Core["command"],
  TState extends Core["state"] = Core["state"],
  TUpdate extends Core["update"] = Core["update"]
> implements StreamManagerInterface<TCommand, TState, TUpdate>
{
  private contextId: string | null = null;
  private completed: boolean = false;
  private updates: TUpdate[] = [];
  private executionContext: Core<TCommand, TState, TUpdate>["context"] | null =
    null;
  constructor(executionContext?: Core<TCommand, TState, TUpdate>["context"]) {
    if (executionContext) {
      this.executionContext = executionContext;
      this.contextId = executionContext.events.contextId;
    }
    this.completed = false;
    this.updates = [];
  }
  getContextId() {
    if (!this.contextId) {
      throw new Error("Context id not set");
    }
    return this.contextId;
  }
  addUpdate(update: TUpdate) {
    this.updates.push(update);
  }
  getUpdates() {
    return this.updates;
  }
  isCompleted() {
    return this.completed;
  }
  setCompleted() {
    this.completed = true;
  }
  getExecutionContext() {
    if (!this.executionContext) {
      throw new Error("Execution context not set");
    }
    return this.executionContext;
  }
  setExecutionContext(
    executionContext: Core<TCommand, TState, TUpdate>["context"]
  ) {
    this.executionContext = executionContext;
    this.contextId = executionContext.events.contextId;
  }
  //TODO: use Params & make service mandatory for streamManager impls
  async *stream(
    engine: ExecutionEngine<TCommand, TState, TUpdate>,
    service?: ServiceInterface<TCommand, TState, TUpdate>
  ) {
    let executionError: Error | null = null;
    const context = this.getExecutionContext();

    context.events.on("update", (_, update) => {
      if (!context.isCancelled()) {
        this.addUpdate(update);
      }
    });

    const executePromise = (
      service ? service.execute(engine, context) : coreExecute(engine, context)
    )
      .catch((error: Error) => {
        executionError = error;
      })
      .finally(() => {
        this.setCompleted();
      });

    while (!this.isCompleted() || this.getUpdates().length > 0) {
      if (executionError) {
        throw executionError;
      }
      if (this.getUpdates().length > 0) {
        yield this.getUpdates().shift()!;
      }
      await sleep(STREAM_INTERVAL);
    }

    await executePromise;
    this.setCompleted();

    if (executionError) {
      throw executionError;
    }
  }
}
