import { BaseExecutionContext } from "./context.js";
import { TaskStore } from "../../server/interfaces/store.js";
import { AgentCard } from "../schemas/index.js";
import { DispatchOptions } from "./dispatcher.js";

/**
 * @description The service manager params.
 */
export interface ManagerOptions extends DispatchOptions {
  /**
   * @description The task store.
   * @type {TaskStore}
   */
  taskStore: TaskStore;
  /**
   * @description The agent card.
   * @note will be removed in the future
   * @type {AgentCard}
   */
  card: AgentCard;
}

/**
 * @description The service manager interface.
 */
export interface ManagerInterface {
  /**
   * @description Creates a request context.
   * @param {T} req The request.
   * @returns {T} The request context.
   */
  createRequestContext<T extends BaseExecutionContext>(req: T): T;
  /**
   * @description Gets the agent card.
   * @param {string} serviceName The service name.
   * @returns {string} The description.
   */
  // getDescription(serviceName?: string): string;
}
