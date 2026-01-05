/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */

import { A2A } from "~/types/index.js";

export function getLatestHistory(
  task: A2A.Task,
  length?: number
): A2A.Message[] {
  return length ? task.history?.slice(-length) ?? [] : task.history ?? [];
}
