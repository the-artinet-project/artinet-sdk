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

export function createHandler(
  methods?: Omit<Partial<A2A.RequestHandler>, "getAgentCard">
): Omit<A2A.RequestHandler, "getAgentCard"> {
  return {
    getTask: methods?.getTask ?? getTask,
    cancelTask: methods?.cancelTask ?? cancelTask,
    sendMessage: methods?.sendMessage ?? sendMessage,
    sendMessageStream: methods?.sendMessageStream ?? sendMessageStream,
    streamMessage: methods?.streamMessage ?? sendMessageStream,
    resubscribe: methods?.resubscribe ?? subscribeToTask,
  };
}
