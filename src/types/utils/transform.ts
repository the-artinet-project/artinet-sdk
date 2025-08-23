/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Type-safe object key transformation utilities using built-in TypeScript utility types
 */

/**
 * Forces TypeScript to evaluate and flatten intersection types into a single object type
 * This makes IDE tooltips and type displays much cleaner
 */
type Simplify<T> = { [K in keyof T]: T[K] } & {};

/**
 * Configuration for renaming keys - maps old key names to new key names
 * For best results, use `as const` to preserve literal string types
 */
export type RenameConfig<T extends object> = {
  readonly [K in keyof T]?: string;
};

/**
 * Transform object type by renaming specified keys using built-in utility types
 * This combines Pick/Omit patterns with Record to achieve key renaming
 * Uses Simplify to flatten the final type for cleaner IDE display
 */
export type TransformKeys<
  T extends object,
  Config extends RenameConfig<T>,
> = Simplify<
  // Keep all properties that are NOT being renamed
  Omit<T, keyof Config> & {
    // Create new properties with renamed keys
    [OriginalKey in keyof Config & keyof T as Config[OriginalKey] extends string
      ? Config[OriginalKey]
      : OriginalKey]: T[OriginalKey];
  }
>;

/**
 * Runtime function to transform object keys based on configuration
 * Uses the TransformKeys utility type for return type inference
 */
export function transformKeys<T extends object, Config extends RenameConfig<T>>(
  obj: T,
  config: Config
): TransformKeys<T, Config> {
  const result: any = {};

  // Process each property in the original object
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const newKeyName = config[key as keyof Config];

      if (typeof newKeyName === "string") {
        // Rename the key
        result[newKeyName] = obj[key];
      } else {
        // Keep original key
        result[key] = obj[key];
      }
    }
  }

  return result as TransformKeys<T, Config>;
}

/**
 * Helper type to extract the transformed type for a given object and config
 * Useful for declaring variables with the expected transformed type
 * Uses Simplify to show clean, flattened types in IDE
 */
export type Transformed<
  T extends object,
  Config extends RenameConfig<T>,
> = Simplify<TransformKeys<T, Config>>;

/**
 * Utility to create a type-safe rename configuration with better intellisense
 * The returned function preserves literal string types
 */
export function createRenameConfig<T extends object>() {
  return function <Config extends RenameConfig<T>>(config: Config): Config {
    return config;
  };
}

/**
 * Common transformation patterns using built-in utility types
 */
// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace TransformPatterns {
  /**
   * Convert snake_case keys to camelCase
   * This is a type-level template but would need runtime implementation
   */
  export type SnakeToCamel<T extends string> =
    T extends `${infer First}_${infer Rest}`
      ? `${First}${Capitalize<SnakeToCamel<Rest>>}`
      : T;

  /**
   * Pick specific keys and optionally rename them
   */
  export type PickAndRename<
    T extends object,
    Keys extends keyof T,
    Config extends Partial<Record<Keys, string>>,
  > = Simplify<TransformKeys<Pick<T, Keys>, Config>>;

  /**
   * Omit specific keys and optionally rename remaining ones
   */
  export type OmitAndRename<
    T extends object,
    OmitKeys extends keyof T,
    Config extends RenameConfig<Omit<T, OmitKeys>>,
  > = Simplify<TransformKeys<Omit<T, OmitKeys>, Config>>;
}
