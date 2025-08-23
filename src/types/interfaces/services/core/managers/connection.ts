/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ConnectionManagerInterface {
  addConnection(id: string): void;
  removeConnection(id: string): void;
  isConnected(id: string): boolean;
}
