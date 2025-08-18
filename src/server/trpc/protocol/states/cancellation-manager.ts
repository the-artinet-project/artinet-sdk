export interface CancellationManagerInterface {
  addCancellation(id: string): void;
  removeCancellation(id: string): void;
  isCancelled(id: string): boolean;
}

export class CancellationManager implements CancellationManagerInterface {
  private cancellations: Set<string> = new Set();
  addCancellation(id: string) {
    this.cancellations.add(id);
  }
  removeCancellation(id: string) {
    this.cancellations.delete(id);
  }
  isCancelled(id: string) {
    return this.cancellations.has(id);
  }
}
