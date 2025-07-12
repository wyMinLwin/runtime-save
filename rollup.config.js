import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import terser from "@rollup/plugin-terser";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { dependencies } = require("./package.json");

export default [
    // JS build
    {
        input: "src/index.ts",
        output: [
            {
                file: "dist/index.esm.js",
                format: "esm",
                sourcemap: true,
                inlineDynamicImports: true,
            },
            {
                file: "dist/index.cjs.js",
                format: "cjs",
                sourcemap: true,
                inlineDynamicImports: true,
            },
        ],
        plugins: [resolve(), commonjs(), typescript({ tsconfig: "./tsconfig.json" }), terser()],
        external: [...Object.keys(dependencies || {}), "fs/promises", "path"],
    },

    {
        input: "src/index.ts",
        output: {
            file: "dist/index.umd.js",
            format: "umd",
            name: "runtimeSave",
            sourcemap: true,
            inlineDynamicImports: true,
        },
        plugins: [resolve({ browser: true }), commonjs(), typescript(), terser()],
        external: [...Object.keys(dependencies || {}), "fs/promises", "path"],
    },

    // Type declarations
    {
        input: "dist/types/index.d.ts",
        output: [{ file: "dist/index.d.ts", format: "es" }],
        plugins: [dts()],
    },
];
