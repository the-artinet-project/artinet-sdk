/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
import { A2A } from "~/types/index.js";

export const FINAL_STATES: A2A.TaskState[] = [
  A2A.TaskState.completed,
  A2A.TaskState.failed,
  A2A.TaskState.canceled,
  A2A.TaskState.rejected,
];

export const PROCESSING_STATES: A2A.TaskState[] = [
  A2A.TaskState.working,
  A2A.TaskState.submitted,
];
export const isProcessing = (state: A2A.TaskState) => PROCESSING_STATES.includes(state);