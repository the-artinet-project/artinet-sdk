import { describe, it, expect } from '@jest/globals';
import { A2A, describe as des6 } from '../../src/index.js';
import * as transform from '../../src/create/transform.js';

// Helper to create a mock context for testing
const createMockContext = (overrides: Partial<A2A.Context> = {}): A2A.Context => {
    const message: A2A.Message = {
        messageId: 'test-msg-id',
        kind: 'message',
        role: 'user',
        parts: [{ kind: 'text', text: 'hello world' }],
        taskId: 'test-task-id',
        contextId: 'test-context-id',
    };

    return {
        taskId: 'test-task-id',
        contextId: 'test-context-id',
        userMessage: message,
        messages: { message, messages: [{ message }] } as any,
        isCancelled: async () => false,
        abortSignal: new AbortController().signal,
        getState: async () => undefined,
        getTask: async () =>
            ({
                id: 'test-task-id',
                contextId: 'test-context-id',
                status: { state: 'working' },
            }) as any,
        service: {} as any,
        publisher: {
            onStart: async () => ({}),
            onUpdate: async () => ({}),
            onCancel: async () => {},
            onError: async () => {},
            onComplete: async () => {},
        } as any,
        extensions: [],
        references: [],
        ...overrides,
    } as A2A.Context;
};

