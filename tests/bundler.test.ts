import { bundle } from "../src/index.js";
import { configureLogger } from "../src/index.js";

configureLogger({ level: "debug" });

describe("bundle", () => {
  it("should be defined", () => {
    expect(bundle).toBeDefined();
  });

  it("should bundle a file", async () => {
    const filePath = new URL("../examples/code-deployment.js", import.meta.url);
    const result = await bundle(filePath);
    expect(result).toBeDefined();

    console.log("result: ", result);
  });
});
