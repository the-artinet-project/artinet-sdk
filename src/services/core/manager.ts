/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
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
    if (!data && this.throwOnSet) {
      throw new Error("Data is required");
    } else if (!data) {
      return;
    }
    this.data.set(id, data);
  }
  async get(id: string): Promise<T | undefined> {
    return this.data.get(id);
  }
  async delete(id: string): Promise<void> {
    this.data.delete(id);
  }
  async has(id: string): Promise<boolean> {
    return this.data.has(id);
  }
  async list(): Promise<T[]> {
    return Array.from(this.data.values());
  }
}
