/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */

import { ExecutionEngine } from "../core/execution/index.js";
import { A2ARuntime } from "~/types/index.js";
export type A2AEngine = ExecutionEngine<
  A2ARuntime["command"],
  A2ARuntime["state"],
  A2ARuntime["update"]
>;
