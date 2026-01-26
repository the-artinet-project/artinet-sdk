/**
 * Copyright 2026 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
import { InMemoryTransport } from '@modelcontextprotocol/sdk/inMemory.js';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { logger } from '~/config/index.js';
import { z } from 'zod/v4';

const InMemoryParamsSchema = z.object({
    type: z.enum(['factory', 'constructor']),
    target: z.string(),
    module: z.string(),
    args: z.record(z.string(), z.unknown()).optional(),
});
export type InMemoryParams = z.infer<typeof InMemoryParamsSchema>;

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
