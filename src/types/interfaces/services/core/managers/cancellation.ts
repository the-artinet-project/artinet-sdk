export interface CancellationManagerInterface {
  addCancellation(id: string): void;
  removeCancellation(id: string): void;
  isCancelled(id: string): boolean;
}
