/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * For artinet specific conventions
 * AgentInfo will expand to incorporate additional details required from other protocols
 * (e.g. AgentFAQ(NANDA), AgentCard(A2A), etc.)
 */
export { AgentCardSchema as AgentInfoSchema } from "./schemas/a2a/index.js";
export type { AgentCard as AgentInfo } from "./schemas/a2a/index.js";
export type { A2AEngine as AgentEngine } from "./interfaces/services/a2a/index.js";
export type { A2AServiceInterface as Agent } from "./interfaces/services/a2a/index.js";
