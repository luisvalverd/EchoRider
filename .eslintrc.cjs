module.exports = {
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  root: true,
  globals: {
    __dirname: true,
    module: true,
  },
  ignorePatterns: ["index.ts"],
  rules: {
    "@typescript-eslint/no-non-null-assertion": "off",
  },
};
