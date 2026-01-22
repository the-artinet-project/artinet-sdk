/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */

import { logger } from "~/config/index.js";
import { core } from "~/types/index.js";

export abstract class Manager<T> implements core.Manager<T> {
  constructor(
    private _data: Map<string, T> = new Map(),
    private throwOnSet: boolean = true,
    private storage?: core.Manager<T>
  ) {
    //TODO: consider async initialization of storage/lazy loading of cold data (to an upper-bound)
  }

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
    if (this.storage) {
      await this.storage.set(id, data);
    }
  }
  
  async get(id: string): Promise<T | undefined> {
    const data = this.data.get(id);
    if (data) {
      return data;
    }
    if (this.storage) {
      return await this.storage.get(id);
    }
    return undefined;
  }
  
  async delete(id: string): Promise<void> {
    logger.debug(`${this.constructor.name}[delete]:`, { id });
    if (this.storage) {
      /** Probably best to delete from storage first to avoid race conditions. */
      await this.storage.delete(id);
    }
    this.data.delete(id);
  }
  
  async has(id: string): Promise<boolean> {
    if (this.data.has(id)) {
      return true;
    }
    if (this.storage) {
      return await this.storage.has?.(id) ?? false;
    }
    return false;
  }
  
  async list(): Promise<T[]> {
    const listed = Array.from(this.data.values());
    if (this.storage) {
      /** Could be an expensive operation */
      return await this.storage.list?.() ?? [];
    }
    return listed;
  }
}
export const ResourceManager = Manager;
