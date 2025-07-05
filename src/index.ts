import { browserSave } from "./lib/browser";
import { nodeSave } from "./lib/node";

export async function saveFile(
    filename: string,
    content: Blob | string | Buffer,
    savePath?: string
) {
    if (typeof window !== "undefined" && typeof window.document !== "undefined") {
        // Running in the browser
        await browserSave(filename, content);
    } else {
        // Running in Node.js
        await nodeSave(filename, content, savePath);
    }
}
