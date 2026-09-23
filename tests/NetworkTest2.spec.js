const { test, expect, request } = require('@playwright/test');


test('Security Test Network Intercept', async ({ page }) => {

    const productName = "ZARA COAT 3";
    const email = "pbvedavyas29@gmail.com";


    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');

    const userName = page.locator("#userEmail");
    const password = page.locator("#userPassword");
    const signInBtn = page.locator("[value='Login']");
    const titles = page.locator('.card-body b');
    const products = page.locator('.card-body');
    const cartButton = page.locator("[routerlink*='cart']");
    const checkOut = await page.locator("li[class='totalRow'] button[type='button']"); // page.locator("text:Checkout");
    const selectCountry = page.locator("[placeholder*='Country']");
    const selectCountrySearchResults = page.locator(".ta-results");
    const mail = page.locator(".details__user [type='text']").first();
    const placeOrder = page.locator(".action__submit");
    const orderSuccessMessage = page.locator(".hero-primary");
    const myOrders = page.locator("button[routerlink*='myorders']");
    const rows = page.locator("tbody tr");





    await userName.fill(email);
    await password.fill('Rahul@123');
    await signInBtn.click();
    await myOrders.click();
    page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*", route => {
        route.continue({ url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=262564531345' })
    });
    await page.locator("button:has-text('View')").first().click();
    await expect(page.locator("p").last()).toHaveText("You are not authorize to view this order")
    await page.pause();

})