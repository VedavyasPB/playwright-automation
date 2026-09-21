const { test, expect, request } = require('@playwright/test');
const { customTest } = require('../tests/utils/fixtures.js');

customTest("Fixtures Demo", async ({ authenticatedPage }) => {
    authenticatedPage.goto("https://rahulshettyacademy.com/client");
})