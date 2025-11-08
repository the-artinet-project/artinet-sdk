import { z } from "zod";
import { AgentCardSchema, AgentCard } from "./src/index.ts";
import { zodFunction } from "openai/helpers/zod";
console.log(
  "test",
  zodFunction({
    name: "message/send",
    parameters: AgentCardSchema,
    function: (args: AgentCard) => {
      console.log("args", args);
      return "test";
    },
  })
);
