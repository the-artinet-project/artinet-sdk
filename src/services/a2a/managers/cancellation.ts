/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */

import { CancellationManagerInterface } from "~/types/index.js";

export class CancellationManager implements CancellationManagerInterface {
  private cancellations: Set<string> = new Set();
  addCancellation(id: string) {
    this.cancellations.add(id);
  }
  removeCancellation(id: string) {
    this.cancellations.delete(id);
  }
  isCancelled(id: string) {
    return this.cancellations.has(id);
  }
}
