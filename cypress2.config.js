const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) { },
    baseUrl: 'https://guest:welcome2qauto@qauto2.forstudy.space/',
    user:{
        email: 'naty.maksymiv+13@gmail.com',
        password: 'Nata2024'
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
