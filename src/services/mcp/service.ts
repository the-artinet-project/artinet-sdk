/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import {
  MessageSendParamsSchema,
  TaskIdParamsSchema,
  TaskSchema,
  AgentCardSchema,
  MCPServiceInterface,
} from "~/types/index.js";
import { Implementation } from "@modelcontextprotocol/sdk/types.js";
import { ServerOptions } from "@modelcontextprotocol/sdk/server/index.js";
import { Agent } from "~/types/index.js";

export class BaseMCPService extends McpServer implements MCPServiceInterface {
  readonly agent: Agent;

  private _registerBaseTools(uri: string = "agent://card") {
    this.registerTool(
      "send-message",
      {
        title: "Send Message",
        description: MessageSendParamsSchema.description,
        inputSchema: MessageSendParamsSchema.shape,
        outputSchema: TaskSchema.shape, //defaulting to task because unions are not supported
      },
      async (args) => {
        const task = await this.agent.sendMessage(args);
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(task, null, 2),
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
        description: TaskIdParamsSchema.description,
        inputSchema: TaskIdParamsSchema.shape,
        outputSchema: TaskSchema.shape,
      },
      async (args) => {
        const task = await this.agent.getTask(args);
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(task, null, 2),
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
        description: TaskIdParamsSchema.description,
        inputSchema: TaskIdParamsSchema.shape,
        outputSchema: TaskSchema.shape,
      },
      async (args) => {
        const task = await this.agent.cancelTask(args);
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(task, null, 2),
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
        description: AgentCardSchema.description,
        mimeType: "application/json",
      },
      async (uri) => {
        return {
          contents: [
            {
              uri: uri.href,
              text: JSON.stringify(this.agent.agentCard, null, 2),
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
  }: {
    serverInfo: Implementation;
    agent: Agent;
    options?: ServerOptions;
    agentCardUri?: string;
  }) {
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
  }: {
    serverInfo: Implementation;
    agent: Agent;
    options?: ServerOptions;
    agentCardUri?: string;
  }): BaseMCPService & Agent {
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
