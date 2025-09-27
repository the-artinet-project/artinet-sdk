/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
import { CancellationManagerInterface } from "../../../types/index.js";
export declare class CancellationManager implements CancellationManagerInterface {
    private cancellations;
    addCancellation(id: string): void;
    removeCancellation(id: string): void;
    isCancelled(id: string): boolean;
}
//# sourceMappingURL=cancellation.d.ts.map