/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */

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
