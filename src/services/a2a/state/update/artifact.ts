/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */

import { A2A } from "~/types/index.js";

export function updateByIndex(
  append: boolean,
  artifacts: A2A.Artifact[],
  index: number,
  artifactUpdate: A2A.Artifact
): { artifacts: A2A.Artifact[]; replaced: boolean } {
  if (append) {
    const existingArtifact: A2A.Artifact = artifacts[index];
    existingArtifact.parts.push(...artifactUpdate.parts);

    if (artifactUpdate.metadata) {
      existingArtifact.metadata = {
        ...(existingArtifact.metadata || {}),
        ...artifactUpdate.metadata,
      };
    }

    if (artifactUpdate.description) {
      existingArtifact.description = artifactUpdate.description;
    }

    if (artifactUpdate.name) {
      existingArtifact.name = artifactUpdate.name;
    }

    artifacts[index] = existingArtifact;
  } else {
    artifacts[index] = { ...artifactUpdate };
  }
  return { artifacts, replaced: true };
}

export function processArtifactUpdate(
  append: boolean,
  artifacts: A2A.Artifact[],
  artifactUpdate: A2A.Artifact
): A2A.Artifact[] {
  const existingIndex = artifacts.findIndex(
    (a) => a.artifactId === artifactUpdate.artifactId
  );

  let replaced: boolean = false;
  let newArtifacts: A2A.Artifact[] = artifacts;

  if (existingIndex !== -1) {
    ({ artifacts: newArtifacts, replaced } = updateByIndex(
      append,
      artifacts,
      existingIndex,
      artifactUpdate
    ));
  }
  if (!replaced) {
    newArtifacts.push({ ...artifactUpdate });
  }
  return newArtifacts;
}
