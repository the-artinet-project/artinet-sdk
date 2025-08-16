export interface A2AServiceInterface<TState extends {} = any> {
  addConnection: (id: string) => void;
  removeConnection: (id: string) => void;
  isCancelled: (id: string) => boolean;
  addCancellation: (id: string) => void;
  removeCancellation: (id: string) => void;
  getState: (id: string) => TState | undefined;
  setState: (id: string, data: TState) => void;
}
