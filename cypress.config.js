const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: "mochawesome",
  reporterOptions: {
    reportDir: "cypress/reports",
    overwright: false,
    html: false,
    json: true
  },
  e2e: {
    setupNodeEvents(on, config) { },
    baseUrl: 'https://guest:welcome2qauto@qauto.forstudy.space/',
    user:{
      email: 'naty.maksymiv@gmail.com',
      password: 'N04051985m'
  },
    //retries:{
    //   runMode: 2,
    //   openMode: 3
    //},
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 30000,
    viewportWidth: 1920,
    viewportHeight: 1080,
    video: true,
    chromeWebSecurity: false,
    screenshotOnRunFailure: true
  },
});
