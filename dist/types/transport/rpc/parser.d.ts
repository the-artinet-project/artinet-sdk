/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
import { JSONRPCResponse } from "../../types/index.js";
/**
 * Parses a JSON-RPC response string and validates its structure.
 * If the response contains an error, it is thrown as an A2AError.
 * If the response contains neither a result nor an error, a validation error is thrown.
 *
 * @param data Response data as string
 * @returns The parsed and validated response object
 * @throws A2AError if the response contains an error or is invalid
 */
export declare function parseResponse<Res extends JSONRPCResponse>(data: string): Res;
//# sourceMappingURL=parser.d.ts.map