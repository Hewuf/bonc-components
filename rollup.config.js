import vuePlugin from "rollup-plugin-vue";
import resolve from '@rollup/plugin-node-resolve';
import alias from "@rollup/plugin-alias";
import commonjs from "@rollup/plugin-commonjs";
import postcss from 'rollup-plugin-postcss';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
  input: "src/index.js",
  output: [
    {
      file: "dist/index.esm.js",
      format: "es",
    },
    {
      file: "dist/index.umd.js",
      format: "umd",
      name: "bonc-components",
    },
  ],
  plugins: [
    vuePlugin({ version: 2 }),
    resolve(),
    commonjs(),
    postcss(),
    alias({
      entries: [
        { find: "@", replacement: path.resolve(__dirname, "src") },
      ]
    })],
};