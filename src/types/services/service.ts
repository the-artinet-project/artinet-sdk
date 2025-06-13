import { Protocol } from "./protocol.js";
import { BaseExecutionContext, ExecutionContext } from "./context.js";
import { AgentEngine } from "./context.js";

/**
 * @description The service interface.
 * @template ContextType The context type.
 */
export interface Service<
  ContextType extends BaseExecutionContext = BaseExecutionContext,
> {
  /**
   * @description The name.
   * @type {string}
   */
  readonly name: string;
  /**
   * @description The protocol.
   * @type {Protocol}
   */
  readonly protocol: Protocol;

  /**
   * @description The execute method.
   * @param {ExecutionContext<ContextType>} executionContext The execution context.
   * @param {AgentEngine} engine The engine.
   * @returns {Promise<void>} The promise.
   */
  execute({
    executionContext,
    engine,
  }: {
    executionContext: ExecutionContext<ContextType>;
    engine: AgentEngine;
  }): Promise<void>;

  /**
   * @description The stop method.
   * @returns {Promise<void>} The promise.
   */
  stop(): Promise<void>;

  /**
   * @description The description.
   * @type {Promise<string>}
   */
  // description: Promise<string>;
  /**
   * @description The request.
   * @type {Promise<string>}
   */
  // request: Promise<string>;
  /**
   * @description The response.
   * @type {Promise<string>}
   */
  // response: Promise<string>;
  /**
   * @description The fault.
   * @type {Promise<string>}
   */
  // fault: Promise<string>;
}
