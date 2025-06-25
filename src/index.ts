import { ExtendedWindow } from "./types";

export async function saveFile(
    filename: string,
    content: Blob | string | Buffer,
    savePath?: string
) {
    if (typeof window !== "undefined" && typeof window.document !== "undefined") {
        // Running in the browser
        // Normalize to Blob
        const blob =
            content instanceof Blob
                ? content
                : typeof content === "string" || Buffer.isBuffer(content)
                  ? new Blob([content])
                  : (() => {
                        throw new Error("Unsupported content type in browser");
                    })();

        // Prefer File System Access API if supported
        if (window) {
            // Extract base MIME type
            const baseMimeType = (blob.type || "application/octet-stream").split(";")[0];

            const handle = await (window as unknown as ExtendedWindow).showSaveFilePicker({
                suggestedName: filename,
                types: [
                    {
                        description: "File",
                        accept: {
                            [baseMimeType]: [`.${filename.split(".").pop()}`],
                        },
                    },
                ],
            });
            const writable = await handle.createWritable();
            await writable.write(blob);
            await writable.close();
        } else {
            // Fallback to <a download> for browsers without File System Access API
            const a = document.createElement("a");
            a.href = URL.createObjectURL(blob);
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    } else {
        // Running in Node.js

        const fs = await import("fs/promises");
        const path = await import("path");

        const buffer =
            content instanceof Blob
                ? Buffer.from(await content.arrayBuffer())
                : typeof content === "string"
                  ? Buffer.from(content, "utf-8")
                  : Buffer.isBuffer(content)
                    ? content
                    : (() => {
                          throw new Error("Unsupported content type");
                      })();

        // Use provided savePath or default to current working directory
        const fullPath = savePath
            ? path.resolve(savePath, filename)
            : path.resolve(process.cwd(), filename);

        await fs.writeFile(fullPath, buffer);
    }
}
