/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
import { MessageSendParams, UpdateEvent } from "../../../types/index.js";
import { MethodParams } from "../../../types/index.js";
export declare function streamMessage(input: MessageSendParams, params: MethodParams): AsyncGenerator<NonNullable<UpdateEvent>, void, unknown>;
export type StreamMessageMethod = typeof streamMessage;
