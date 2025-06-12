import {
  McpServer,
  ToolCallback,
} from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { Protocol } from "../../types/services/protocol.js";
import {
  ExecutionContext,
  MCPExecutionContext,
} from "../../types/services/context.js";
import { AgentSkill } from "../../types/index.js";
import {
  CallToolResult,
  Implementation,
} from "@modelcontextprotocol/sdk/types.js";
import { ServerOptions } from "@modelcontextprotocol/sdk/server/index.js";
import { AgentEngine } from "../../types/services/context.js";
import { ZodRawShape } from "zod";
import {
  MCPTool,
  MCPRequestParamsSchema,
  MCPServiceInterface,
} from "../../types/services/mcp/service.js";

export class MCPService<
    T extends StreamableHTTPServerTransport = StreamableHTTPServerTransport,
  >
  extends McpServer
  implements MCPServiceInterface
{
  readonly name: string;
  readonly protocol: Protocol.MCP;
  readonly engine: AgentEngine;
  constructor({
    serverInfo,
    engine,
    options,
    skills,
  }: {
    serverInfo: Implementation;
    engine: AgentEngine;
    skills?: AgentSkill[];
    options?: ServerOptions;
  }) {
    super(serverInfo, options);
    this.name = "mcp";
    this.protocol = Protocol.MCP;
    this.engine = engine;
    if (skills) {
      this.initialize(skills);
    }
  }

  initialize(skills: AgentSkill[]) {
    for (const skill of skills) {
      const tool = MCPService.skillToTool(
        skill,
        MCPRequestParamsSchema.shape,
        MCPService.mcpFactory(this.engine)
      );

      super.tool(
        skill.name,
        skill.description ?? "",
        tool.paramsSchemaOrAnnotations,
        tool.cb
      );
    }
  }

  async execute({
    executionContext,
  }: {
    executionContext: ExecutionContext<MCPExecutionContext>;
    engine: AgentEngine;
  }): Promise<void> {
    if (!executionContext.requestContext) {
      throw new Error("No request context");
    }
    const { request, transport, response } = executionContext.requestContext;
    const validTransport = transport as T;
    if (!validTransport) {
      throw new Error("Invalid transport");
    }
    await super.connect(validTransport);
    await validTransport.handleRequest(request, response, request.body);
  }

  static mcpFactory<Args extends MCPExecutionContext = MCPExecutionContext>(
    engine: AgentEngine
  ): (args: Args["params"]) => Promise<string> {
    return async (args: Args["params"]) => {
      const context: ExecutionContext<Args> = {
        id: "",
        protocol: Protocol.MCP,
        getRequestParams: () => args,
        isCancelled: () => false,
      };
      const generator = await engine(context);
      let finalResult: any;
      for await (const event of generator) {
        finalResult = event;
      }
      await Promise.resolve();
      return JSON.stringify(finalResult);
    };
  }

  static skillToTool<Args extends ZodRawShape = ZodRawShape>(
    skill: AgentSkill,
    argShape: Args,
    agentHandler: (...args: Parameters<ToolCallback<Args>>) => Promise<string>
  ): MCPTool<Args> {
    const skillTool: MCPTool<Args> = {
      name: skill.name,
      description: skill.description,
      paramsSchemaOrAnnotations: argShape,
      cb: async (...args) => {
        const toolResult: CallToolResult = {
          content: [
            {
              type: "text",
              text: await agentHandler(...args),
            },
          ],
        };
        return toolResult;
      },
    };
    return skillTool;
  }
}
