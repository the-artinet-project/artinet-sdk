import { A2AServiceInterface } from "./a2a-service.js";

export class A2AServiceImpl implements A2AServiceInterface<any> {
  private connections: Set<string> = new Set();
  private cancellations: Set<string> = new Set();
  private state: Map<string, any> = new Map();

  addConnection(id: string) {
    this.connections.add(id);
  }
  removeConnection(id: string) {
    this.connections.delete(id);
  }
  isCancelled(id: string) {
    return this.cancellations.has(id);
  }
  addCancellation(id: string) {
    this.cancellations.add(id);
  }
  removeCancellation(id: string) {
    this.cancellations.delete(id);
  }
  getState(id: string) {
    return this.state.get(id);
  }
  setState(id: string, data: any) {
    this.state.set(id, data);
  }
}
