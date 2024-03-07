/*
 * @Author: 贺颖
 * @Date: 2024-03-07 10:02:16
 * @LastEditTime: 2024-03-07 14:03:43
 * @LastEditors: 贺颖
 * @Description: 
 */
import vue from "rollup-plugin-vue";
import commonjs from "@rollup/plugin-commonjs";
import postcss from 'rollup-plugin-postcss';

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
  plugins: [vue(), commonjs(), postcss()],
};