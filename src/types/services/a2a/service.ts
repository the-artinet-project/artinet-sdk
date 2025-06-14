import {
  TaskResubscriptionRequest,
  SendStreamingMessageRequest,
  AgentCard,
} from "../../schemas/index.js";
import { A2AExecutionContext, AgentEngine } from "../context.js";
import { Service } from "../service.js";
import { Response } from "express";
import { TaskStore } from "../../../server/interfaces/store.js";
import { A2ARepositoryOptions } from "./repository.js";

export interface A2AServiceOptions extends A2ARepositoryOptions {
  engine: AgentEngine;
  card: AgentCard;
  taskStore: TaskStore;
}
/**
 * @description The A2AService interface.
 */
export interface A2AServiceInterface extends Service<A2AExecutionContext> {
  /**
   * @description Handles the message/stream method.
   * @param req The SendStreamingMessageRequest object
   * @param res The Express Response object
   */
  handleSendStreamingMessage(
    req: SendStreamingMessageRequest,
    res: Response
  ): Promise<void>;
  /**
   * @description Handles the tasks/resubscribe method.
   * @param req The TaskResubscriptionRequest object
   * @param res The Express Response object
   */
  handleTaskResubscribe(
    req: TaskResubscriptionRequest,
    res: Response
  ): Promise<void>;
}
