import { TaskAndHistory, TaskStore } from "../../../server/interfaces/store.js";
import { AgentCard } from "../../schema/index.js";
import { TaskContext } from "../../index.js";
import express, { Response } from "express";

/**
 * @description The A2ARepository interface.
 */
export interface A2ARepositoryInterface {
  /**
   * @description Gets the agent card.
   * @returns {AgentCard} The agent card.
   */
  getCard: () => AgentCard;
  /**
   * @description Gets the active cancellations.
   * @returns {Set<string>} The active cancellations.
   */
  getActiveCancellations: () => Set<string>;
  /**
   * @description Gets the task store.
   * @returns {TaskStore} The task store.
   */
  getTaskStore: () => TaskStore;
  /**
   * @description Closes the streams for a task.
   * @param {string} taskId The ID of the task.
   */
  closeStreamsForTask: (taskId: string) => void;
  /**
   * @description Creates a task context.
   * @param {Task} task The task.
   * @param {Message} userMessage The user message.
   * @param {Message[]} history The history.
   * @param {MessageSendConfiguration} configuration The configuration.
   * @returns {TaskContext} The task context.
   */
  onCancel: (
    context: TaskContext,
    data: TaskAndHistory,
    res: Response
  ) => Promise<void>;
  /**
   * @description Ends a task.
   * @param {string} taskId The ID of the task.
   * @param {Response} res The response.
   */
  onEnd: (taskId: string, res: Response) => Promise<void>;
}

/**
 * @description The A2ARepository parameters.
 */
export interface A2ARepositoryParams {
  /**
   * @description The task store.
   * @type {TaskStore}
   */
  taskStore?: TaskStore;
  /**
   * @description The base path.
   * @type {string}
   */
  basePath?: string;
  /**
   * @description The fallback path.
   * @type {string}
   */
  fallbackPath?: string;
  /**
   * @description The port.
   * @type {number}
   */
  port?: number;
  /**
   * @description The app.
   * @type {express.Express}
   */
  app?: express.Express;
  /**
   * @description The register.
   * @type {boolean}
   */
  register?: boolean;
  /**
   * @description The card.
   * @type {AgentCard}
   */
  card: AgentCard;
}
