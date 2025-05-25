import type { Task, Message, TaskYieldUpdate } from "./extended-schema.js";

/**
 * Context object provided to the TaskHandler.
 * Contains the information needed for the handler to process the task.
 */
export interface TaskContext {
  /**
   * The current state of the task when the handler is invoked or resumed.
   * This is a snapshot - the latest state may need to be reloaded during async operations.
   */
  task: Task;

  /**
   * The specific user message that triggered this handler invocation or resumption.
   */
  userMessage: Message;

  /**
   * Function to check if cancellation has been requested for this task.
   * Handlers should check this periodically during long-running operations.
   * @returns True if cancellation has been requested, false otherwise.
   */
  isCancelled(): boolean;

  /**
   * The message history associated with the task up to the point the handler is invoked.
   */
  history: Message[];
}

/**
 * Defines the signature for a task handler function.
 *
 * Handlers are implemented as async generators. They receive context about the
 * task and the triggering message. They perform work and yield status
 * or artifact updates (TaskYieldUpdate). The server consumes these yields,
 * updates the task state in the store, and streams events if applicable.
 *
 * @param context The TaskContext object containing task details and state.
 * @yields Updates to the task's status or artifacts.
 * @returns Optionally returns the final complete Task object (needed for non-streaming 'tasks/send').
 *   If void is returned, the server uses the last known state after processing all yields.
 */
export type TaskHandler = (
  context: TaskContext
) => AsyncGenerator<TaskYieldUpdate, Task | void, unknown>;
