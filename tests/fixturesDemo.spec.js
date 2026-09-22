const { test, expect, request } = require('@playwright/test');
const { customTest } = require('../tests/utils/fixtures.js');

customTest("Fixtures Demo", async ({ authenticatedPage, createOrder }) => {

    const myOrders = authenticatedPage.locator("button[routerlink*='myorders']");

    await authenticatedPage.goto("https://rahulshettyacademy.com/client");
    await myOrders.click();
    await authenticatedPage.locator("tbody").waitFor();

    await expect(authenticatedPage.getByText(createOrder.orderId)).toBeVisible();
})