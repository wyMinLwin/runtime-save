# runtime-save

A lightweight JavaScript library that provides a unified file-saving interface across different
JavaScript environments (browser and Node.js).

[![npm version](https://img.shields.io/npm/v/runtime-save.svg)](https://www.npmjs.com/package/runtime-save)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

## Features

- **Environment Detection**: Automatically detects whether your code is running in a browser or
  Node.js
- **Browser Support**:
    - Uses the modern File System Access API when available
    - Falls back to the download attribute method for broader compatibility
- **Node.js Support**: Saves files to the file system using the native fs module
- **Flexible Content Types**: Accepts Blob, string, or Buffer input types
- **TypeScript Support**: Fully typed API with TypeScript declarations included

## Installation

```bash
# npm
npm install runtime-save

# pnpm
pnpm add runtime-save
```

## Usage

### Basic Example

```javascript
import { saveFile } from "runtime-save";

// Save a string to a file
await saveFile("hello.txt", "Hello, World!");

// Save a Blob to a file (works in both browser and Node.js)
const blob = new Blob(["CSV data"], { type: "text/csv" });
await saveFile("data.csv", blob);

// In Node.js, you can also save a Buffer
const buffer = Buffer.from("Buffer content");
await saveFile("file.bin", buffer);

// Specify a save path (only works in Node.js)
await saveFile("report.pdf", pdfContent, "/path/to/save/directory/");
```

### Browser Environment

In a browser, `runtime-save` will:

1. Try to use the File System Access API first (modern browsers)
2. Fall back to using an anchor tag with the `download` attribute

### Node.js Environment

In Node.js, `runtime-save` will:

1. Convert the content to a Buffer if it isn't already
2. Save to the specified path or to the current working directory if no path is provided

## API

### saveFile(filename, content, savePath?)

Saves content to a file, with environment-appropriate behavior.

#### Parameters

- `filename` (string): The name of the file to be saved
- `content` (Blob | string | Buffer): The content to save
- `savePath` (string, optional): The directory where the file should be saved (Node.js only)

#### Returns

- `Promise<void>`: Resolves when the file has been saved

## Browser Compatibility

- **Modern Browsers** (Chrome 86+, Edge 86+): Full support with File System Access API
- **All Modern Browsers**: Fallback support using download attribute

## Contributing

Please see [CONTRIBUTING.md](CONTRIBUTING.md) for details on how to contribute to this project.

## Code of Conduct

This project adheres to a [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected
to uphold this code.

## License

This project is licensed under the [MIT License](LICENSE).
