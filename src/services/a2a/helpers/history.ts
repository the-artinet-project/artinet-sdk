/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */

import { Message, Task } from "~/types/index.js";

export function getLatestHistory(task: Task, length?: number): Message[] {
  return length ? task.history?.slice(-length) ?? [] : task.history ?? [];
}
