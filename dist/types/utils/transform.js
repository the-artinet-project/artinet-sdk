/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Runtime function to transform object keys based on configuration
 * Uses the TransformKeys utility type for return type inference
 */
export function transformKeys(obj, config) {
    const result = {};
    // Process each property in the original object
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            const newKeyName = config[key];
            if (typeof newKeyName === "string") {
                // Rename the key
                result[newKeyName] = obj[key];
            }
            else {
                // Keep original key
                result[key] = obj[key];
            }
        }
    }
    return result;
}
/**
 * Utility to create a type-safe rename configuration with better intellisense
 * The returned function preserves literal string types
 */
export function createRenameConfig() {
    return function (config) {
        return config;
    };
}
//# sourceMappingURL=transform.js.map