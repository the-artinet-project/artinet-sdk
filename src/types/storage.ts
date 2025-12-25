/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Interface for a store of data.
 * @deprecated Use IStore instead
 * @template T - The type of data to store
 */
export interface Store<T> {
  set(data: T, id?: string): Promise<void>;
  get(id: string): Promise<T | undefined>;
}

/**
 * Interface for a store of data.
 * @template T - The type of data to store
 */
export interface IStore<T> {
  set(id: string, data: T): Promise<void>;
  get(id: string): Promise<T | undefined>;
}
