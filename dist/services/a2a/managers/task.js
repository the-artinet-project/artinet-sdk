/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
export class TaskManager {
    states = new Map();
    getState(id) {
        return this.states.get(id);
    }
    setState(id, data) {
        this.states.set(id, data);
    }
    getStates() {
        return Array.from(this.states.keys());
    }
}
//# sourceMappingURL=task.js.map