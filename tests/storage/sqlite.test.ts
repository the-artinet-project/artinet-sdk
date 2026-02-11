import { describe, it, expect, beforeEach, beforeAll, afterAll, afterEach } from '@jest/globals';
import { TaskTable, SQLiteStore, createTaskTable, TABLE_NAME } from '../../src/storage/sqlite.js';
import { A2A } from '../../src/types/index.js';

const isBun = typeof globalThis.Bun !== 'undefined';

export const createValidTask = (overrides: Partial<A2A.Task> = {}): A2A.Task => ({
    id: 'test-task-id',
    contextId: 'test-context-id',
    kind: 'task',
    status: { state: 'completed' as const },
    history: [],
    artifacts: [],
    metadata: {},
    ...overrides,
});

async function createTestDb() {
    if (isBun) {
        const { Database } = require('bun:sqlite');
        const sqlite = new Database(':memory:');
        const { drizzle } = await import('drizzle-orm/bun-sqlite');
        return { db: drizzle<TaskTable>(sqlite), sqlite };
    }
    const Database = require('better-sqlite3');
    const sqlite = new Database(':memory:');
    const { drizzle } = await import('drizzle-orm/better-sqlite3');
    return { db: drizzle<TaskTable>(sqlite), sqlite };
}

describe('SQLiteStore', () => {
    let store: SQLiteStore;
    let db: any;
    let sqlite: any;
    beforeAll(async () => {
        ({ db, sqlite } = await createTestDb());
        await createTaskTable(db as any);
    });
    beforeEach(() => {
        store = new SQLiteStore(db);
    });
    afterEach(() => {
        sqlite.exec(`DELETE FROM ${TABLE_NAME}`);
    });
    afterAll(() => {
        sqlite.close();
    });
    it('should create a new store', async () => {
        const result = await store.get('test-task-id');
        expect(result).toBeUndefined();
    });
    it('should set an agent', async () => {
        await store.set('test-task-id', createValidTask());
        const result = await store.get('test-task-id');
        expect(result).toBeDefined();
        expect(result?.id).toBe('test-task-id');
        expect(result?.contextId).toBe('test-context-id');
        expect(result?.kind).toBe('task');
        expect(result?.status.state).toBe(A2A.TaskState.completed);
        expect(result?.history).toEqual([]);
        expect(result?.artifacts).toEqual([]);
        expect(result?.metadata).toEqual({});
    });
    it('should search for an agent', async () => {
        await store.set('test-task-id', createValidTask({ id: 'test-task-id', contextId: 'same' }));
        await store.set('test-task-id-2', createValidTask({ id: 'test-task-id-2', contextId: 'same' }));
        await store.set('test-task-id-3', createValidTask({ id: 'test-task-id-3', contextId: 'same' }));
        const result = await store.search('same');
        expect(result).toBeDefined();
        expect(result?.length).toBe(3);
        expect(result?.[0]?.id).toBe('test-task-id');
        expect(result?.[1]?.id).toBe('test-task-id-2');
        expect(result?.[2]?.id).toBe('test-task-id-3');
    });
    it('should search for specific agent', async () => {
        await store.set('test-lucky-task', createValidTask({ id: 'test-lucky-task' }));
        await store.set('test-task-id-2', createValidTask({ id: 'test-task-id-2' }));
        await store.set('test-task-id-3', createValidTask({ id: 'test-task-id-3' }));
        const result = await store.search('test-lucky-task');
        expect(result).toBeDefined();
        expect(result?.length).toBe(1);
        expect(result?.[0]?.id).toBe('test-lucky-task');
    });

    it('should delete an agent', async () => {
        await store.set('test-lucky-task', createValidTask({ id: 'test-lucky-task' }));
        const set = await store.get('test-lucky-task');
        expect(set).toBeDefined();
        await store.delete('test-lucky-task');
        const deleted = await store.get('test-lucky-task');
        expect(deleted).toBeUndefined();
    });
});
