import { describe, expect, beforeAll, afterAll, test } from "@jest/globals";
import { exec } from "child_process";
import { promisify } from "util";
import * as fs from "fs/promises";
import * as path from "path";
import { fileURLToPath } from "url";
import { tmpdir } from "os";

const execAsync = promisify(exec);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "../../");

describe("NPM Package Installation", () => {
  let tempDir: string;
  let packagePath: string;
  let packageName: string;
  let testProjectDir: string;
  let sdkPath: string;

  beforeAll(async () => {
    // Create temporary directory
    tempDir = await fs.mkdtemp(path.join(tmpdir(), "artinet-sdk-test-"));

    // Build and pack SDK (with fallback for existing dist)
    try {
      await execAsync("npm run build", { cwd: projectRoot });
    } catch (error) {
      console.warn("Build failed, using existing dist files...");
    }

    const { stdout } = await execAsync("npm pack", { cwd: projectRoot });
    packageName = stdout.trim().split("\n").pop()?.trim() || "";
    packagePath = path.join(projectRoot, packageName);

    expect(packageName).toMatch(/^artinet-sdk-\d+\.\d+\.\d+\.tgz$/);

    // Create test project and install package once
    testProjectDir = path.join(tempDir, "test-project");
    await fs.mkdir(testProjectDir, { recursive: true });

    await fs.writeFile(
      path.join(testProjectDir, "package.json"),
      JSON.stringify(
        {
          name: "test-project",
          version: "1.0.0",
          type: "module",
        },
        null,
        2
      )
    );

    // Install the packed SDK
    await execAsync(`npm install ${packagePath}`, { cwd: testProjectDir });

    sdkPath = path.join(testProjectDir, "node_modules", "@artinet", "sdk");
  }, 120000);

  afterAll(async () => {
    // Cleanup
    try {
      await fs.rm(tempDir, { recursive: true, force: true });
      await fs.unlink(packagePath);
    } catch (error) {
      console.warn("Cleanup failed:", error);
    }
  });

  test("should create and install npm package successfully", async () => {
    // Verify installation
    await fs.access(sdkPath);

    // Check package.json
    const installedPackageJson = path.join(sdkPath, "package.json");
    const packageContent = await fs.readFile(installedPackageJson, "utf8");
    const packageData = JSON.parse(packageContent);

    expect(packageData.name).toBe("@artinet/sdk");
    expect(packageData.exports).toBeDefined();
    expect(packageData.exports["."]).toBeDefined();
  });

  test("should have all required export files", async () => {
    // Check export files exist
    const exportFiles = ["dist/index.js", "dist/types/index.d.ts"];

    for (const file of exportFiles) {
      const filePath = path.join(sdkPath, file);
      await fs.access(filePath);

      // Verify file is not empty
      const stats = await fs.stat(filePath);
      expect(stats.size).toBeGreaterThan(0);
    }

    // Verify all required package files exist
    const packageFiles = ["README.md", "LICENSE"];
    for (const file of packageFiles) {
      await fs.access(path.join(sdkPath, file));
    }
  });

  test("should import and use SDK exports successfully", async () => {
    // Create a script that imports and uses the SDK
    const scriptContent = `
try {
  const { createAgent } = await import('@artinet/sdk');
  
  const results = {
    createAgent: typeof createAgent === 'function',
    success: true
  };
  
  console.log(JSON.stringify(results));
  process.exit(0);
} catch (error) {
  console.log(JSON.stringify({ error: error.message, success: false }));
  process.exit(1);
}
`;

    const scriptPath = path.join(testProjectDir, "test-script.mjs");
    await fs.writeFile(scriptPath, scriptContent);

    // Run the script
    const { stdout } = await execAsync("node test-script.mjs", {
      cwd: testProjectDir,
    });

    // Parse the JSON output to avoid string matching issues
    const result = JSON.parse(stdout.trim());
    expect(result.success).toBe(true);
    expect(result.createAgent).toBe(true);
  }, 30000);
});
