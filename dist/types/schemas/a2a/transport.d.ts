/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
import { z } from "zod";
/**
 * @description Supported A2A transport protocols.
 */
export declare const TransportProtocolSchema: z.ZodEnum<["JSONRPC", "GRPC", "HTTP+JSON"]>;
export type TransportProtocol = z.infer<typeof TransportProtocolSchema>;
/**
 * @description Declares a combination of a target URL and a transport protocol for interacting with the agent.
 * This allows agents to expose the same functionality over multiple transport mechanisms.
 */
export declare const AgentInterfaceSchema: z.ZodObject<{
    /**
     * @required The URL where this interface is available. Must be a valid absolute HTTPS URL in production.
     */
    url: z.ZodString;
    /**
     * @required The transport protocol supported at this URL.
     */
    transport: z.ZodUnion<[z.ZodEnum<["JSONRPC", "GRPC", "HTTP+JSON"]>, z.ZodString]>;
}, "strip", z.ZodTypeAny, {
    url: string;
    transport: string;
}, {
    url: string;
    transport: string;
}>;
export type AgentInterface = z.infer<typeof AgentInterfaceSchema>;
