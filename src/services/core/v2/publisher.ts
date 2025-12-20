import { EventEmitter } from "events";
import { UpdateEvent } from "~/types/index.js";

import assert from "assert";
import { v2 } from "~/types/interfaces/services/v2/index.js";
import { A2A } from "~/types/index.js";
import { INTERNAL_ERROR } from "~/utils/index.js";
export class StateMachine
  extends EventEmitter<v2.a2a.Emissions>
  implements v2.a2a.EventPublisher
{
  onStart = async (context: v2.a2a.Context): Promise<A2A.Task> => {
    if (this.consumer.onStart) {
      this.currentTask = await this.consumer.onStart(context);
    }
    this.emit("start", context.messages, this.currentTask);
    return this.currentTask;
  };

  onCancel = async (update: UpdateEvent): Promise<void> => {
    if (this.consumer.onCancel) {
      await this.consumer.onCancel(update, this.currentTask);
    }
    this.emit("cancel", update);
  };

  onUpdate = async (update: UpdateEvent): Promise<A2A.Task> => {
    if (this.consumer.onUpdate) {
      this.currentTask = await this.consumer.onUpdate(update, this.currentTask);
    } else {
      assert(false, "onUpdate callback not found");
      this.currentTask = update as unknown as A2A.Task;
    }
    this.emit("update", this.currentTask, update);
    return this.currentTask;
  };

  onError = async (error: any): Promise<void> => {
    if (this.consumer.onError) {
      await this.consumer.onError(error, this.currentTask);
    }
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
    private readonly _consumer: v2.a2a.EventConsumer,
    private _currentTask?: A2A.Task
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

  get consumer(): v2.a2a.EventConsumer {
    return this._consumer;
  }

  get contextId(): string {
    return this._contextId;
  }
}
