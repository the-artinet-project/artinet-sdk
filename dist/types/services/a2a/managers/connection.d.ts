/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
import { ConnectionManagerInterface } from "../../../types/index.js";
export declare class ConnectionManager implements ConnectionManagerInterface {
    private connections;
    addConnection(id: string): void;
    removeConnection(id: string): void;
    isConnected(id: string): boolean;
}
//# sourceMappingURL=connection.d.ts.map