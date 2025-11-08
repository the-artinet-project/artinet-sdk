/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
import { Artifact } from "../../../../types/index.js";
export declare function updateByIndex(append: boolean, artifacts: Artifact[], index: number, artifactUpdate: Artifact): {
    artifacts: Artifact[];
    replaced: boolean;
};
export declare function processArtifactUpdate(append: boolean, artifacts: Artifact[], artifactUpdate: Artifact): Artifact[];
