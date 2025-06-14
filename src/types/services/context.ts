import type { Task, A2AContext, AgentSkill } from "../extended-schema.js";
import { Protocol } from "./protocol.js";

/**
 * @description The base context.
 */
export interface BaseContext {
  /**
   * @description The id.
   * @type {string}
   */
  id: string;
  /**
   * @description The protocol.
   * @type {Protocol}
   */
  protocol: Protocol;
}

/**
 * @description The MCP context.
 */
export interface MCPContext {
  /**
   * @description The message.
   * @type {string}
   */
  message: string;
}

/**
 * @description The context params.
 * @type {A2AContext["params"] | MCPContext}
 */
export type ContextParams = A2AContext["params"] | MCPContext;

/**
 * @description The base execution context.
 */
export interface BaseExecutionContext<T extends ContextParams = ContextParams>
  extends BaseContext {
  /**
   * @description The method.
   * @type {string}
   */
  method: string;
  /**
   * @description The params.
   * @type {T}
   */
  params: T;
}

/**
 * Represents a request specific to the A2A (Agent-to-Agent) protocol.
 * The `protocol` field is narrowed to `Protocol.A2A`.
 */
export interface A2AExecutionContext<
  RequestType extends A2AContext = A2AContext,
> extends BaseExecutionContext<RequestType["params"]> {
  protocol: Protocol.A2A;
  /**
   * @description The task.
   * @type {Task}
   */
  task: Task;
  /**
   * @description The request.
   * @type {any}
   */
  request: any;
  /**
   * @description The response.
   * @type {any}
   */
  response: any;
}

/**
 * @description Represents a request specific to the MCP (Model Context Protocol) protocol.
 * The `protocol` field is narrowed to `Protocol.MCP`.
 */
export interface MCPExecutionContext extends BaseExecutionContext<MCPContext> {
  protocol: Protocol.MCP;
  /**
   * @description The request.
   * @type {any}
   */
  request: any;
  /**
   * @description The response.
   * @type {any}
   */
  response: any;
  /**
   * @description The transport.
   * @type {any}
   */
  transport: any;
  /**
   * @description The skills.
   * @type {AgentSkill[]}
   */
  skills?: AgentSkill[];
}

/**
 * @description Represents a request specific to the NLWeb protocol.
 * The `protocol` field is narrowed to `Protocol.NLWEB`.
 */
export interface NLWebExecutionContext
  extends Omit<MCPExecutionContext, "protocol"> {
  protocol: Protocol.NLWEB;
}

/**
 * @description Represents a request specific to the ACP (Agent Communication Protocol).
 * The `protocol` field is narrowed to `Protocol.ACP`.
 */
export interface ACPExecutionContext extends BaseExecutionContext {
  protocol: Protocol.ACP;
}

/**
 * @description Represents a request specific to the CHAT protocol.
 * The `protocol` field is narrowed to `Protocol.CHAT`.
 */
export interface ChatExecutionContext extends BaseExecutionContext {
  protocol: Protocol.CHAT;
}

/**
 * @description A discriminated union of all protocol-specific request types.
 * This allows functions to accept any request and use the `protocol`
 * field to determine the specific type of request, enabling type-safe
 * handling based on the protocol.
 */
export type SupportedContext =
  | A2AExecutionContext
  | MCPExecutionContext
  | ACPExecutionContext
  | ChatExecutionContext;

/**
 * @description The execution context.
 */
export interface ExecutionContext<
  ContextType extends BaseExecutionContext = SupportedContext,
> {
  /**
   * @description The id.
   * @type {string}
   */
  id: string;
  /**
   * @description The protocol.
   */
  protocol: Protocol;
  /**
   * @description The get request params.
   * @type {() => ContextType["params"] | undefined}
   */
  getRequestParams: () => ContextType["params"] | undefined;
  /**
   * @description The is cancelled.
   * @type {() => boolean}
   */
  isCancelled: () => boolean;
  /**
   * @description The request context.
   * @type {ContextType}
   */
  requestContext?: ContextType;
}

/**
 * @description The agent engine.
 * @type {AgentEngine}
 */
export type AgentEngine<Context extends ExecutionContext = ExecutionContext> = (
  context: Context
) => AsyncGenerator<any, void, undefined>;

/**
 * @description The execution context config.
 * @type {const}
 */
export const executionContextConfig = {
  id: "contextId",
  message: "userMessage",
} as const;

//todo move to utils
// export function getParams(context: ExecutionContext) {
//   console.log("getParams", context);
//   switch (context.protocol) {
//     case Protocol.A2A:
//       const a2aRequestParams = context.getRequestParams();
//       if (!a2aRequestParams) {
//         throw new Error("No request params provided");
//       }
//       return a2aRequestParams;
//     case Protocol.MCP:
//       const mcpRequestParams = context.getRequestParams();
//       if (!mcpRequestParams) {
//         throw new Error("No request params provided");
//       }
//       return mcpRequestParams;
//     default:
//       throw new Error("Invalid protocol");
//   }
// }
