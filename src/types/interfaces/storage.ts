export interface Store<T> {
  set(data: T, id?: string): Promise<void>;
  get(id: string): Promise<T | undefined>;
}
