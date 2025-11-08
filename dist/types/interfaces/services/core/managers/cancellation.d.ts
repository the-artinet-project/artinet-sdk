/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
export interface CancellationManagerInterface {
    addCancellation(id: string): void;
    removeCancellation(id: string): void;
    isCancelled(id: string): boolean;
}
