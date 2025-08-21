import { EventManagerInterface } from "../managers/event.js";
import { CoreCommand, CoreState, CoreUpdate } from "./types.js";

/**
 * @description The context of the task.
 * @type {CoreContext<TCommand, TState>}
 * @param {TCommand} command - The command to execute.
 * @param {TState} state - The state of the task.
 * @param {EventManager<TCommand, TState>} events - The event manager for the task.
 * @param {AbortSignal} signal - The signal to abort the task.
 * @param {boolean} isCancelled - Whether the task is cancelled.
 * @note This will become an increasingly important part of the system as Context Engineering becomes more important.
 */
export interface CoreContext<
  TCommand extends CoreCommand = CoreCommand,
  TState extends CoreState = CoreState,
  TUpdate extends CoreUpdate = CoreUpdate,
> {
  readonly contextId: string;
  command: TCommand;
  readonly isCancelled: () => boolean;
  readonly signal: AbortSignal;
  readonly events: EventManagerInterface<TCommand, TState, TUpdate>;
}
