// @ts-check
const { devices } = require('@playwright/test');

const config = {
  testDir: './tests',
  retries :0,
  
  /* Maximum time one test can run for. */
  timeout: 3000 * 1000,
  expect: {
  
    timeout: 5000
  },
  
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {

    baseURL : 'https://10.17.3.57/',
    ignoreHTTPSErrors: true,
    screenshot: 'only-on-failure',
    browserName : 'chromium',
    headless : false,
    trace : 'on',//off,on
    
    
    
  },


};

module.exports = config;
