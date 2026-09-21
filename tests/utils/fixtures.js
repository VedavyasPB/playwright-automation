const base = require('@playwright/test');
const { use } = require('react');

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
        createOrder: async ({},use) => {

        }
    }

);