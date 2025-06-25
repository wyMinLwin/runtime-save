export type ExtendedWindow = Window & {
    showSaveFilePicker: (options?: {
        suggestedName?: string;
        types?: Array<{
            description?: string;
            accept?: Record<string, string[]>;
        }>;
    }) => Promise<FileSystemFileHandle>;
};
