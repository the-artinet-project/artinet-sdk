/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
export class ContextManager {
    contexts = new Map();
    deleteContext(id) {
        this.contexts.delete(id);
    }
    setContext(id, context) {
        this.contexts.set(id, context);
    }
    getContext(id) {
        return this.contexts.get(id);
    }
}
//# sourceMappingURL=context.js.map