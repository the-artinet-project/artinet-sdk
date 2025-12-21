/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */

import { A2A } from "~/types/index.js";
/**
 * Restricting to command for now, but could be extended to other types of commands in the future.
 * When we shift to CoreCommand, move this into core.
 */
export interface StepArgs {
  message: A2A.MessageSendParams;
  context: A2A.Context;
  skip: () => Promise<void> | void;
}
export type BaseArgs = Record<string, unknown>;
export type EmptyArgs = Record<string, never>;
export type StepParams<TInboundArgs extends BaseArgs = EmptyArgs> = StepArgs &
  Partial<{ content: string; args: TInboundArgs }>;

export type PartContent =
  | A2A.DataPart["data"]
  | A2A.FilePart["file"]
  | A2A.TextPart["text"];
export type StepOutput<TPart extends PartContent> = {
  parts: Array<TPart> | TPart;
};

export type StepOutputWithForwardArgs<
  TPart extends PartContent,
  TForwardArgs extends BaseArgs = EmptyArgs
> = StepOutput<TPart> & {
  args: TForwardArgs;
};

export type OutputType<
  TPart extends PartContent,
  TForwardArgs extends BaseArgs = EmptyArgs
> =
  | StepOutput<TPart>
  | StepOutputWithForwardArgs<TPart, TForwardArgs>
  | Array<TPart>
  | TPart;
export type Step<
  TPart extends PartContent = A2A.TextPart["text"],
  TInboundArgs extends BaseArgs = EmptyArgs,
  TForwardArgs extends BaseArgs = EmptyArgs,
  TOutput extends OutputType<TPart, TForwardArgs> = OutputType<
    TPart,
    TForwardArgs
  >
> = (params: StepParams<TInboundArgs>) => Promise<TOutput> | TOutput;

export type StepWithKind<
  TPart extends PartContent = A2A.TextPart["text"],
  TInboundArgs extends BaseArgs = EmptyArgs,
  TForwardArgs extends BaseArgs = EmptyArgs,
  TOutput extends OutputType<TPart, TForwardArgs> = OutputType<
    TPart,
    TForwardArgs
  >,
  TKind extends "text" | "file" | "data" = "text"
> = {
  step: Step<TPart, TInboundArgs, TForwardArgs, TOutput>;
  kind: TKind;
};

export type OutArgsOf<O> = O extends StepOutputWithForwardArgs<any, infer A>
  ? A
  : EmptyArgs;

export interface StepBuilder<TInboundArgs extends BaseArgs = EmptyArgs> {
  /**
   * Add a step to the builder.
   * @param step - The step to add.
   * @returns A new builder with the step added.
   */
  addStep<
    TPart extends PartContent = A2A.TextPart["text"],
    TForwardArgs extends BaseArgs = EmptyArgs,
    TOutput extends OutputType<TPart, TForwardArgs> = OutputType<
      TPart,
      TForwardArgs
    >,
    TKind extends "text" | "file" | "data" = "text"
  >(
    step: StepWithKind<TPart, TInboundArgs, TForwardArgs, TOutput, TKind>
  ): StepBuilder<OutArgsOf<TOutput>>;
}
