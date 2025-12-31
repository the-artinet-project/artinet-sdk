/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */

import { A2A } from "~/types/index.js";
import {
  ArtifactUpdateParams,
  StatusUpdateParams,
  TaskParams,
} from "./task-builder.js";
import { MessageParams } from "./message-builder.js";

export interface BaseArguments {
  message: A2A.MessageSendParams;
  context: A2A.Context;
  skip: () => Promise<void> | void;
}
export type BaseArgs = Record<string, unknown>;
export type EmptyArgs = Record<string, never>;
export type empty = EmptyArgs;
export type bargs = BaseArgs;
export type InputArguments<CarriedArguments extends BaseArgs = EmptyArgs> =
  BaseArguments & Partial<{ content: string; args: CarriedArguments }>;

export type AcceptedKinds =
  | "text"
  | "file"
  | "data"
  | "message"
  | "artifact-update"
  | "status-update"
  | "task";
/**
 * State will be inherited from the context, so we don't allow the user to pass those arguments back to us.
 */
export type Stateless<T> = T extends object
  ? Omit<T, "taskId" | "contextId">
  : T;

export type data = A2A.DataPart["data"];
export type file = A2A.FilePart["file"];
export type text = A2A.TextPart["text"];
export type sMessage = Stateless<MessageParams>;
export type sArtifact = Stateless<ArtifactUpdateParams>;
export type sUpdate = Stateless<StatusUpdateParams>;
export type sTask = Stateless<TaskParams>;

export type AcceptedParts = data | file | text;

export type AcceptedArrayValues = AcceptedParts | sUpdate | sArtifact;

export type AcceptedReturnValues =
  | AcceptedParts
  | sMessage
  | sArtifact
  | sUpdate
  | sTask;

export type ReturnValue<Ret extends AcceptedReturnValues> = {
  reply: Ret extends AcceptedArrayValues ? Array<Ret> | Ret : Ret;
};

export type ReturnAndCarry<
  Ret extends AcceptedReturnValues,
  Carried extends BaseArgs = EmptyArgs
> = ReturnValue<Ret> & {
  args: Carried;
};

export type Reply<
  Ret extends AcceptedReturnValues,
  Carried extends BaseArgs = EmptyArgs
> =
  | ReturnValue<Ret>
  | ReturnAndCarry<Ret, Carried>
  | Ret
  | (Ret extends AcceptedArrayValues ? Array<Ret> : never);

export type rep<R extends AcceptedReturnValues, C extends BaseArgs> = Reply<
  R,
  C
>;

export type Invocable<
  Ret extends AcceptedReturnValues = A2A.TextPart["text"],
  Input extends BaseArgs = EmptyArgs,
  Carried extends BaseArgs = EmptyArgs,
  Response extends Reply<Ret, Carried> = Reply<Ret, Carried>
> = (params: InputArguments<Input>) => Promise<Response> | Response;

export type Step<
  Ret extends AcceptedReturnValues,
  Input extends BaseArgs = EmptyArgs,
  Carry extends BaseArgs = EmptyArgs
> = Invocable<Ret, Input, Carry, Reply<Ret, Carry>>;

export type Transform<Ret extends AcceptedReturnValues> = (
  payload: Ret | Array<Ret>,
  context: A2A.Context
) => AsyncGenerator<A2A.Update, void, unknown>;

export type Resolved<
  Ret extends AcceptedReturnValues = A2A.TextPart["text"],
  Input extends BaseArgs = EmptyArgs,
  Carried extends BaseArgs = EmptyArgs,
  Response extends Reply<Ret, Carried> = Reply<Ret, Carried>,
  Kind extends AcceptedKinds = "text"
> = {
  id: string;
  step: Invocable<Ret, Input, Carried, Response>;
  kind: Kind;
  handler: Transform<Ret>;
};

export type inferCarry<Carried> = Carried extends ReturnAndCarry<
  any,
  infer Carry
>
  ? Carry
  : EmptyArgs;

export type inC<Carried> = Carried extends ReturnAndCarry<any, infer Carry>
  ? Carry
  : EmptyArgs;

export interface AgentBuilder<Input extends BaseArgs = EmptyArgs> {
  /**
   * Add a step to the builder.
   * @param step - The step to add.
   * @returns A new builder with the step added.
   */
  addStep<
    Ret extends AcceptedReturnValues = A2A.TextPart["text"],
    Carried extends BaseArgs = EmptyArgs,
    Response extends Reply<Ret, Carried> = Reply<Ret, Carried>,
    Kind extends AcceptedKinds = "text"
  >(
    step: Resolved<Ret, Input, Carried, Response, Kind>
  ): AgentBuilder<inC<Response>>;
}

/**
 * Carry Only Returns
 * @internal
 * Potential Upgrade:
 * Currently enforce that args cant be passed back without a reply,
 * but may allow carry only returns in the future.
 *
 * ```typescript
 * type CarryOnly<Carried extends BaseArgs> = {
 *   args: Carried;
 * } & {
 *   reply: never;
 * };
 * ```
 */
