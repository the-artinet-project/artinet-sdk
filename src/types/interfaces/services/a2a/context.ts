import {
  type TaskStatusUpdateEvent,
  type TaskArtifactUpdateEvent,
  type Task,
  type Message,
  A2ARequest,
  MessageSendParams,
} from "~types/schemas/a2a/index.js";
import { CoreCommand, CoreState, CoreUpdate } from "../core/context/types.js";
import { TaskAndHistory } from "./legacy.js";

/**
 * Represents the possible types of updates that can be yielded by a TaskHandler.
 * @description Either a Message, Task, TaskStatusUpdateEvent, or TaskArtifactUpdateEvent.
 */
export type UpdateEvent =
  | Message
  | Task
  | TaskStatusUpdateEvent
  | TaskArtifactUpdateEvent;

export type Command<
  TParams extends NonNullable<A2ARequest["params"]> = MessageSendParams,
> = CoreCommand<TParams>;
export type State = CoreState<TaskAndHistory>;
export type Update<TUpdate extends UpdateEvent = UpdateEvent> =
  CoreUpdate<TUpdate>;
