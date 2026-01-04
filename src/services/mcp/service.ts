/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { A2A, MCP } from "~/types/index.js";
import { Implementation } from "@modelcontextprotocol/sdk/types.js";
import { ServerOptions } from "@modelcontextprotocol/sdk/server/index.js";
import { Agent } from "../a2a/index.js";
import { formatJson } from "~/utils/utils.js";

export interface MCPServiceParams {
  serverInfo: Implementation;
  agent: Agent;
  options?: ServerOptions;
  agentCardUri?: string;
}

export class BaseMCPService extends McpServer implements MCP.Service {
  readonly agent: Agent;

  private _registerBaseTools(uri: string = "agent://card") {
    this.registerTool(
      "send-message",
      {
        title: "Send Message",
        description: A2A.MessageSendParamsSchema.description,
        inputSchema: A2A.MessageSendParamsSchema.shape,
        outputSchema: A2A.TaskSchema.shape, //defaulting to task because unions are not supported
      },
      async (args) => {
        const task = await this.agent.sendMessage(args);
        return {
          content: [
            {
              type: "text",
              text: formatJson(task),
            },
          ],
          structuredContent: task,
        };
      }
    );
    this.registerTool(
      "get-task",
      {
        title: "Get Task",
        description: A2A.TaskIdParamsSchema.description,
        inputSchema: A2A.TaskIdParamsSchema.shape,
        outputSchema: A2A.TaskSchema.shape,
      },
      async (args) => {
        const task = await this.agent.getTask(args);
        return {
          content: [
            {
              type: "text",
              text: formatJson(task),
            },
          ],
          structuredContent: task,
        };
      }
    );
    this.registerTool(
      "cancel-task",
      {
        title: "Cancel Task",
        description: A2A.TaskIdParamsSchema.description,
        inputSchema: A2A.TaskIdParamsSchema.shape,
        outputSchema: A2A.TaskSchema.shape,
      },
      async (args) => {
        const task = await this.agent.cancelTask(args);
        return {
          content: [
            {
              type: "text",
              text: formatJson(task),
            },
          ],
          structuredContent: task,
        };
      }
    );
    this.registerResource(
      "agent-card",
      uri,
      {
        title: "Agent Card",
        description: A2A.AgentCardSchema.description,
        mimeType: "application/json",
      },
      async (uri) => {
        return {
          contents: [
            {
              uri: uri.href,
              text: formatJson(await this.agent.getAgentCard()),
              mimeType: "application/json",
            },
          ],
        };
      }
    );
  }

  constructor({
    serverInfo,
    agent,
    options,
    agentCardUri = "agent://card",
  }: MCPServiceParams) {
    super(serverInfo, options);
    this.agent = agent;
    this._registerBaseTools(agentCardUri);
  }

  async stop(): Promise<void> {
    await super.close();
    await this.agent.stop();
  }

  static create({
    serverInfo,
    agent,
    options,
    agentCardUri = "agent://card",
  }: MCPServiceParams): BaseMCPService & Agent {
    const instance = new BaseMCPService({
      serverInfo,
      agent,
      options,
      agentCardUri,
    });
    return new Proxy(instance, {
      get(target: BaseMCPService & Agent, prop: string | symbol, receiver) {
        if (prop in target) {
          return Reflect.get(target, prop, receiver);
        }
        if (!target.agent) {
          return undefined;
        }
        if (prop in target.agent) {
          const value = target.agent[prop as keyof Agent];
          if (typeof value === "function") {
            return value.bind(target.agent);
          }
          return value;
        }
        return Reflect.get(target, prop, receiver);
      },

      set(target, prop, value, receiver) {
        if (prop in target.agent) {
          (target.agent as any)[prop] = value;
          return true;
        }
        return Reflect.set(target, prop, value, receiver);
      },
    }) as BaseMCPService & Agent;
  }
}

export type MCPService = ReturnType<typeof BaseMCPService.create>;
export type MCPAgent = MCPService;
export const createMCPService = BaseMCPService.create;
export const createMCPAgent = createMCPService;
