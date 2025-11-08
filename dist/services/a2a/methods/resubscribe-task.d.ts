/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
import { TaskIdParams, UpdateEvent, MethodParams } from "../../../types/index.js";
export declare function resubscribe(input: TaskIdParams, params: MethodParams): AsyncGenerator<NonNullable<UpdateEvent>, void, unknown>;
export type ResubscribeTaskMethod = typeof resubscribe;
