/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */

import { logger } from "~/config/index.js";

//TODO: Add persistence layer plugin support and turn Manager into an LRU cache.
/**
 * Manager should optionally take a persistent storage object as a constructor parameter,
 * That way we don't need to re-implement the same caching logic for each derived manager.
 */
export abstract class Manager<T> {
  constructor(
    private _data: Map<string, T> = new Map(),
    private throwOnSet: boolean = true
  ) {}
  get data(): Map<string, T> {
    return this._data;
  }
  async set(id: string, data?: T): Promise<void> {
    logger.debug(`${this.constructor.name}[set]:`, { id });
    if (!data && this.throwOnSet) {
      throw new Error("Data is required");
    } else if (!data) {
      return;
    }
    this.data.set(id, data);
  }
  async get(id: string): Promise<T | undefined> {
    // logger.debug(`${this.constructor.name}[get]:`, { id });
    return this.data.get(id);
  }
  async delete(id: string): Promise<void> {
    logger.debug(`${this.constructor.name}[delete]:`, { id });
    this.data.delete(id);
  }
  async has(id: string): Promise<boolean> {
    // logger.debug(`${this.constructor.name}[has]:`, { id });
    return this.data.has(id);
  }
  async list(): Promise<T[]> {
    // logger.debug(`${this.constructor.name}[list]:`);
    return Array.from(this.data.values());
  }
}
export const ResourceManager = Manager;
