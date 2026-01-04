/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */

import { A2A } from "~/types/index.js";
import {
  getTask,
  cancelTask,
  sendMessage,
  sendMessageStream,
  subscribeToTask,
} from "../handlers/index.js";

export function bindHandles(handles?: Partial<A2A.Handles>): A2A.Handles {
  return {
    getTask: handles?.getTask ?? getTask,
    cancelTask: handles?.cancelTask ?? cancelTask,
    sendMessage: handles?.sendMessage ?? sendMessage,
    sendMessageStream: handles?.sendMessageStream ?? sendMessageStream,
    streamMessage: handles?.streamMessage ?? sendMessageStream,
    resubscribe: handles?.resubscribe ?? subscribeToTask,
  };
}
