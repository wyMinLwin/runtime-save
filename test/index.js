import { saveFile } from "../dist/index.esm.js";
import process from "process";

const generateCsvBlob = () => {
    const headers = ["Name", "Age", "Job"];
    const rows = [
        ["Alice", 30, "Engineer"],
        ["Bob", 25, "Designer"],
        ["Charlie", 28, "Writer"],
    ];

    const csvContent = headers.join(",") + "\n" + rows.map((row) => row.join(",")).join("\n");

    return new Blob([csvContent], { type: "text/csv;charset=utf-8" });
};

const runTest = async () => {
    try {
        await saveFile("test.csv", generateCsvBlob(), process.cwd() + "/test/output/");
        console.log("File saved successfully.");
    } catch (error) {
        console.error("Error saving file:", error);
    }
};

await runTest();
