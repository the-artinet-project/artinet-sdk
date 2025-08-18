import { TaskAndHistory } from "../../../interfaces/store.js";

export interface TaskManagerInterface {
  getState(id: string): TaskAndHistory | undefined;
  setState(id: string, data: TaskAndHistory): void;
  getTasks(): string[];
}

export class TaskManager implements TaskManagerInterface {
  private states: Map<string, TaskAndHistory> = new Map();
  getState(id: string) {
    return this.states.get(id);
  }
  setState(id: string, data: TaskAndHistory) {
    this.states.set(id, data);
  }
  getTasks() {
    return Array.from(this.states.keys());
  }
}
