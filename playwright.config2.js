// @ts-check
import { defineConfig, devices } from '@playwright/test';
import { permission } from 'node:process';
// import { use } from 'react';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({
  testDir: './tests',
  retries: 2,
  workers: 3,
  timeout: 40000,
  expect: {
    timeout: 5000,
  },
  reporter: 'html',
  projects: [
    {
      name: "safari",
      use: {
        browserName: 'webkit',
        headless: false,
        actionTimeout: 10000,
        navigationTimeout: 30000,
        screenshots: 'off',
        trace: 'on',
        ...devices['iPhone 11'],
      }
    },
    {
      name: "Chrome",
      use: {
        browserName: 'chromium',
        headless: false,
        ignoreHttpsErrors: true,
        permissions: ['geolocation'],
        actionTimeout: 10000,
        navigationTimeout: 30000,
        screenshots: 'on',
        trace: 'on',
        viewport: { width: 720, height: 720 },
        video: 'retain-on-failure'

      }
    }
  ]


});

// module.exports = config
export default config;

