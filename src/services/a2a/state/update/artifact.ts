import { Artifact } from "~/types/index.js";

export function updateByIndex(
  append: boolean,
  artifacts: Artifact[],
  index: number,
  artifactUpdate: Artifact
): { artifacts: Artifact[]; replaced: boolean } {
  if (append) {
    const existingArtifact: Artifact = artifacts[index];
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
  artifacts: Artifact[],
  artifactUpdate: Artifact
): Artifact[] {
  const existingIndex = artifacts.findIndex(
    (a) => a.artifactId === artifactUpdate.artifactId
  );

  let replaced: boolean = false;
  let newArtifacts: Artifact[] = artifacts;

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
