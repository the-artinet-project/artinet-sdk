import { describe, it, expect } from '@jest/globals';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { mountMemServer, type InMemoryParams } from '../../src/services/mcp/modules/mem.js';

describe.skip('mountMemServer', () => {
    describe('factory type mounting', () => {
        it('should mount server-everything using factory with extract function', async () => {
            const params: InMemoryParams = {
                type: 'factory',
                target: 'createServer',
                module: '@modelcontextprotocol/server-everything/dist/everything.js',
                args: {},
            };

            const results = await mountMemServer(params, (module) => {
                return module.createServer().server;
            });

            expect(results).toBeDefined();
            expect(results.server).toBeDefined();
            expect(typeof results.server.close).toBe('function');
            expect(results.serverTransport).toBeDefined();
            expect(results.clientTransport).toBeDefined();

            await results.server.close();
        });

        it('should allow client to connect and list tools', async () => {
            const params: InMemoryParams = {
                type: 'factory',
                target: 'createServer',
                module: '@modelcontextprotocol/server-everything/dist/everything.js',
                args: {},
            };

            const results = await mountMemServer(params, (module) => {
                return module.createServer().server;
            });

            const client = new Client({ name: 'test-client', version: '1.0.0' });
            await client.connect(results.clientTransport);

            const tools = await client.listTools();

            expect(tools).toBeDefined();
            expect(tools.tools).toBeInstanceOf(Array);
            expect(tools.tools.length).toBeGreaterThan(0);

            const toolNames = tools.tools.map((t) => t.name);
            expect(toolNames).toContain('echo');
            expect(toolNames).toContain('add');

            await client.close();
            await results.server.close();
        });

        it('should allow calling tools through the client', async () => {
            const params: InMemoryParams = {
                type: 'factory',
                target: 'createServer',
                module: '@modelcontextprotocol/server-everything/dist/everything.js',
                args: {},
            };

            const results = await mountMemServer(params, (module) => {
                return module.createServer().server;
            });

            const client = new Client({ name: 'test-client', version: '1.0.0' });
            await client.connect(results.clientTransport);

            const echoResult = await client.callTool({
                name: 'echo',
                arguments: { message: 'Hello, MCP!' },
            });

            expect(echoResult).toBeDefined();
            expect(echoResult.content).toBeInstanceOf(Array);
            expect((echoResult.content[0] as { type: string; text: string }).text).toContain('Hello, MCP!');

            const addResult = await client.callTool({
                name: 'add',
                arguments: { a: 5, b: 3 },
            });

            expect(addResult).toBeDefined();
            expect((addResult.content[0] as { type: string; text: string }).text).toContain('8');

            await client.close();
            await results.server.close();
        });
    });

    describe('error handling', () => {
        it('should throw error when module import fails', async () => {
            const params: InMemoryParams = {
                type: 'factory',
                target: 'createServer',
                module: 'non-existent-module-that-does-not-exist',
                args: {},
            };

            await expect(mountMemServer(params)).rejects.toThrow();
        });

        it('should throw error when factory is not found in module', async () => {
            const params: InMemoryParams = {
                type: 'factory',
                target: 'nonExistentFactory',
                module: '@modelcontextprotocol/server-everything/dist/everything.js',
                args: {},
            };

            await expect(mountMemServer(params)).rejects.toThrow('Failed to find factory nonExistentFactory');
        });

        it('should throw error when constructor is not found in module', async () => {
            const params: InMemoryParams = {
                type: 'constructor',
                target: 'NonExistentConstructor',
                module: '@modelcontextprotocol/server-everything/dist/everything.js',
                args: {},
            };

            await expect(mountMemServer(params)).rejects.toThrow('Failed to find constructor NonExistentConstructor');
        });
    });

    describe('extract function', () => {
        it('should use custom extract function when provided', async () => {
            const params: InMemoryParams = {
                type: 'factory',
                target: 'createServer',
                module: '@modelcontextprotocol/server-everything/dist/everything.js',
                args: {},
            };

            let extractCalled = false;
            const customExtract = (module: any): McpServer => {
                extractCalled = true;
                return module.createServer().server;
            };

            const results = await mountMemServer(params, customExtract);

            expect(extractCalled).toBe(true);
            expect(results.server).toBeDefined();
            expect(typeof results.server.close).toBe('function');

            await results.server.close();
        });

        it('should prioritize extract function over type parameter', async () => {
            const params: InMemoryParams = {
                type: 'constructor',
                target: 'SomeConstructor',
                module: '@modelcontextprotocol/server-everything/dist/everything.js',
                args: {},
            };

            const customExtract = (module: any): McpServer => {
                return module.createServer().server;
            };

            const results = await mountMemServer(params, customExtract);

            expect(results.server).toBeDefined();
            expect(typeof results.server.close).toBe('function');

            await results.server.close();
        });
    });

    describe('resource access', () => {
        it('should allow listing resources through the client', async () => {
            const params: InMemoryParams = {
                type: 'factory',
                target: 'createServer',
                module: '@modelcontextprotocol/server-everything/dist/everything.js',
                args: {},
            };

            const results = await mountMemServer(params, (module) => {
                return module.createServer().server;
            });

            const client = new Client({ name: 'test-client', version: '1.0.0' });
            await client.connect(results.clientTransport);

            const resources = await client.listResources();

            expect(resources).toBeDefined();
            expect(resources.resources).toBeInstanceOf(Array);
            expect(resources.resources.length).toBeGreaterThan(0);

            await client.close();
            await results.server.close();
        });

        it('should allow reading a resource', async () => {
            const params: InMemoryParams = {
                type: 'factory',
                target: 'createServer',
                module: '@modelcontextprotocol/server-everything/dist/everything.js',
                args: {},
            };

            const results = await mountMemServer(params, (module) => {
                return module.createServer().server;
            });

            const client = new Client({ name: 'test-client', version: '1.0.0' });
            await client.connect(results.clientTransport);

            const resource = await client.readResource({
                uri: 'test://static/resource/1',
            });

            expect(resource).toBeDefined();
            expect(resource.contents).toBeInstanceOf(Array);
            expect(resource.contents.length).toBeGreaterThan(0);

            await client.close();
            await results.server.close();
        });
    });

    describe('prompts', () => {
        it('should allow listing prompts through the client', async () => {
            const params: InMemoryParams = {
                type: 'factory',
                target: 'createServer',
                module: '@modelcontextprotocol/server-everything/dist/everything.js',
                args: {},
            };

            const results = await mountMemServer(params, (module) => {
                return module.createServer().server;
            });

            const client = new Client({ name: 'test-client', version: '1.0.0' });
            await client.connect(results.clientTransport);

            const prompts = await client.listPrompts();

            expect(prompts).toBeDefined();
            expect(prompts.prompts).toBeInstanceOf(Array);
            expect(prompts.prompts.length).toBeGreaterThan(0);

            const promptNames = prompts.prompts.map((p) => p.name);
            expect(promptNames).toContain('simple_prompt');

            await client.close();
            await results.server.close();
        });
    });
});
