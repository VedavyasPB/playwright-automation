const { test, expect, request } = require('@playwright/test');
const { APIUtils } = require('./utils/APIUtils');

const loginPayload = { userEmail: "pbvedavyas29@gmail.com", userPassword: "Rahul@123" };
const orderPayload = { orders: [{ country: "India", productOrderedId: "6960eac0c941646b7a8b3e68" }] };



let response;
test.beforeAll(async () => {

    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayload);
    response = await apiUtils.createOrder(orderPayload);


})

test.beforeEach(() => {

})

test('Place Order', async ({ page }) => {

    const productName = "ZARA COAT 3";
    const email = "pbvedavyas29@gmail.com";


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



    // INSERTING TOKEN INTO THE SESSION

    page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token);

    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    // await userName.fill(email);
    // await password.fill('Rahul@123');
    // await signInBtn.click();

    // await page.waitForLoadState('networkidle'); // Not working for a few people and is also discouraged to use this in playwrght website


    await myOrders.click();
    await page.locator("tbody").waitFor();
    for (let i = 0; i < await rows.count(); i++) {
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        if (response.orderId.includes(rowOrderId)) {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }

    const orderIdDetails = await page.locator(".col-text").textContent();
    await expect(response.orderId.includes(orderIdDetails)).toBeTruthy();
    await page.pause();
}

)