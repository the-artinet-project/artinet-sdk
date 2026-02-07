/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
import escapeHtml from 'escape-html';

/**
 * Sanitizes a string by escaping HTML characters to prevent XSS attacks.
 * @param str - The string to sanitize.
 * @returns The sanitized string.
 */
export function sanitizeString(str: string): string {
    return escapeHtml(str).trim();
}

/**
 * Generates a timestamp in ISO 8601 format.
 * @returns The current timestamp as a string.
 */
export function getCurrentTimestamp(): string {
    return new Date().toISOString();
}

/**
 * Sleeps for a given number of milliseconds.
 * @param ms - The number of milliseconds to sleep.
 * @returns A promise that resolves when the sleep is complete.
 *
 * @example
 * ```typescript
 * await sleep(1000);
 * ```
 */
export function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Formats a JSON object into a string with indentation.
 * @param json - The JSON object to format.
 * @param replacer - A function that transforms the results.
 * @param space - Adds indentation, white space, and line break characters to the return-value JSON text to make it easier to read.
 * @returns A string representation of the JSON object.
 */
export function formatJson(
    json: object,
    replacer: (number | string)[] | null = null,
    space: string | number = 2,
): string {
    return JSON.stringify(json, replacer, space);
}

/**
 * Formats an error into a standard error object for logging.
 * @param error - The error to format.
 * @returns A standard error object.
 */
export function formatError(error: unknown): Error {
    if (error instanceof Error) {
        return error;
    }
    return new Error(String(error));
}

/**
 * Executes a function immediately.
 * @param fn - The function to execute.
 * @returns The result of the function.
 *
 * @example
 * ```typescript
 * const result = iife(() => {
 *   return 1 + 1;
 * });
 * console.log(result); // 2
 * ```
 * LangChain <3
 * @see https://github.com/langchain-ai/langchainjs/blob/981cf9c480925187a524fd6ad1dbf0488d2758eb/libs/langchain-core/src/language_models/utils.ts#L5
 */
export const iife = <T>(fn: () => T): T => fn();

export function encodeBase64(data: string): string {
    return Buffer.from(data).toString('base64');
}

export function decodeBase64(data: string): string {
    return Buffer.from(data, 'base64').toString();
}
