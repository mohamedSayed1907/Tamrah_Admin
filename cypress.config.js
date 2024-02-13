/* eslint-disable global-require */
// eslint-disable-next-line import/no-extraneous-dependencies
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  numTestsKeptInMemory: 15,
  defaultCommandTimeout: 15000,
  viewportHeight: 768,
  viewportWidth: 1400,
  env: {
    apiUrl: "https://tamrah-testing.us-east-2.elasticbeanstalk.com/api/v2",
  },
  compilerOptions: {
    types: ["cypress", "cypress-file-upload"],
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "https://tamrah-testing.us-east-2.elasticbeanstalk.com",
    experimentalStudio: true,
    testIsolation: true,
  },
});
