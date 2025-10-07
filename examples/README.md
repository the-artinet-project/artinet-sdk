# Artinet SDK Examples

This directory contains examples demonstrating how to use the Artinet SDK to create A2A (Agent-to-Agent) servers and clients.

## Prerequisites

Before running these examples, make sure you have:

1. Node.js (v16 or higher) installed
2. Built the SDK by running `npm run build` in the repository root

## Running the Examples

### Basic Server

Starts a simple A2A server that echoes back requests:

```bash
node examples/basic-server.js
```

This will start a server on port 3000 that responds to client requests.

### Basic Usage Client

Connects to the A2A server and sends a simple request:

```bash
node examples/basic-usage.js
```

### Streaming Updates

Demonstrates how to receive streaming updates from an A2A server:

```bash
node examples/streaming-updates.js
```

### Task Resubscription

Shows how to resubscribe to a task after a client disconnection:

```bash
node examples/task-resubscribe.js
```

Note: This example may return a Bad Request error on the current server implementation.

### File Storage Server

Demonstrates a server that persists tasks and conversation history using file-based storage:

```bash
node examples/file-storage-server.js
```

This creates a `data` directory in your project root to store task data.

You can test this server with:

```bash
node examples/file-storage-client.js
```

And after restarting the server, test persistence with:

```bash
node examples/file-storage-client-continued.js
```

## Known Issues

- The file storage server does not properly maintain conversation history between restarts - it treats each message as if it were the first message in a conversation

## Troubleshooting

- Make sure the server is running before starting client examples
- Check that port 3000 is not in use by another application
- Ensure you've run `npm run build` to compile the SDK before running examples
