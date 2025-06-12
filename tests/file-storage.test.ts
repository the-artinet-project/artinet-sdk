import { jest } from "@jest/globals";
import { join } from "path";
import { mkdtemp, rm } from "fs/promises";
import * as os from "os";
import {
  configureLogger,
  FileStore,
  Task,
  TaskState,
  Message,
} from "../src/index.js";

configureLogger({ level: "silent" });

describe("FileStore", () => {
  let tempDir: string;
  let fileStore: FileStore;

  // Create a temporary directory for testing
  beforeEach(async () => {
    tempDir = await mkdtemp(join(os.tmpdir(), "a2a-file-store-test-"));
    fileStore = new FileStore(tempDir);
  });

  // Clean up the temporary directory after tests
  afterEach(async () => {
    await rm(tempDir, { recursive: true, force: true });
  });

  it("should save and retrieve a task", async () => {
    const taskId = "test-task-1";
    const task: Task = {
      id: taskId,
      kind: "task",
      status: {
        state: "working" as TaskState,
        timestamp: new Date().toISOString(),
      },
    };

    // Save the task
    await fileStore.save({ task, history: [] });

    // Retrieve the task
    const result = await fileStore.load(taskId);

    expect(result).toBeDefined();
    expect(result?.task.id).toBe(taskId);
    expect(result?.task.status.state).toBe("working");
  });

  it("should update an existing task", async () => {
    const taskId = "test-task-2";
    const task: Task = {
      id: taskId,
      kind: "task",
      status: {
        state: "submitted" as TaskState,
        timestamp: new Date().toISOString(),
      },
    };

    // Save the task initially
    await fileStore.save({ task, history: [] });

    // Update the task
    const updatedTask: Task = {
      id: taskId,
      kind: "task",
      status: {
        state: "completed" as TaskState,
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

    await fileStore.save({ task: updatedTask, history: [] });

    // Retrieve the updated task
    const result = await fileStore.load(taskId);

    expect(result).toBeDefined();
    expect(result?.task.id).toBe(taskId);
    expect(result?.task.status.state).toBe("completed");
    expect(result?.task.artifacts).toBeDefined();
    expect(result?.task.artifacts?.length).toBe(1);
    expect(result?.task.artifacts?.[0].name).toBe("result.txt");
  });

  it("should return null for non-existent task", async () => {
    const nonExistentTaskId = "non-existent-task";

    const result = await fileStore.load(nonExistentTaskId);

    expect(result).toBeNull();
  });

  it("should handle tasks with artifacts containing file parts", async () => {
    const taskId = "test-file-task";
    const fileContent = "SGVsbG8gQTJBIQ=="; // Base64 encoded "Hello A2A!"

    const task: Task = {
      id: taskId,
      kind: "task",
      status: {
        state: "completed" as TaskState,
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
    await fileStore.save({ task, history: [] });

    // Retrieve the task
    const result = await fileStore.load(taskId);

    expect(result).toBeDefined();
    expect(result?.task.artifacts).toBeDefined();
    expect(result?.task.artifacts?.length).toBe(1);

    const filePart = result?.task.artifacts?.[0].parts[0];
    expect(filePart?.kind).toBe("file");
    expect((filePart as any).file.name).toBe("example.txt");
    expect((filePart as any).file.bytes).toBe(fileContent);
  });

  it("should handle tasks with multiple artifacts", async () => {
    const taskId = "multi-artifact-task";

    const task: Task = {
      id: taskId,
      kind: "task",
      status: {
        state: "completed" as TaskState,
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
    await fileStore.save({ task, history: [] });

    // Retrieve the task
    const result = await fileStore.load(taskId);

    expect(result).toBeDefined();
    expect(result?.task.artifacts).toBeDefined();
    expect(result?.task.artifacts?.length).toBe(2);
    expect(result?.task.artifacts?.[0].name).toBe("result1.txt");
    expect(result?.task.artifacts?.[1].name).toBe("result2.txt");
  });

  it("should save and retrieve task history", async () => {
    const taskId = "history-task";

    const task: Task = {
      id: taskId,
      kind: "task",
      status: {
        state: "completed" as TaskState,
        timestamp: new Date().toISOString(),
      },
    };

    const history: Message[] = [
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

    // Save the task with history
    await fileStore.save({ task, history });

    // Retrieve the task and history
    const result = await fileStore.load(taskId);

    expect(result).toBeDefined();
    expect(result?.history).toBeDefined();
    expect(result?.history.length).toBe(2);
    expect(result?.history[0].role).toBe("user");
    expect(result?.history[1].role).toBe("agent");
  });
});
