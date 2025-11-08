import { getParts } from "./part.js";
/**
 * Extracts the content of an agent response.
 * @param input - The input event.
 * @returns The content of the input event.
 */
export function getContent(input) {
    const parts = getParts(input?.parts ??
        input?.status?.message?.parts ??
        input?.status?.message?.parts ??
        input?.artifact?.parts ??
        []);
    return (parts.text ??
        parts.file.map((file) => file.bytes).join("\n") ??
        parts.file.map((file) => file.uri).join("\n") ??
        parts.data.map((data) => JSON.stringify(data)).join("\n") ??
        undefined);
}
