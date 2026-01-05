/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */

import { A2A } from "~/types/index.js";

export class TextPart {
  private readonly _part: A2A.TextPart;
  constructor(params: string) {
    this._part = {
      text: params,
      kind: A2A.Kind.text,
    };
  }
  get part(): A2A.TextPart {
    return this._part;
  }
  static create(params: string): A2A.TextPart {
    return new TextPart(params).part;
  }
}

export type FileParams =
  | (Partial<A2A.File> & { bytes: string })
  | (Partial<A2A.File> & { uri: string });

export type FilePartParams = string | FileParams;

export class FilePart {
  private readonly _part: A2A.FilePart;
  constructor(params: FileParams) {
    this._part = {
      kind: A2A.Kind.file,
      file: params,
    };
  }
  get part(): A2A.FilePart {
    return this._part;
  }
  static create(params: FilePartParams): A2A.FilePart {
    if (typeof params === "string") {
      return new FilePart({ uri: params }).part;
    }
    return new FilePart(params).part;
  }
}

export const filePart = FilePart.create;

export class DataPart {
  private readonly _part: A2A.DataPart;
  constructor(params: Record<string, unknown>) {
    this._part = {
      data: params,
      kind: A2A.Kind.data,
    };
  }
  get part(): A2A.DataPart {
    return this._part;
  }
  static create(params: Record<string, unknown>): A2A.DataPart {
    return new DataPart(params).part;
  }
}

/**
 * Namespace for {@link A2A.Part} creation utilities.
 *
 * @example
 * ```typescript
 * const t = part.text("Hello");
 * const f = part.file("https://example.com/file.pdf");
 * const d = part.data({ key: "value" });
 * ```
 *
 * @public
 * @since 0.6.0
 */
export const part = {
  /**
   * Create a text part.
   * @see {@link A2A.TextPart}
   */
  text: TextPart.create,

  /**
   * Create a file part.
   * @see {@link A2A.FilePart}
   */
  file: FilePart.create,

  /**
   * Create a data part.
   * @see {@link A2A.DataPart}
   */
  data: DataPart.create,
};
