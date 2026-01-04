/**
 * @note: please prefer using {@link core.Manager} instead
 *  Interface for a store of data.
 * @template T - The type of data to store
 */
export interface IStore<T> {
  set(id: string, data: T): Promise<void>;
  get(id: string): Promise<T | undefined>;
}
