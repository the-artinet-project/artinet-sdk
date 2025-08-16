import { TaskState, UpdateEvent } from "../../../types/index.js";
import { Context, execute } from "../protocol/index.js";

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
  async *stream(
    engine: (request: any) => AsyncGenerator<any, void, undefined>
  ) {
    const executePromise = execute(engine, this.getExecutionContext())
      .catch((error) => {
        console.error("stream/error[", this.contextId, "]", error);
      })
      .finally(() => {
        this.setCompleted();
      });

    while (!this.isCompleted() || this.getUpdates().length > 0) {
      if (this.getUpdates().length > 0) {
        yield this.getUpdates().shift()!;
      }
      await new Promise((resolve) => setTimeout(resolve, 10));
    }
    await executePromise;
    this.setCompleted();
    // const state = this.getExecutionContext().events.getState();
    // let toReturn = state?.task ?? state;
    // console.log("stream/toReturn", toReturn);
    // yield {
    //   ...toReturn,
    //   status: {
    //     ...toReturn.status,
    //     state: TaskState.completed,
    //   },
    //   final: false,
    // };
  }
}
