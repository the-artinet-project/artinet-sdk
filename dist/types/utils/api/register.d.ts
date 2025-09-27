/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
import { IRegistration } from "@artinet/metadata-validator";
import { AgentCard } from "../../types/index.js";
/**
 * Registers an agent with the A2A registry.
 * @param metadata The metadata to register.
 * @returns A promise that resolves to the registration ID.
 */
export declare function apiRegister(metadata: string): Promise<{
    success: boolean;
    registrationId?: string;
    error?: string;
}>;
/**
 * Converts an AgentCard object into a RegistrationSchema object.
 * @param card The AgentCard to convert.
 * @returns A RegistrationSchema object.
 */
export declare function convert(card: AgentCard): IRegistration;
/**
 * Registers an agent with the A2A registry.
 * @param card The AgentCard to register.
 * @returns A promise that resolves to the registration ID.
 */
export declare function register(card: AgentCard): Promise<string>;
//# sourceMappingURL=register.d.ts.map