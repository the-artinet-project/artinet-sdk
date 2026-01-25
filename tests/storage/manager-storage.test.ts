import { describe, it, beforeEach, expect } from '@jest/globals';
import { Manager, ResourceManager } from '../../src/services/core/manager.js';
import { core } from '../../src/types/index.js';

interface TestData {
    id: string;
    value: string;
}

/**
 * Mock storage implementation for testing the Manager storage plugin
 */
class MockStorage implements core.Manager<TestData> {
    private store: Map<string, TestData> = new Map();

    async get(id: string): Promise<TestData | undefined> {
        return this.store.get(id);
    }

    async set(id: string, data?: TestData): Promise<void> {
        if (data) {
            this.store.set(id, data);
        }
    }

    async delete(id: string): Promise<void> {
        this.store.delete(id);
    }

    async has(id: string): Promise<boolean> {
        return this.store.has(id);
    }

    async list(): Promise<TestData[]> {
        return Array.from(this.store.values());
    }

    async search(query: string, filter?: (item: TestData) => Promise<boolean>): Promise<TestData[]> {
        const items = Array.from(this.store.values()).filter(
            (item) => item.id.includes(query) || item.value.includes(query),
        );
        if (!filter) return items;
        const results: TestData[] = [];
        for (const item of items) {
            if (await filter(item)) {
                results.push(item);
            }
        }
        return results;
    }

    // Expose internal store for test assertions
    getInternalStore(): Map<string, TestData> {
        return this.store;
    }
}

/**
 * Concrete implementation of Manager for testing
 */
class TestManager extends Manager<TestData> {
    constructor(
        cache: Map<string, TestData> = new Map(),
        throwOnSet: boolean = true,
        storage?: core.Manager<TestData>,
    ) {
        super(cache, throwOnSet, storage);
    }
}

