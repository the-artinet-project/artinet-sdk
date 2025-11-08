/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
export class ConnectionManager {
    connections = new Set();
    addConnection(id) {
        this.connections.add(id);
    }
    removeConnection(id) {
        this.connections.delete(id);
    }
    isConnected(id) {
        return this.connections.has(id);
    }
}
