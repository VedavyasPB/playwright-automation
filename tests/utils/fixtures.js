const { request } = require('@playwright/test');
const base = require('@playwright/test');
const { use } = require('react');
const { APIUtils } = require('./APIUtils.js');

let response;

const loginPayload = { userEmail: "pbvedavyas29@gmail.com", userPassword: "Rahul@123" };
const orderPayload = { orders: [{ country: "India", productOrderedId: "6960eac0c941646b7a8b3e68" }] };
exports.customTest = base.test.extend(

    {
        authenticatedPage: async ({ page }, use) => {
            await page.goto('https://rahulshettyacademy.com/client/#/auth/login');

            const userName = page.locator("#userEmail");
            const password = page.locator("#userPassword");

            await userName.fill(email);
            await password.fill('Rahul@123');
            await signInBtn.click();
            await use(page);
        },
        createOrder: async ({ }, use) => {
            const apiContext = await request.newContext();
            const apiUtils = new APIUtils(apiContext, loginPayload);
            response = await apiUtils.createOrder(orderPayload);
            use(response);
        }
    }

);