describe('ResourceManager with Storage Plugin', () => {
    let mockStorage: MockStorage;
    let manager: TestManager;

    beforeEach(() => {
        mockStorage = new MockStorage();
        manager = new TestManager(new Map(), true, mockStorage);
    });

    describe('set', () => {
        it('should write to both cache and storage', async () => {
            const testData: TestData = { id: 'test-1', value: 'hello' };

            await manager.set('test-1', testData);
            expect(manager.cache.get('test-1')).toEqual(testData);
            expect(await mockStorage.get('test-1')).toEqual(testData);
        });

        it('should throw when data is undefined and throwOnSet is true', async () => {
            await expect(manager.set('test-1', undefined)).rejects.toThrow('Data is required');
        });

        it('should not write to storage when data is undefined and throwOnSet is false', async () => {
            const managerNoThrow = new TestManager(new Map(), false, mockStorage);

            await managerNoThrow.set('test-1', undefined);

            expect(managerNoThrow.cache.get('test-1')).toBeUndefined();
            expect(await mockStorage.get('test-1')).toBeUndefined();
        });
    });

    describe('get', () => {
        it('should return data from cache if present', async () => {
            const testData: TestData = { id: 'cached', value: 'from-cache' };
            manager.cache.set('cached', testData);

            const result = await manager.get('cached');

            expect(result).toEqual(testData);
        });

        it('should fall back to storage when not in cache', async () => {
            const testData: TestData = { id: 'stored', value: 'from-storage' };
            await mockStorage.set('stored', testData);

            const result = await manager.get('stored');

            expect(result).toEqual(testData);
        });

        it('should populate cache after retrieving from storage', async () => {
            const testData: TestData = { id: 'stored', value: 'from-storage' };
            await mockStorage.set('stored', testData);

            await manager.get('stored');

            expect(manager.cache.get('stored')).toEqual(testData);
        });

        it('should return undefined when data is not in cache or storage', async () => {
            const result = await manager.get('non-existent');

            expect(result).toBeUndefined();
        });

        it('should prioritize cache over storage', async () => {
            const cachedData: TestData = { id: 'priority', value: 'cache-value' };
            const storedData: TestData = { id: 'priority', value: 'storage-value' };

            manager.cache.set('priority', cachedData);
            await mockStorage.set('priority', storedData);

            const result = await manager.get('priority');

            expect(result).toEqual(cachedData);
        });
    });

    describe('delete', () => {
        it('should delete from both storage and cache', async () => {
            const testData: TestData = { id: 'to-delete', value: 'delete-me' };
            await manager.set('to-delete', testData);

            expect(manager.cache.get('to-delete')).toEqual(testData);
            expect(await mockStorage.get('to-delete')).toEqual(testData);

            await manager.delete('to-delete');

            expect(manager.cache.get('to-delete')).toBeUndefined();
            expect(await mockStorage.get('to-delete')).toBeUndefined();
        });

        it('should delete from storage before cache', async () => {
            const deletionOrder: string[] = [];
            const trackingStorage: core.Manager<TestData> = {
                get: async () => undefined,
                set: async () => {},
                delete: async () => {
                    deletionOrder.push('storage');
                },
            };

            const trackingManager = new TestManager(
                new Map([['test', { id: 'test', value: 'test' }]]),
                true,
                trackingStorage,
            );

            // Override cache.delete to track order
            const originalDelete = trackingManager.cache.delete.bind(trackingManager.cache);
            trackingManager.cache.delete = (key) => {
                deletionOrder.push('cache');
                return originalDelete(key);
            };

            await trackingManager.delete('test');

            expect(deletionOrder).toEqual(['storage', 'cache']);
        });
    });

    describe('has', () => {
        it('should return true when data is in cache', async () => {
            manager.cache.set('in-cache', { id: 'in-cache', value: 'cached' });

            const result = await manager.has('in-cache');

            expect(result).toBe(true);
        });

        it('should return true when data is in storage but not cache', async () => {
            await mockStorage.set('in-storage', { id: 'in-storage', value: 'stored' });

            const result = await manager.has('in-storage');

            expect(result).toBe(true);
        });

        it('should populate cache after finding in storage via has', async () => {
            const testData: TestData = { id: 'in-storage', value: 'stored' };
            await mockStorage.set('in-storage', testData);

            await manager.has('in-storage');

            expect(manager.cache.get('in-storage')).toEqual(testData);
        });

        it('should return false when data is not in cache or storage', async () => {
            const result = await manager.has('non-existent');

            expect(result).toBe(false);
        });
    });

    describe('list', () => {
        it('should return items from cache', async () => {
            const item1: TestData = { id: 'cache-1', value: 'value-1' };
            const item2: TestData = { id: 'cache-2', value: 'value-2' };
            manager.cache.set('cache-1', item1);
            manager.cache.set('cache-2', item2);

            const result = await manager.list();

            expect(result).toHaveLength(2);
            expect(result).toContainEqual(item1);
            expect(result).toContainEqual(item2);
        });

        it('should combine items from cache and storage', async () => {
            const cachedItem: TestData = { id: 'cached', value: 'from-cache' };
            const storedItem: TestData = { id: 'stored', value: 'from-storage' };

            manager.cache.set('cached', cachedItem);
            await mockStorage.set('stored', storedItem);

            const result = await manager.list();

            expect(result).toHaveLength(2);
            expect(result).toContainEqual(cachedItem);
            expect(result).toContainEqual(storedItem);
        });

        it('should not duplicate items that exist in both cache and storage', async () => {
            const testData: TestData = { id: 'duplicate', value: 'same' };

            manager.cache.set('duplicate', testData);
            await mockStorage.set('duplicate', testData);

            const result = await manager.list();

            expect(result).toHaveLength(1);
            expect(result[0]).toEqual(testData);
        });
    });

    describe('search', () => {
        it('should return data from cache when no filter and no storage', async () => {
            const managerNoStorage = new TestManager(new Map(), true);
            managerNoStorage.cache.set('test', { id: 'test', value: 'value' });

            const result = await managerNoStorage.search('test');

            expect(result).toEqual([{ id: 'test', value: 'value' }]);
        });

        it('should search storage when available', async () => {
            await mockStorage.set('match-1', { id: 'match-1', value: 'searchable' });
            await mockStorage.set('match-2', { id: 'match-2', value: 'searchable' });
            await mockStorage.set('no-match', { id: 'no-match', value: 'other' });

            const result = await manager.search('searchable');

            expect(result).toHaveLength(2);
        });

        it('should apply filter to search results', async () => {
            await mockStorage.set('a', { id: 'a', value: 'include' });
            await mockStorage.set('b', { id: 'b', value: 'exclude' });

            const filter = async (item: TestData) => item.value === 'include';
            const result = await manager.search('', filter);

            expect(result).toHaveLength(1);
            expect(result[0].id).toBe('a');
        });

        it('should include filtered cache items in search results', async () => {
            manager.cache.set('cached', { id: 'cached', value: 'findme' });

            const filter = async (item: TestData) => item.value.includes('findme');
            const result = await manager.search('findme', filter);

            expect(result).toContainEqual({ id: 'cached', value: 'findme' });
        });

        it('should combine cache and storage search results', async () => {
            manager.cache.set('cached', { id: 'cached', value: 'findme' });
            await mockStorage.set('stored', { id: 'stored', value: 'findme' });

            const filter = async (item: TestData) => item.value.includes('findme');
            const result = await manager.search('findme', filter);

            expect(result).toHaveLength(2);
        });
    });

    describe('without storage plugin', () => {
        let managerNoStorage: TestManager;

        beforeEach(() => {
            managerNoStorage = new TestManager(new Map(), true);
        });

        it('should only use cache for get', async () => {
            managerNoStorage.cache.set('cached', { id: 'cached', value: 'value' });

            const cachedResult = await managerNoStorage.get('cached');
            const missingResult = await managerNoStorage.get('non-existent');

            expect(cachedResult).toEqual({ id: 'cached', value: 'value' });
            expect(missingResult).toBeUndefined();
        });

        it('should only use cache for has', async () => {
            managerNoStorage.cache.set('cached', { id: 'cached', value: 'value' });

            const hasCached = await managerNoStorage.has('cached');
            const hasMissing = await managerNoStorage.has('non-existent');

            expect(hasCached).toBe(true);
            expect(hasMissing).toBe(false);
        });

        it('should only list cache items', async () => {
            managerNoStorage.cache.set('item1', { id: 'item1', value: 'value1' });
            managerNoStorage.cache.set('item2', { id: 'item2', value: 'value2' });

            const result = await managerNoStorage.list();

            expect(result).toHaveLength(2);
        });
    });
});
