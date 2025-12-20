/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview MCP Service Interface Definition
 *
 * This module defines the MCP service interface that all MCP services
 * must implement. It provides the contract for registering base tools and
 * managing service lifecycle.
 *
 * @module MCPService
 * @version 0.5.7
 * @since 0.5.7
 * @author The Artinet Project
 */
import { ServiceInterface, ServiceInterfaceV2 } from "../core/index.js";
import { v2 } from "../v2/index.js";
/**
 * Main interface for MCP service implementations.
 *
 * This interface extends the core ServiceInterface to provide
 * a complete MCP service implementation. It includes base tool registration.
 *
 * @example
 * ```typescript
 * class MyMCPService implements MCPServiceInterface {
 *   constructor(
 *     public agentCard: AgentCard,
 *     // ... other dependencies
 *   ) {}
 *
 *   registerTools(uri: string) {
 *     // Register tools
 *   }
 *
 *   // ... implement other MCP service methods
 * }
 * ```
 *
 * @public
 * @since 0.5.7
 */
//TODO: Implement execute (execute will take MCPServerOptions as params and start the MCP server)
export interface MCPServiceInterface
  extends Omit<ServiceInterface, "execute">,
    v2.core.ServiceInterface {
  /**
   * Registers tools for the MCP service.
   * @param uri - The URI of the agent card resource.
   */
  registerTools?: (uri: string) => void;
}
