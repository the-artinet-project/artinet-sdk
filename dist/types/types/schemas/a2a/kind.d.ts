/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
import { z } from "zod";
/**
 * @description Represents the type of event that occurred in the context of a task.
 */
export declare const KindSchema: z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>;
export declare const Kind: z.Values<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>;
export type Kind = z.infer<typeof KindSchema>;
//# sourceMappingURL=kind.d.ts.map