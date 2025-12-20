/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */

import { MethodOptions } from "~/types/index.js";
import {
  getTask,
  cancelTask,
  sendMessage,
  streamMessage,
  resubscribe,
} from "../methods/index.js";

export function createMethods(methods?: Partial<MethodOptions>): MethodOptions {
  return {
    getTask: methods?.getTask ?? getTask,
    cancelTask: methods?.cancelTask ?? cancelTask,
    sendMessage: methods?.sendMessage ?? sendMessage,
    streamMessage: methods?.streamMessage ?? streamMessage,
    resubscribe: methods?.resubscribe ?? resubscribe,
  };
}

import { v2 } from "~/types/interfaces/services/v2/index.js";
import {
  getTaskV2,
  cancelTaskV2,
  sendMessageV2,
  streamMessageV2,
  resubscribeTaskV2,
} from "../methods/index.js";

export function createHandler(
  methods?: Omit<Partial<v2.a2a.RequestHandler>, "getAgentCard">
): Omit<v2.a2a.RequestHandler, "getAgentCard"> {
  return {
    getTask: methods?.getTask ?? getTaskV2,
    cancelTask: methods?.cancelTask ?? cancelTaskV2,
    sendMessage: methods?.sendMessage ?? sendMessageV2,
    streamMessage: methods?.streamMessage ?? streamMessageV2,
    resubscribe: methods?.resubscribe ?? resubscribeTaskV2,
  };
}
