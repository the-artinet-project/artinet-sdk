/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
import { FactoryParams } from "../../../types/index.js";
import { A2AService } from "../service.js";
export declare function createService(params: FactoryParams): A2AService;
export declare const createAgent: typeof createService;
export type AgentImpl = ReturnType<typeof createAgent>;
