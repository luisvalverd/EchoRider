const root_dir = __dirname;

module.exports = {
  roots: [root_dir],
  verbose: true,
  testMatch: ["**/__tests__/**/*.spec.ts"],
  transform: {
    "^.+\\.ts?$": "ts-jest",
  },
};