describe('Transform Module Tests', () => {
    describe('hasCarry', () => {
        it('should return true for objects with reply and args', () => {
            const ret = { reply: 'hello', args: { key: 'value' } };
            expect(transform.hasCarry(ret)).toBe(true);
        });

        it('should return false for objects with only reply', () => {
            const ret = { reply: 'hello' };
            expect(transform.hasCarry(ret)).toBe(false);
        });

        it('should return false for primitive values', () => {
            expect(transform.hasCarry('hello')).toBe(false);
        });

        it('should return false for arrays', () => {
            expect(transform.hasCarry(['hello'])).toBe(false);
        });

        it('should return false for null', () => {
            expect(transform.hasCarry(null)).toBe(false);
        });
    });

    describe('hasReply', () => {
        it('should return true for objects with reply', () => {
            const ret = { reply: 'hello' };
            expect(transform.hasReply(ret)).toBe(true);
        });

        it('should return true for objects with reply and args', () => {
            const ret = { reply: 'hello', args: { key: 'value' } };
            expect(transform.hasReply(ret)).toBe(true);
        });

        it('should return false for primitive values', () => {
            expect(transform.hasReply('hello')).toBe(false);
        });

        it('should return false for arrays', () => {
            expect(transform.hasReply(['hello'])).toBe(false);
        });

        it('should return false for null', () => {
            expect(transform.hasReply(null)).toBe(false);
        });
    });

    describe('Parts Transform', () => {
        it('should transform text parts', async () => {
            const partsTransform = transform.Parts('text');
            const context = createMockContext();
            const results: any[] = [];

            for await (const result of partsTransform('hello world', context)) {
                results.push(result);
            }

            expect(results).toHaveLength(1);
            expect(results[0].status.state).toBe('working');
            expect(results[0].status.message.parts[0].kind).toBe('text');
            expect(results[0].status.message.parts[0].text).toBe('hello world');
        });

        it('should transform multiple text parts', async () => {
            const partsTransform = transform.Parts('text');
            const context = createMockContext();
            const results: any[] = [];

            for await (const result of partsTransform(['hello', 'world'], context)) {
                results.push(result);
            }

            expect(results).toHaveLength(1);
            expect(results[0].status.message.parts).toHaveLength(2);
            expect(results[0].status.message.parts[0].text).toBe('hello');
            expect(results[0].status.message.parts[1].text).toBe('world');
        });

        it('should transform file parts', async () => {
            const partsTransform = transform.Parts('file');
            const context = createMockContext();
            const results: any[] = [];

            for await (const result of partsTransform({ uri: 'https://example.com/file.pdf' }, context)) {
                results.push(result);
            }

            expect(results).toHaveLength(1);
            expect(results[0].status.message.parts[0].kind).toBe('file');
            expect(results[0].status.message.parts[0].file.uri).toBe('https://example.com/file.pdf');
        });

        it('should transform data parts', async () => {
            const partsTransform = transform.Parts('data');
            const context = createMockContext();
            const results: any[] = [];

            for await (const result of partsTransform({ key: 'value', nested: { inner: 'data' } }, context)) {
                results.push(result);
            }

            expect(results).toHaveLength(1);
            expect(results[0].status.message.parts[0].kind).toBe('data');
            expect(results[0].status.message.parts[0].data.key).toBe('value');
        });
    });

    describe('Message Transform', () => {
        it('should transform string messages', async () => {
            const messageTransform = transform.Message();
            const context = createMockContext();
            const results: any[] = [];

            for await (const result of messageTransform('hello world', context)) {
                results.push(result);
            }

            expect(results).toHaveLength(1);
            expect(results[0].kind).toBe('message');
            expect(results[0].parts[0].text).toBe('hello world');
        });

        it('should transform message objects', async () => {
            const messageTransform = transform.Message();
            const context = createMockContext();
            const results: any[] = [];

            const message = des6.message({
                role: 'agent',
                parts: [{ kind: 'text', text: 'custom message' }],
            });

            for await (const result of messageTransform(message, context)) {
                results.push(result);
            }

            expect(results).toHaveLength(1);
            expect(results[0].kind).toBe('message');
            expect(results[0].role).toBe('agent');
        });

        it('should throw error for array of messages', async () => {
            const messageTransform = transform.Message();
            const context = createMockContext();
            const promise = async () => {
                for await (const _ of messageTransform(['msg1', 'msg2'] as any, context)) {
                    // consume
                }
            };
            await expect(promise()).rejects.toThrow('Array of messages is not supported');
        });
    });

    describe('Artifact Transform', () => {
        it('should transform artifact objects', async () => {
            const artifactTransform = transform.Artifact();
            const context = createMockContext();
            const results: any[] = [];

            const artifact = des6.artifact({
                artifactId: 'test-artifact',
                parts: [{ kind: 'text', text: 'artifact content' }],
            });

            for await (const result of artifactTransform(artifact, context)) {
                results.push(result);
            }

            expect(results).toHaveLength(1);
            expect(results[0].kind).toBe('artifact-update');
            expect(results[0].artifact.artifactId).toBe('test-artifact');
        });

        it('should transform multiple artifacts', async () => {
            const artifactTransform = transform.Artifact();
            const context = createMockContext();
            const results: any[] = [];

            const artifacts = [
                des6.artifact({ artifactId: 'artifact-1' }),
                des6.artifact({ artifactId: 'artifact-2' }),
            ];

            for await (const result of artifactTransform(artifacts, context)) {
                results.push(result);
            }

            expect(results).toHaveLength(2);
            expect(results[0].artifact.artifactId).toBe('artifact-1');
            expect(results[1].artifact.artifactId).toBe('artifact-2');
        });
    });

    describe('Status Transform', () => {
        it('should transform status strings', async () => {
            const statusTransform = transform.Status();
            const context = createMockContext();
            const results: any[] = [];

            for await (const result of statusTransform('working', context)) {
                results.push(result);
            }

            expect(results).toHaveLength(1);
            expect(results[0].kind).toBe('status-update');
            expect(results[0].status.state).toBe('working');
        });

        it('should transform status objects', async () => {
            const statusTransform = transform.Status();
            const context = createMockContext();
            const results: any[] = [];

            for await (const result of statusTransform({ status: { state: A2A.TaskState.completed } }, context)) {
                results.push(result);
            }

            expect(results).toHaveLength(1);
            expect(results[0].status.state).toBe('completed');
        });
    });

    describe('Task Transform', () => {
        it('should transform task strings', async () => {
            const taskTransform = transform.Task();
            const context = createMockContext();
            const results: any[] = [];

            for await (const result of taskTransform('task result', context)) {
                results.push(result);
            }

            expect(results).toHaveLength(1);
            expect(results[0].kind).toBe('task');
        });

        it('should transform task objects', async () => {
            const taskTransform = transform.Task();
            const context = createMockContext();
            const results: any[] = [];

            const task = des6.task({
                id: 'custom-task',
                status: { state: A2A.TaskState.completed },
            });

            for await (const result of taskTransform(task, context)) {
                results.push(result);
            }

            expect(results).toHaveLength(1);
            expect(results[0].kind).toBe('task');
            expect(results[0].status.state).toBe('completed');
        });

        it('should throw error for array of tasks', async () => {
            const taskTransform = transform.Task();
            const context = createMockContext();

            const promise = async () => {
                for await (const _ of taskTransform(['task1', 'task2'] as any, context)) {
                    // consume
                }
            };
            await expect(promise()).rejects.toThrow('Array of tasks is not supported');
        });
    });

    describe('Reply Handler', () => {
        it('should handle bare value return', async () => {
            const context = createMockContext();
            const partsTransform = transform.Parts('text');
            const results: any[] = [];
            let carried: any;

            const gen = transform.Reply('hello', context, partsTransform);
            for await (const result of gen) {
                results.push(result);
            }
            carried = undefined; // bare value returns undefined for carry

            expect(results).toHaveLength(1);
            expect(results[0].status.message.parts[0].text).toBe('hello');
        });

        it('should handle array return', async () => {
            const context = createMockContext();
            const partsTransform = transform.Parts('text');
            const results: any[] = [];

            for await (const result of transform.Reply(['hello', 'world'], context, partsTransform)) {
                results.push(result);
            }

            expect(results).toHaveLength(1);
            expect(results[0].status.message.parts).toHaveLength(2);
        });

        it('should handle reply object return', async () => {
            const context = createMockContext();
            const partsTransform = transform.Parts('text');
            const results: any[] = [];

            for await (const result of transform.Reply({ reply: 'hello' }, context, partsTransform)) {
                results.push(result);
            }

            expect(results).toHaveLength(1);
        });

        it('should handle reply with carry return', async () => {
            const context = createMockContext();
            const partsTransform = transform.Parts('text');
            const results: any[] = [];

            const gen = transform.Reply({ reply: 'hello', args: { carried: 'value' } }, context, partsTransform);

            let result = await gen.next();
            while (!result.done) {
                results.push(result.value);
                result = await gen.next();
            }

            expect(results).toHaveLength(1);
            expect(result.value).toEqual({ carried: 'value' });
        });
    });
});
