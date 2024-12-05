export default [
  {
    ignores: ["node_modules/**"],
  },
  {
    files: ["**/*.js", "**/*.ts"],
    languageOptions: {
      ecmaVersion: "latest",
    },
    plugins: {
      playwright: require("eslint-plugin-playwright"),
    },
    rules: {
      "playwright/no-focused-tests": "error",
    },
  },
];
