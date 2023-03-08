const root_dir = __dirname + "./src";

module.exports = {
  roots: [root_dir],
  verbose: true,
  testMatch: ["**/tests/**/*.spec.ts"],
  transform: {
    "^.+\\.ts?$": "ts-jest",
  },
};
