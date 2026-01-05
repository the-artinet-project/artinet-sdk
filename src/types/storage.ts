/**
 * @note prefer implementing `Manager` instead of `IStore` as it provides a more robust interface.
 *  Interface for a store of data.
 * @template T - The type of data to store
 */
export interface IStore<T> {
  set(id: string, data: T): Promise<void>;
  get(id: string): Promise<T | undefined>;
}
