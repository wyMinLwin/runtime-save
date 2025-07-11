import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import terser from "@rollup/plugin-terser";
import nodePolyfills from "rollup-plugin-polyfill-node";
import builtins from 'rollup-plugin-node-builtins';

import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { dependencies } = require("./package.json");

export default [
    // JS build
    {
        input: "src/index.ts",
        output: [
            { file: "dist/index.esm.js", format: "esm", sourcemap: true },
            { file: "dist/index.cjs.js", format: "cjs", sourcemap: true },
        ],
        plugins: [resolve(), commonjs(), typescript({ tsconfig: "./tsconfig.json" }), terser(), nodePolyfills(), builtins()],
        external: [...Object.keys(dependencies || {})],
    },

    {
        input: "src/index.ts",
        output: {
            file: "dist/index.umd.js",
            format: "umd",
            name: "runtimeSave",
            sourcemap: true,
            globals: {
                "fs/promises": "fs", // this won't work at runtime but silences the warning
            },
        },
        plugins: [resolve({ browser: true }), commonjs(), typescript(), terser(), nodePolyfills(), builtins()],
        // external: ["fs/promises"],
    },

    // Type declarations
    {
        input: "dist/types/index.d.ts",
        output: [{ file: "dist/index.d.ts", format: "es" }],
        plugins: [dts()],
    },
];
