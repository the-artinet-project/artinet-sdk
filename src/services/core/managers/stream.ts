import {
  StreamManagerInterface,
  ExecutionEngine,
  CoreContext,
  ServiceInterface,
  CoreCommand,
  CoreState,
  CoreUpdate,
} from "~/types/index.js";
import { coreExecute } from "../execution/execute.js";

export class StreamManager<
  TCommand extends CoreCommand = CoreCommand,
  TState extends CoreState = CoreState,
  TUpdate extends CoreUpdate = CoreUpdate,
> implements StreamManagerInterface<TCommand, TState, TUpdate>
{
  private contextId: string | null = null;
  private completed: boolean = false;
  private updates: TUpdate[] = [];
  private executionContext: CoreContext<TCommand, TState, TUpdate> | null =
    null;
  constructor(executionContext?: CoreContext<TCommand, TState, TUpdate>) {
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
    executionContext: CoreContext<TCommand, TState, TUpdate>
  ) {
    this.executionContext = executionContext;
    this.contextId = executionContext.events.contextId;
  }
  async *stream(
    engine: ExecutionEngine<TCommand, TState, TUpdate>,
    service?: ServiceInterface<TCommand, TState, TUpdate>
  ) {
    let executionError: Error | null = null;
    const context = this.getExecutionContext();

    context.events.on("update", (current, update) => {
      if (
        !context.isCancelled() &&
        current.task?.contextId === this.contextId
      ) {
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
      await new Promise((resolve) => setTimeout(resolve, 10));
    }

    await executePromise;
    this.setCompleted();

    if (executionError) {
      throw executionError;
    }
  }
}
