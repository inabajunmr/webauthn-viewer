import js from "@eslint/js";
import vue from "eslint-plugin-vue";
import globals from "globals";

export default [
  js.configs.recommended,
  ...vue.configs["flat/essential"],
  {
    files: ["src/**/*.{js,vue}"],
    languageOptions: { globals: globals.browser },
    rules: {
      "vue/multi-word-component-names": "off",
      "vue/no-reserved-component-names": "off",
    },
  },
];
