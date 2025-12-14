/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */

import { A2A, Context, TextPart, DataPart, FilePart } from "~/types/index.js";

/**
 * Restricting to command for now, but could be extended to other types of commands in the future.
 * When we shift to CoreCommand, move this into core.
 */
export interface StepArgs<TCommand extends A2A["command"] = A2A["command"]> {
  command: TCommand;
  context: Context;
}

export type StepParams<
  TCommand extends A2A["command"] = A2A["command"],
  TInboundArgs extends readonly unknown[] = []
> = StepArgs<TCommand> & Partial<{ content: string; args: TInboundArgs }>;

export type StepOutput<
  TPart extends DataPart["data"] | FilePart["file"] | TextPart["text"]
> = {
  parts: Array<TPart> | TPart;
};

export type StepOutputWithForwardArgs<
  TPart extends DataPart["data"] | FilePart["file"] | TextPart["text"],
  TForwardArgs extends readonly unknown[] = []
> = StepOutput<TPart> & {
  args: TForwardArgs;
};

export type Step<
  TCommand extends A2A["command"] = A2A["command"],
  TPart extends
    | DataPart["data"]
    | FilePart["file"]
    | TextPart["text"] = TextPart["text"],
  TInboundArgs extends readonly unknown[] = [],
  TForwardArgs extends readonly unknown[] = [],
  TOutput extends
    | StepOutput<TPart>
    | StepOutputWithForwardArgs<TPart, TForwardArgs>
    | Array<TPart>
    | TPart = StepOutput<TPart>
> = (params: StepParams<TCommand, TInboundArgs>) => Promise<TOutput> | TOutput;

export type StepWithKind<
  TCommand extends A2A["command"] = A2A["command"],
  TPart extends
    | DataPart["data"]
    | FilePart["file"]
    | TextPart["text"] = TextPart["text"],
  TInboundArgs extends readonly unknown[] = [],
  TForwardArgs extends readonly unknown[] = [],
  TOutput extends
    | StepOutput<TPart>
    | StepOutputWithForwardArgs<TPart, TForwardArgs>
    | Array<TPart>
    | TPart = StepOutput<TPart>,
  TKind extends "text" | "file" | "data" = "text"
> = {
  step: Step<TCommand, TPart, TInboundArgs, TForwardArgs, TOutput>;
  kind: TKind;
};
//todo: Delete? Should we just use mutable context instead?
export type OutArgsOf<O> = O extends StepOutputWithForwardArgs<any, infer A>
  ? A
  : [];

export interface StepBuilder<
  TCommand extends A2A["command"] = A2A["command"],
  TInboundArgs extends readonly unknown[] = []
> {
  /**
   * Add a step to the builder.
   * @param step - The step to add.
   * @returns A new builder with the step added.
   */
  addStep<
    TPart extends
      | DataPart["data"]
      | FilePart["file"]
      | TextPart["text"] = TextPart["text"],
    TForwardArgs extends readonly unknown[] = [],
    TOutput extends
      | StepOutput<TPart>
      | StepOutputWithForwardArgs<TPart, TForwardArgs>
      | Array<TPart>
      | TPart = StepOutput<TPart>,
    TKind extends "text" | "file" | "data" = "text"
  >(
    step: StepWithKind<
      TCommand,
      TPart,
      TInboundArgs,
      TForwardArgs,
      TOutput,
      TKind
    >
  ): StepBuilder<TCommand, OutArgsOf<TOutput>>;
}
