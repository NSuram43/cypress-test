import { defineConfig } from "cypress";
import createBundler from "@bahmutov/cypress-esbuild-preprocessor";
import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";
import createEsbuildPlugin from "@badeball/cypress-cucumber-preprocessor/esbuild";

export default defineConfig({
  e2e: {
    baseUrl: "https://www.automationexercise.com",
    specPattern: "cypress/e2e/**/*.feature",
    supportFile: "cypress/support/e2e.ts",
    watchForFileChanges: false,
    chromeWebSecurity: false,
    async setupNodeEvents(on, config) {
      await addCucumberPreprocessorPlugin(on, config);
      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );
      return config;
    },
  },
  downloadsFolder: "cypress/downloads",
  video: true,
  pageLoadTimeout: 60000,
  requestTimeout: 15000,
  defaultCommandTimeout: 10000,
  screenshotOnRunFailure: true,
});
