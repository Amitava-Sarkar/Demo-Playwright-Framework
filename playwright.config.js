import { defineConfig, devices } from '@playwright/test';
import 'dotenv/config';

export default defineConfig({
  timeout: 90000,
  testDir: './src/tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : 4,
  reporter: [
    ['list'],

    ['html']
  ],
  use: {
    baseURL: process.env.BASE_URL,
    testIdAttribute: 'data-cy',
    headless: true,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'setup',
      testMatch: /auth\.setup\.js/,
    },
    {
      name: 'api',
      testMatch: '**/apiTests/**/*.spec.js',
      use: {
        baseURL: process.env.BASE_URL,
      },
    },
    {
      name: 'authenticated',
      use: {
        storageState: 'src/auth/user.json',
      },
      dependencies: ['setup'],
      testIgnore: ['**/Login.spec.js', '**/Signup.spec.js', '**/accessibilityTestScripts.spec.js', '**/apiTests/**/*.spec.js'],
    },
    {
      name: 'signin',
      use: {
        storageState: { cookies: [], origins: [] },
      },
      testMatch: ['**/Login.spec.js', '**/Signup.spec.js'],
    },

    {
      name: 'accessibility',
      use: {
        storageState: 'src/auth/user.json',
      },
      testMatch: ['**/accessibilityTestScripts.spec.js'],
      dependencies: ['setup'],
    },

  ],

});


