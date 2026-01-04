import { describe, it, beforeEach, afterEach, expect } from "@jest/globals";
import { join } from "path";
import { mkdtemp, rm } from "fs/promises";
import * as os from "os";
import { A2A, Files } from "../../src/index.js";

describe("FileStore", () => {
  let tempDir: string;
  let fileStore: Files;

  // Create a temporary directory for testing
  beforeEach(async () => {
    tempDir = await mkdtemp(join(os.tmpdir(), "a2a-file-store-test-"));
    fileStore = new Files(tempDir);
  });

  // Clean up the temporary directory after tests
  afterEach(async () => {
    await rm(tempDir, { recursive: true, force: true });
  });

  it("should save and retrieve a task", async () => {
    const taskId = "test-task-1";
    const task: A2A.Task = {
      id: taskId,
      contextId: "test-context-id",
      kind: "task",
      status: {
        state: A2A.TaskState.working,
        timestamp: new Date().toISOString(),
      },
    };

    // Save the task
    await fileStore.set(taskId, task);

    // Retrieve the task
    const result: A2A.Task | undefined = await fileStore.get(taskId);

    expect(result).toBeDefined();
    expect(result?.id).toBe(taskId);
    expect(result?.status.state).toBe("working");
  });

  it("should update an existing task", async () => {
    const taskId = "test-task-2";
    const task: A2A.Task = {
      id: taskId,
      contextId: "test-context-id",
      kind: "task",
      status: {
        state: A2A.TaskState.submitted,
        timestamp: new Date().toISOString(),
      },
    };

    // Save the task initially
    await fileStore.set(taskId, task);

    // Update the task
    const updatedTask: A2A.Task = {
      id: taskId,
      contextId: "test-context-id",
      kind: "task",
      status: {
        state: A2A.TaskState.completed,
        timestamp: new Date().toISOString(),
      },
      artifacts: [
        {
          artifactId: "test-artifact-id",
          name: "result.txt",
          parts: [
            {
              kind: "text",
              text: "Task completed successfully",
            },
          ],
        },
      ],
    };

    await fileStore.set(taskId, updatedTask);

    // Retrieve the updated task
    const result: A2A.Task | undefined = await fileStore.get(taskId);

    expect(result).toBeDefined();
    expect(result?.id).toBe(taskId);
    expect(result?.status.state).toBe("completed");
    expect(result?.artifacts).toBeDefined();
    expect(result?.artifacts?.length).toBe(1);
    expect(result?.artifacts?.[0].name).toBe("result.txt");
  });

  it("should not throw for non-existent task", async () => {
    const nonExistentTaskId = "non-existent-task";

    const result: A2A.Task | undefined = await fileStore.get(nonExistentTaskId);
    expect(result).toBeUndefined();
  });

  it("should handle tasks with artifacts containing file parts", async () => {
    const taskId = "test-file-task";
    const fileContent = "SGVsbG8gQTJBIQ=="; // Base64 encoded "Hello A2A!"

    const task: A2A.Task = {
      id: taskId,
      contextId: "test-context-id",
      kind: "task",
      status: {
        state: A2A.TaskState.completed,
        timestamp: new Date().toISOString(),
      },
      artifacts: [
        {
          artifactId: "test-artifact-id",
          name: "example.txt",
          parts: [
            {
              kind: "file",
              file: {
                name: "example.txt",
                mimeType: "text/plain",
                bytes: fileContent,
              },
            },
          ],
        },
      ],
    };

    // Save the task
    await fileStore.set(taskId, task);

    // Retrieve the task
    const result: A2A.Task | undefined = await fileStore.get(taskId);

    expect(result).toBeDefined();
    expect(result?.artifacts).toBeDefined();
    expect(result?.artifacts?.length).toBe(1);

    const filePart = result?.artifacts?.[0].parts[0];
    expect(filePart?.kind).toBe("file");
    expect((filePart as any).file.name).toBe("example.txt");
    expect((filePart as any).file.bytes).toBe(fileContent);
  });

  it("should handle tasks with multiple artifacts", async () => {
    const taskId = "multi-artifact-task";

    const task: A2A.Task = {
      id: taskId,
      contextId: "test-context-id",
      kind: "task",
      status: {
        state: A2A.TaskState.completed,
        timestamp: new Date().toISOString(),
      },
      artifacts: [
        {
          artifactId: "test-artifact-id",
          name: "result1.txt",
          parts: [
            {
              kind: "text",
              text: "First result",
            },
          ],
        },
        {
          artifactId: "test-artifact-id-2",
          name: "result2.txt",
          parts: [
            {
              kind: "text",
              text: "Second result",
            },
          ],
        },
      ],
    };

    // Save the task
    await fileStore.set(taskId, task);

    // Retrieve the task
    const result: A2A.Task | undefined = await fileStore.get(taskId);

    expect(result).toBeDefined();
    expect(result?.artifacts).toBeDefined();
    expect(result?.artifacts?.length).toBe(2);
    expect(result?.artifacts?.[0].name).toBe("result1.txt");
    expect(result?.artifacts?.[1].name).toBe("result2.txt");
  });

  it("should save and retrieve task history", async () => {
    const taskId = "history-task";
    const history: A2A.Message[] = [
      {
        messageId: "test-message-id-1",
        kind: "message",
        role: "user",
        parts: [
          {
            kind: "text",
            text: "Initial request",
          },
        ],
      },
      {
        messageId: "test-message-id-2",
        kind: "message",
        role: "agent",
        parts: [
          {
            kind: "text",
            text: "Agent response",
          },
        ],
      },
    ];
    const task: A2A.Task = {
      id: taskId,
      contextId: "test-context-id",
      kind: "task",
      status: {
        state: A2A.TaskState.completed,
        timestamp: new Date().toISOString(),
      },
      history: history,
    };

    // Save the task with history
    await fileStore.set(taskId, task);

    // Retrieve the task and history
    const result: A2A.Task | undefined = await fileStore.get(taskId);

    expect(result).toBeDefined();
    expect(result?.history).toBeDefined();
    expect(result?.history?.length).toBe(2);
    expect(result?.history?.[0].role).toBe("user");
    expect(result?.history?.[1].role).toBe("agent");
  });
});
