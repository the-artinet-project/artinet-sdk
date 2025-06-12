import {
  TaskResubscriptionRequest,
  SendStreamingMessageRequest,
} from "../../schema/index.js";
import { A2AExecutionContext } from "../context.js";
import { Service } from "../service.js";
import { Response } from "express";

/**
 * @description The A2AService interface.
 */
export interface A2AServiceInterface extends Service<A2AExecutionContext> {
  /**
   * @description Handles the message/stream method.
   * @param req The SendStreamingMessageRequest object
   * @param res The Express Response object
   */
  handleTaskSendSubscribe(
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
