import type { AgentSkill } from "../extended-schema.js";
import { Protocol } from "./protocol.js";
import { Context } from "../../server/trpc/protocol/context.js";

export interface A2AContext extends Context {
  protocol: Protocol.A2A;
  message: string;
}

/**
 * @description Represents a request specific to the MCP (Model Context Protocol) protocol.
 * The `protocol` field is narrowed to `Protocol.MCP`.
 */
export interface MCPContext extends Context {
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
export interface NLWContext extends Context {
  protocol: Protocol.NLWEB;
}

/**
 * @description Represents a request specific to the ACP (Agent Communication Protocol).
 * The `protocol` field is narrowed to `Protocol.ACP`.
 */
export interface ACPContext extends Context {
  protocol: Protocol.ACP;
}

/**
 * @description Represents a request specific to the CHAT protocol.
 * The `protocol` field is narrowed to `Protocol.CHAT`.
 */
export interface ChatContext extends Context {
  protocol: Protocol.CHAT;
}

/**
 * @description A discriminated union of all protocol-specific request types.
 * This allows functions to accept any request and use the `protocol`
 * field to determine the specific type of request, enabling type-safe
 * handling based on the protocol.
 */
export type SupportedContext =
  | A2AContext
  | MCPContext
  | ACPContext
  | ChatContext;

import { ExecutionEngine } from "../../server/trpc/protocol/execute.js";

export type AgentEngine = ExecutionEngine<SupportedContext>;
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
