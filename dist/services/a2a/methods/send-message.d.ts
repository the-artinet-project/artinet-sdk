/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
import { MessageSendParams, SendMessageSuccessResult, MethodParams } from "../../../types/index.js";
export declare function sendMessage(input: MessageSendParams, params: MethodParams): Promise<SendMessageSuccessResult>;
export type SendMessageMethod = typeof sendMessage;
