export interface TaskManagerInterface<TaskType extends {} = {}> {
  getState(id: string): TaskType | undefined;
  setState(id: string, data: TaskType): void;
  getTasks(): string[];
}
