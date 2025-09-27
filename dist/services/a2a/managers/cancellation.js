/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
export class CancellationManager {
    cancellations = new Set();
    addCancellation(id) {
        this.cancellations.add(id);
    }
    removeCancellation(id) {
        this.cancellations.delete(id);
    }
    isCancelled(id) {
        return this.cancellations.has(id);
    }
}
//# sourceMappingURL=cancellation.js.map