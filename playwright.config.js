// @ts-check
import { defineConfig, devices } from '@playwright/test';
// import { use } from 'react';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({
  testDir: './tests',
  timeout: 40000,
  expect: {
    timeout: 5000,
  },
  reporter: 'html',
  use: {
    browserName: 'chromium',
    headless: false,
    actionTimeout: 10000,
    navigationTimeout: 30000,
    screenshots: 'on',
    trace: 'on',
    video: 'retain-on-failure'
  }

});

module.exports = config

