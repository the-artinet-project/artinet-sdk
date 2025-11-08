/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
export function updateByIndex(append, artifacts, index, artifactUpdate) {
    if (append) {
        const existingArtifact = artifacts[index];
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
    }
    else {
        artifacts[index] = { ...artifactUpdate };
    }
    return { artifacts, replaced: true };
}
export function processArtifactUpdate(append, artifacts, artifactUpdate) {
    const existingIndex = artifacts.findIndex((a) => a.artifactId === artifactUpdate.artifactId);
    let replaced = false;
    let newArtifacts = artifacts;
    if (existingIndex !== -1) {
        ({ artifacts: newArtifacts, replaced } = updateByIndex(append, artifacts, existingIndex, artifactUpdate));
    }
    if (!replaced) {
        newArtifacts.push({ ...artifactUpdate });
    }
    return newArtifacts;
}
