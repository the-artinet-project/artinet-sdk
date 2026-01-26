/**
 * Copyright 2026 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
import { InMemoryTransport } from '@modelcontextprotocol/sdk/inMemory.js';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { logger } from '~/config/index.js';
import { z } from 'zod/v4';

/**
 * Configuration for mounting an in-memory MCP server.
 */
const InMemoryParamsSchema = z.object({
    /** Whether to invoke the target as a factory function or constructor */
    type: z.enum(['factory', 'constructor']),
    /** The name of the exported factory function or constructor class */
    target: z.string(),
    /** The module path to dynamically import (e.g., '@modelcontextprotocol/server-everything/dist/everything.js') */
    module: z.string(),
    /** Optional arguments to pass to the factory function or constructor */
    args: z.record(z.string(), z.unknown()).optional(),
});
export type InMemoryParams = z.infer<typeof InMemoryParamsSchema>;

/**
 * Mounts an MCP server in-memory for direct integration.
 * Creates a linked transport pair for client-server communication without network overhead.
 * @docs https://modelcontextprotocol.io/docs/concepts/transports#in-memory
 *
 * @param params - {@link InMemoryParams} Configuration for the server module
 * @param extract - Optional function to extract the McpServer from the imported module.
 *                  Use when the module's export structure doesn't match standard factory/constructor patterns.
 * @example
 * ```typescript
 * import { mountMemServer } from "@artinet/sdk/mcp/mem";
 * import { Client } from "@modelcontextprotocol/sdk/client/index.js";
 *
 * // Mount a server using a factory function with custom extraction
 * const { server, clientTransport } = await mountMemServer(
 *   {
 *     type: "factory",
 *     target: "createServer",
 *     module: "@modelcontextprotocol/server-everything/dist/everything.js",
 *   },
 *   (module) => module.createServer().server
 * );
 *
 * // Connect a client to the in-memory server
 * const client = new Client({ name: "my-client", version: "1.0.0" });
 * await client.connect(clientTransport);
 *
 * // Use the client
 * const tools = await client.listTools();
 * ```
 * @returns Promise containing the {@link McpServer} instance and linked transport pair
 */
export async function mountMemServer(
    params: InMemoryParams,
    extract?: (module: any) => McpServer,
): Promise<{ serverTransport: InMemoryTransport; clientTransport: InMemoryTransport; server: McpServer }> {
    const [serverTransport, clientTransport] = InMemoryTransport.createLinkedPair();

    //IFFE
    const modules = (() => {
        const modules = new Map<string, any>();
        return async (moduleName: string) => {
            if (modules.has(moduleName)) {
                return modules.get(moduleName);
            }

            const module = await import(moduleName).catch((error) => {
                logger.error(`Failed to import module ${moduleName}`, error);
                throw error;
            });

            if (module) {
                modules.set(moduleName, module);
            }

            return module;
        };
    })();

    const module = await modules(params.module).catch((error) => {
        logger.error(`Failed to import module ${params.module}`, error);
        throw error;
    });

    if (!module) {
        logger.warn(`Failed to import module ${params.module}`);
        throw new Error(`Failed to import module ${params.module}`);
    }

    let server: McpServer;

    if (extract) {
        server = extract(module);
    } else if (params.type === 'factory') {
        const factory = module[params.target];
        if (!factory) {
            const error = new Error(`Failed to find factory ${params.target} in module ${params.module}`);
            logger.error(error.message, error);
            throw error;
        }
        server = factory(params.args) as McpServer;
    } else {
        const constructor = module[params.target];
        if (!constructor) {
            const error = new Error(`Failed to find constructor ${params.target} in module ${params.module}`);
            logger.error(error.message, error);
            throw error;
        }
        server = new constructor(params.args) as McpServer;
    }

    await server.connect(serverTransport).catch((error: any) => {
        logger.error(`Failed to connect to server ${params.target}`, error);
        throw error;
    });

    return { serverTransport, clientTransport, server };
}
