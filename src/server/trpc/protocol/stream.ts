import { UpdateEvent } from "../../../types/index.js";
import { Context, execute, ExecutionEngine } from "./index.js";
import { ServiceInterface } from "../services/interfaces/service.js";

export class ExecutionStream {
  private contextId: string | null = null;
  private completed: boolean = false;
  private updates: UpdateEvent[] = [];
  private executionContext: Context | null = null;
  constructor(executionContext?: Context) {
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
  addUpdate(update: UpdateEvent) {
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
  setExecutionContext(executionContext: Context) {
    this.executionContext = executionContext;
    this.contextId = executionContext.events.contextId;
  }
  async *stream(engine: ExecutionEngine<Context>, service?: ServiceInterface) {
    let executionError: Error | null = null;

    const executePromise = (
      service
        ? service.execute(engine, this.getExecutionContext())
        : execute(engine, this.getExecutionContext())
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
