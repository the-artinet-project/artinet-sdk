/**
 * Extracts and aggregates the text, file, and data contents from an array of Part objects.
 *
 * @param parts - An array of Part objects, which may include text, file, or data kinds.
 * @returns An object containing:
 *   - text: Concatenated string of all text parts.
 *   - file: Array of file contents from file parts.
 *   - data: Array of data contents from data parts.
 *
 * @remarks
 * This utility is used to normalize and access the payloads of message parts
 * in a structured way for downstream processing.
 */
export const getParts = (parts) => {
    const textParts = parts.filter((part) => part.kind === "text");
    const fileParts = parts.filter((part) => part.kind === "file");
    const dataParts = parts.filter((part) => part.kind === "data");
    return {
        text: textParts.map((part) => part.text).join(" "),
        file: fileParts.map((part) => part.file),
        data: dataParts.map((part) => part.data),
    };
};
/**
 * Extracts and aggregates the text, file, and data payloads from a Message's parts array.
 *
 * @param message - The Message object containing an array of Part objects (text, file, or data).
 * @returns An object with the following properties:
 *   - text: A single string containing the concatenated text from all text parts.
 *   - file: An array of file payloads from all file parts.
 *   - data: An array of data payloads from all data parts.
 *
 * @remarks
 * This utility function is intended to simplify downstream processing by normalizing
 * the payloads of a Message's parts into a structured object. It is especially useful
 * when handling user input or agent responses that may include multiple content types.
 *
 * @example
 * const payload = getPayload(message);
 * console.log(payload.text); // "Hello world"
 * console.log(payload.file); // [<file1>, <file2>]
 * console.log(payload.data); // [<data1>, <data2>]
 */
export const getPayload = (message) => {
    return getParts(message.parts);
};
//# sourceMappingURL=part.js.map