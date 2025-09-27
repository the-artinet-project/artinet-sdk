/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { MCPServiceInterface } from "../../types/index.js";
import { Implementation } from "@modelcontextprotocol/sdk/types.js";
import { ServerOptions } from "@modelcontextprotocol/sdk/server/index.js";
import { Agent } from "../../types/index.js";
export declare class BaseMCPService extends McpServer implements MCPServiceInterface {
    readonly agent: Agent;
    private _registerBaseTools;
    constructor({ serverInfo, agent, options, agentCardUri, }: {
        serverInfo: Implementation;
        agent: Agent;
        options?: ServerOptions;
        agentCardUri?: string;
    });
    stop(): Promise<void>;
    static create({ serverInfo, agent, options, agentCardUri, }: {
        serverInfo: Implementation;
        agent: Agent;
        options?: ServerOptions;
        agentCardUri?: string;
    }): BaseMCPService & Agent;
}
export type MCPService = ReturnType<typeof BaseMCPService.create>;
export type MCPAgent = MCPService;
export declare const createMCPService: typeof BaseMCPService.create;
export declare const createMCPAgent: typeof BaseMCPService.create;
//# sourceMappingURL=service.d.ts.map