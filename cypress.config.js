const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl:"http://170.170.170.55/CFC/AdminTool",
   testIsolation:false,
  },
});
