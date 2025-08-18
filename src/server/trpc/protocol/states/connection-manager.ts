export interface ConnectionManagerInterface {
  addConnection(id: string): void;
  removeConnection(id: string): void;
  isConnected(id: string): boolean;
}

export class ConnectionManager implements ConnectionManagerInterface {
  private connections: Set<string> = new Set();
  addConnection(id: string) {
    this.connections.add(id);
  }
  removeConnection(id: string) {
    this.connections.delete(id);
  }
  isConnected(id: string) {
    return this.connections.has(id);
  }
}
