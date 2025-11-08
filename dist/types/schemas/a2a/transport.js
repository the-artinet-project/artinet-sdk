/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
import { z } from "zod";
/**
 * @description Supported A2A transport protocols.
 */
export const TransportProtocolSchema = z.enum(["JSONRPC", "GRPC", "HTTP+JSON"]);
/**
 * @description Declares a combination of a target URL and a transport protocol for interacting with the agent.
 * This allows agents to expose the same functionality over multiple transport mechanisms.
 */
export const AgentInterfaceSchema = z.object({
    /**
     * @required The URL where this interface is available. Must be a valid absolute HTTPS URL in production.
     */
    url: z
        .string()
        .url()
        .describe("The URL where this interface is available. Must be a valid absolute HTTPS URL in production."),
    /**
     * @required The transport protocol supported at this URL.
     */
    transport: z
        .union([TransportProtocolSchema, z.string()])
        .describe("The transport protocol supported at this URL."),
});
