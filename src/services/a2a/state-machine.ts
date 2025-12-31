import { EventEmitter } from "events";
import { A2A } from "~/types/index.js";
import { INTERNAL_ERROR } from "~/utils/index.js";
import { logger } from "~/config/index.js";
import { createStateMachine } from "./factory/state-machine.js";

export class StateMachine
  extends EventEmitter<A2A.Emissions>
  implements A2A.EventPublisher
{
  onStart = async (context: A2A.Context): Promise<A2A.Task> => {
    if (this.consumer.onStart) {
      this.currentTask = await this.consumer.onStart(context);
    }
    this.emit("start", context.messages, this.currentTask);
    return this.currentTask;
  };

  onCancel = async (update: A2A.Update): Promise<void> => {
    if (this.consumer.onCancel) {
      await this.consumer.onCancel(update, this.currentTask);
    }
    this.emit("cancel", update);
  };

  onUpdate = async (update: A2A.Update): Promise<A2A.Task> => {
    if (this.consumer.onUpdate) {
      this.currentTask = await this.consumer.onUpdate(update, this.currentTask);
    } else {
      logger.warn(
        `onUpdate[${this.contextId}]:`,
        "onUpdate callback not found"
      );
      this.currentTask = update as unknown as A2A.Task;
    }
    this.emit("update", this.currentTask, update);
    return this.currentTask;
  };

  onError = async (error: any): Promise<void> => {
    if (this.consumer.onError) {
      await this.consumer.onError(error, this.currentTask);
    }
    if (!this.listenerCount("error")) return;

    this.emit("error", error, this.currentTask);
  };

  onComplete = async (): Promise<void> => {
    if (this.consumer.onComplete) {
      await this.consumer.onComplete(this.currentTask);
    }
    this.emit("complete", this.currentTask);
  };

  constructor(
    readonly _contextId: string,
    private readonly _consumer: A2A.EventConsumer,
    private _currentTask: A2A.Task
  ) {
    super();
  }

  get currentTask(): A2A.Task {
    if (!this._currentTask) {
      throw INTERNAL_ERROR({
        error: { message: "state machine is not initialized" },
      });
    }
    return this._currentTask;
  }

  private set currentTask(task: A2A.Task) {
    this._currentTask = task;
  }

  get consumer(): A2A.EventConsumer {
    return this._consumer;
  }

  get contextId(): string {
    return this._contextId;
  }

  static create(
    contextId: string,
    service: A2A.Service,
    task: A2A.Task,
    overrides?: Partial<Omit<A2A.EventConsumer, "contextId">>
  ): StateMachine {
    return createStateMachine({
      contextId,
      service,
      task,
      overrides,
    }) as StateMachine;
  }
}
