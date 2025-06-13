import { TaskAndHistory, TaskStore } from "../../server/interfaces/store.js";
import {
  AgentCard,
  Message,
  MessageSendConfiguration,
  Task,
} from "../../types/index.js";
import { TaskContext } from "../../types/index.js";
import { CANCEL_UPDATE } from "../../utils/index.js";
import { processUpdate } from "../../server/lib/state.js";
import { sendSSEEvent } from "../../transport/streaming/stream.js";
import { logDebug } from "../../utils/logging/log.js";
import { InMemoryTaskStore } from "../../server/lib/storage/memory.js";
import {
  A2ARepositoryInterface,
  A2ARepositoryOptions,
} from "../../types/services/a2a/repository.js";

import { v4 as uuidv4 } from "uuid";
import { Response } from "express";

/**
 * @description The A2ARepository class.
 */
export class A2ARepository implements A2ARepositoryInterface {
  protected taskStore: TaskStore;
  protected _activeCancellations: Set<string>;
  protected _activeStreams: Map<string, Response[]>;
  protected card: AgentCard;

  constructor(params: A2ARepositoryOptions) {
    this.taskStore = params.taskStore ?? new InMemoryTaskStore();
    this.card = params.card;
    this._activeCancellations = new Set();
    this._activeStreams = new Map();
  }

  /**
   * @description Gets the agent card.
   * @returns {AgentCard} The agent card.
   */
  public getCard(): AgentCard {
    return this.card;
  }

  /**
   * @description Gets the active streams.
   * @returns {Map<string, Response[]>} The active streams.
   */
  get activeStreams(): Map<string, Response[]> {
    return this._activeStreams;
  }

  /**
   * @description Gets the active cancellations.
   * @returns {Set<string>} The active cancellations.
   */
  get activeCancellations(): Set<string> {
    return this._activeCancellations;
  }

  /**
   * @description Gets the task store.
   * @returns {TaskStore} The task store.
   */
  public getTaskStore(): TaskStore {
    return this.taskStore;
  }

  /**
   * Creates a TaskContext object for a task handler.
   * @param task The task
   * @param userMessage The user message
   * @param history The message history
   * @returns A TaskContext object
   */
  createTaskContext(
    task: Task,
    userMessage: Message,
    history: Message[],
    configuration?: MessageSendConfiguration
  ): TaskContext {
    return {
      contextId: task.contextId ?? userMessage.contextId ?? uuidv4(),
      task,
      userMessage,
      history,
      configuration,
      isCancelled: () => this._activeCancellations.has(task.id),
    };
  }

  /**
   * Handles task cancellation
   * @param data Task and history data
   * @param res Response object
   */
  async onCancel(
    context: TaskContext,
    data: TaskAndHistory,
    res: Response
  ): Promise<void> {
    const cancelUpdate = CANCEL_UPDATE(data.task.id, context.contextId);
    const currentData = await processUpdate(this.taskStore, {
      context: context,
      current: data,
      update: cancelUpdate,
    });

    // Send the canceled status
    sendSSEEvent(res, currentData.task.id, cancelUpdate);

    this.closeStreamsForTask(currentData.task.id);
  }

  /**
   * Adds a response stream to the tracking map for a task.
   * @param taskId The task ID
   * @param res The response stream
   */
  public addStreamForTask(taskId: string, res: Response): void {
    if (!this._activeStreams.has(taskId)) {
      this._activeStreams.set(taskId, []);
    }
    logDebug("A2AServer", "Adding stream for task", {
      taskId,
      activeStreams: this._activeStreams,
    });
    this._activeStreams.get(taskId)?.push(res);
  }

  /**
   * Removes a response stream from the tracking map for a task.
   * @param taskId The task ID
   * @param res The response stream
   */
  public removeStreamForTask(taskId: string, res: Response): void {
    const streams = this._activeStreams.get(taskId);
    if (streams) {
      const index = streams.indexOf(res);
      if (index !== -1) {
        streams.splice(index, 1);
        if (streams.length === 0) {
          logDebug("A2AServer", "Removing stream for task", {
            taskId,
            activeStreams: this._activeStreams,
          });
          this._activeStreams.delete(taskId);
        }
      }
    }
  }

  /**
   * Closes any active streams for a task.
   * @param taskId The task ID
   */
  public closeStreamsForTask(taskId: string): void {
    const streams = this._activeStreams.get(taskId);
    if (streams) {
      // Send close event to all streams
      for (const stream of streams) {
        if (stream.writable) {
          stream.write("event: close\ndata: {}\n\n");
          stream.end();
        }
      }
      this._activeStreams.delete(taskId);
    }
  }

  /**
   * Handles cleanup when a task stream ends
   * @param taskId The task ID
   * @param res Response object
   */
  public async onEnd(taskId: string, res: Response): Promise<void> {
    this._activeCancellations.delete(taskId);
    this.removeStreamForTask(taskId, res);
  }

  /**
   * Destroys the repository.
   */
  public async destroy(): Promise<void> {
    this._activeStreams.forEach((streams, taskId) => {
      if (streams.length > 0) {
        logDebug("A2ARepository", "Closing streams for task during stop", {
          taskId,
        });
        this.closeStreamsForTask(taskId);
      }
    });
    this._activeStreams.clear();
    this._activeCancellations.clear();
  }
}
