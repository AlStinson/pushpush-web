import globals from "globals";
import pluginJs from "@eslint/js";
import pluginTs from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import pluginTailwindcss from "eslint-plugin-tailwindcss";
import pluginSimpleImportSort from "eslint-plugin-simple-import-sort";

const generalConfig = [
  { files: ["**/*.{js,mjs,cjs,jsx,ts,tsx}"] },
  { languageOptions: { globals: globals.browser } },
  { ignores: ["build/", "*.config.*js"] },
  { settings: { react: { version: "detect" } } },
];

const pluginJsConfig = [
  {
    rules: {
      ...pluginJs.configs.recommended.rules,
      "no-template-curly-in-string": "error",
      "no-unreachable": "warn",
      "no-use-before-define": "error",
      "no-useless-assignment": "warn",
      "block-scoped-var": "error",
      complexity: ["warn", 20],
      eqeqeq: "warn",
      "func-style": ["warn", "expression"],
      "max-depth": ["warn", { max: 4 }],
      "max-lines": ["warn", { max: 300 }],
      "max-lines-per-function": ["warn", { max: 50, skipBlankLines: true }],
      "max-nested-callbacks": ["warn", { max: 5 }],
      "max-params": ["warn", { max: 3 }],
      "max-statements": ["warn", { max: 10 }],
      "no-alert": "warn",
      "no-console": "warn",
      "no-magic-numbers": ["warn", { ignore: [0, 1] }],
      "no-unneeded-ternary": "warn",
      "no-unused-expressions": "warn",
      "no-useless-catch": "warn",
      "no-useless-concat": "warn",
      "no-useless-return": "warn",
      "prefer-arrow-callback": "warn",
      "prefer-const": "warn",
      "prefer-template": "warn",
    },
  },
];

const pluginTsConfig = [
  ...pluginTs.configs.recommended,
  {
    languageOptions: {
      parserOptions: {
        // I want to use latest typescript version
        warnOnUnsupportedTypeScriptVersion: false,
      },
    },
  },
];

const pluginReactConfig = [
  {
    ...pluginReact.configs.flat.recommended,
    rules: {
      ...pluginReact.configs.flat.recommended.rules,
      "react/forbid-prop-types": ["warn", { forbid: ["any", "object"] }],
      "react/jsx-filename-extension": [
        "error",
        { extensions: [".jsx", ".tsx"] },
      ],
      "react/jsx-no-useless-fragment": "warn",
      "react/jsx-pascal-case": "warn",
      "react/no-array-index-key": "error",
      "react/no-danger": "error",
      "react/prefer-exact-props": "warn",
      "react/prefer-stateless-function": "error",
      "react/sort-prop-types": "warn",
      "react/jsx-uses-react": "off",
      "react/react-in-jsx-scope": "off",
    },
  },
];

const pluginReactHooksConfig = [
  {
    plugins: { "react-hooks": pluginReactHooks },
    rules: {
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
    },
  },
];

const pluginTailwindcssConfig = [
  ...pluginTailwindcss.configs["flat/recommended"],
];

const pluginSimpleImportSortConfig = [
  {
    plugins: {
      "simple-import-sort": pluginSimpleImportSort,
    },
    rules: {
      "simple-import-sort/imports": "warn",
      "simple-import-sort/exports": "warn",
    },
  },
];

export default [
  ...generalConfig,
  ...pluginJsConfig,
  ...pluginTsConfig,
  ...pluginReactConfig,
  ...pluginReactHooksConfig,
  ...pluginTailwindcssConfig,
  ...pluginSimpleImportSortConfig,
];
