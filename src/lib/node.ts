import path from "path";

export async function nodeSave(
    filename: string,
    content: Blob | string | Buffer,
    savePath?: string
) {
    const fs = await import("fs/promises")
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
