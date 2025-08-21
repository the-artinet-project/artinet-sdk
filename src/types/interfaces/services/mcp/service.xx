import { ToolCallback } from "@modelcontextprotocol/sdk/server/mcp.js";
import {
  CallToolResult,
  ToolAnnotations,
} from "@modelcontextprotocol/sdk/types.js";
import z, { ZodRawShape } from "zod";
import { Service } from "../service.js";
import { AgentSkill } from "../../../schemas/index.js";
import { MCPContext } from "../context.js";

/**
 * @description The MCPRequestParamsSchema.
 */
export const MCPRequestParamsSchema = z.object({
  message: z.string(),
});

/**
 * @description The zodCallBack type.
 */
type zodCallBack<Args extends ZodRawShape = ZodRawShape> = (
  ...args: Parameters<ToolCallback<Args>>
) => Promise<CallToolResult>;

/**
 * @description The MCPTool interface.
 */
export interface MCPTool<Args extends ZodRawShape = ZodRawShape> {
  /**
   * @description The name of the tool.
   * @type {string}
   */
  name: string;
  /**
   * @description The description of the tool.
   * @type {string}
   */
  description?: string;
  /**
   * @description The params schema or annotations of the tool.
   * @type {Args | ToolAnnotations}
   */
  paramsSchemaOrAnnotations: Args | ToolAnnotations;
  /**
   * @description The callback of the tool.
   * @type {zodCallBack<Args>}
   */
  cb: zodCallBack<Args>;
}

/**
 * @description The MCPServiceInterface interface.
 */
export interface MCPServiceInterface extends Service<MCPContext> {
  /**
   * @description Initializes the service.
   * @param {AgentSkill[]} skills The skills.
   */
  initialize(skills: AgentSkill[]): void;
}
