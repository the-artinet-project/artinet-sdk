/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
import { TaskAndHistory, TaskStore } from "../../../types/index.js";
import { UpdateProps } from "./update/update.js";
export declare function processUpdate(taskStore: TaskStore, updateProps: UpdateProps): Promise<TaskAndHistory>;
