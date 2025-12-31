/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */

import { A2A } from "~/types/index.js";

export function updateArtifact(
  _artifact: A2A.Artifact,
  update: A2A.TaskArtifactUpdateEvent
): A2A.Artifact {
  if (!update.append) return update.artifact;

  const artifactUpdate: A2A.Artifact = update.artifact;
  const artifact: A2A.Artifact = _artifact;

  artifact.metadata = {
    ...(artifact.metadata || {}),
    ...artifactUpdate.metadata,
  };

  artifact.description = artifactUpdate.description;
  artifact.name = artifactUpdate.name;
  artifact.parts.push(...artifactUpdate.parts);

  return artifact;
}

export function upsertArtifact(
  artifacts: A2A.Artifact[],
  update: A2A.TaskArtifactUpdateEvent
): A2A.Artifact[] {
  const updateId = update.artifact.artifactId;
  const index = artifacts.findIndex((a) => a.artifactId === updateId);

  if (index === -1) {
    artifacts.push({ ...update.artifact });
    return artifacts;
  }

  artifacts[index] = updateArtifact(artifacts[index], update);
  return artifacts;
}
