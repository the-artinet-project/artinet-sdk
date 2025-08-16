import { router } from "../../transport.js";
import { sendMessageRoute } from "./send.js";
import { streamMessageRoute } from "./stream.js";

export const messageRouter = router({
  send: sendMessageRoute,
  stream: streamMessageRoute,
});
