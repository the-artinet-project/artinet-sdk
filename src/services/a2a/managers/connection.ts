import { ConnectionManagerInterface } from "~/types/index.js";

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
