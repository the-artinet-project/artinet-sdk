/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Store<T> {
  set(data: T, id?: string): Promise<void>;
  get(id: string): Promise<T | undefined>;
}
