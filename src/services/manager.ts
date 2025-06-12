import { BaseExecutionContext } from "../types/services/context.js";
import { AgentCard } from "../types/index.js";
import { ServiceDispatcher } from "../types/services/dispatcher.js";
import { v4 as uuidv4 } from "uuid";
import { ManagerInterface, ManagerOptions } from "../types/services/manager.js";

/**
 * @description The service manager class.
 */
export class ServiceManager
  extends ServiceDispatcher
  implements ManagerInterface
{
  /**
   * @description The agent card.
   * @type {AgentCard}
   */
  protected card: AgentCard;
  /**
   * @description The constructor.
   * @param {ManagerOptions} params The service manager params.
   */
  constructor(params: ManagerOptions) {
    super(params);
    this.card = params.card;
  }

  /**
   * @description Creates a request context.
   * @param {T} req The request.
   * @returns {T} The request context.
   */
  createRequestContext<T extends BaseExecutionContext>(req: T): T {
    if (!req.protocol || !req.method || !req.params) {
      throw new Error("Invalid request parameters");
    }
    const context: T = {
      ...req,
      id: req.id ?? uuidv4(),
      protocol: req.protocol,
      method: req.method,
      params: req.params,
    } as T;
    return context;
  }

  /**
   * @description Gets the agent card.
   * @returns {AgentCard} The agent card.
   */
  getCard(): AgentCard {
    return this.card;
  }
}
