/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */

import { logger } from '~/config/index.js';
import { core } from '~/types/index.js';

//TODO: Turn Manager into an LRU cache.
//TODO: Consider warning when size exceeds a certain threshold.
export abstract class Manager<T> implements core.Manager<T> {
    constructor(
        private _cache: Map<string, T> = new Map(),
        private throwOnSet: boolean = true,
        private storage?: core.Manager<T>,
    ) {
        //TODO: consider async initialization of storage/lazy loading of cold data (to an upper-bound)
    }

    get cache(): Map<string, T> {
        return this._cache;
    }

    /**
     * @deprecated use cache instead
     * @note removing in v0.7
     */
    get data(): Map<string, T> {
        return this.cache;
    }

    async set(id: string, data?: T): Promise<void> {
        logger.debug(`${this.constructor.name}[set]:`, { id });
        if (!data && this.throwOnSet) {
            throw new Error('Data is required');
        } else if (!data) {
            return;
        }
        this.cache.set(id, data);
        if (this.storage) {
            await this.storage.set(id, data);
        }
    }

    async get(id: string): Promise<T | undefined> {
        let data: T | undefined = this.cache.get(id);
        if (!data && this.storage) {
            data = await this.storage.get(id);
            if (data) {
                this.cache.set(id, data);
            }
        }
        return data;
    }

    async delete(id: string): Promise<void> {
        logger.debug(`${this.constructor.name}[delete]:`, { id });
        if (this.storage) {
            /** Probably best to delete from storage first to avoid race conditions. */
            await this.storage.delete(id);
        }
        this.cache.delete(id);
    }

    async has(id: string): Promise<boolean> {
        if (this.cache.has(id)) {
            return true;
        }
        if (this.storage) {
            const data: T | undefined = await this.storage.get(id);
            if (data) {
                this.cache.set(id, data);
                return true;
            }
        }
        return false;
    }

    async list(): Promise<T[]> {
        let listed: T[] = Array.from(this.cache.values());
        if (this.storage) {
            /** Could be an expensive operation */
            listed.push(
                ...((await this.storage.list?.())?.filter((item) => item !== undefined && !listed.includes(item)) ??
                    []),
            );
        }
        return listed;
    }

    async search(query: string, filter?: (item: T) => Promise<boolean>): Promise<T[]> {
        if (!filter && !this.storage) {
            const data = this.cache.get(query);
            if (data) {
                return [data];
            }
            return [];
        }
        let results: T[] = [];
        if (filter) {
            results.push(...Array.from(this.cache.values()).filter(filter));
        }
        if (this.storage) {
            const storageFilter = async (item: T) => {
                return ((await filter?.(item)) ?? true) && !results.includes(item);
            };
            /**Spreads are fine for now, but a for of loop and push is safer at scale. */
            results.push(...((await this.storage.search?.(query, storageFilter)) ?? []));
        }
        return results;
    }
}
export const ResourceManager = Manager;
