export interface ConnectionManagerInterface {
  addConnection(id: string): void;
  removeConnection(id: string): void;
  isConnected(id: string): boolean;
}
