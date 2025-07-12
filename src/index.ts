export async function saveFile(
    filename: string,
    content: Blob | string | Buffer,
    savePath?: string
) {
    if (typeof window !== "undefined" && typeof window.document !== "undefined") {
        // Running in the browser
        const { browserSave } = await import("./lib/browser");
        await browserSave(filename, content);
    } else {
        // Running in Node.js
        const { nodeSave } = await import("./lib/node");
        await nodeSave(filename, content, savePath);
    }
}
