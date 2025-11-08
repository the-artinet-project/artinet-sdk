/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
import { getTask, cancelTask, sendMessage, streamMessage, resubscribe, } from "../methods/index.js";
export function createMethods(methods) {
    return {
        getTask: methods?.getTask ?? getTask,
        cancelTask: methods?.cancelTask ?? cancelTask,
        sendMessage: methods?.sendMessage ?? sendMessage,
        streamMessage: methods?.streamMessage ?? streamMessage,
        resubscribe: methods?.resubscribe ?? resubscribe,
    };
}
