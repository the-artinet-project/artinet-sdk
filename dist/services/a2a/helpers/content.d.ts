/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
import { UpdateEvent } from "../../../types/index.js";
/**
 * Extracts the content of an agent response.
 * @param input - The input event.
 * @returns The content of the input event.
 */
export declare function getContent(input: UpdateEvent): string | undefined;
