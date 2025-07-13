import { ExtendedWindow } from "../types";

async function fallbackSave(filename: string, blob: Blob) {
    // Fallback to <a download> for browsers without File System Access API
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

export async function browserSave(filename: string, content: Blob | string | Buffer) {
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
    if (typeof (window as unknown as ExtendedWindow)?.showSaveFilePicker == "function") {
        try {
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
        } catch {
            fallbackSave(filename, blob);
        }
    } else {
        fallbackSave(filename, blob);
    }
}
