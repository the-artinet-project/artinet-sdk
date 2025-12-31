/**
 * Utility type that omits the `kind` property from an object type.
 */
export type Kindless<T extends object> = Omit<T, "kind">;
