const { test, expect, request } = require('@playwright/test');
const { APIUtils } = require('./utils/APIUtils');

const loginPayload = { userEmail: "pbvedavyas29@gmail.com", userPassword: "Rahul@123" };
const orderPayload = { orders: [{ country: "India", productOrderedId: "6960eac0c941646b7a8b3e68" }] };
const fakePayloadOrders = { data: [], message: "No Orders" };



let response;
test.beforeAll(async () => {

    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayload);
    response = await apiUtils.createOrder(orderPayload);


})

test.beforeEach(() => {

})

test.only('Place Order', async ({ page }) => {

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


    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*", async route => {
        // intercepting the API response -> {playwright fakeresponse } -> browser -> render data in front-end
        const response = await page.request.fetch(route.request());

        let body = JSON.stringify(fakePayloadOrders);

        route.fulfill({
            response,
            body
        });
    })
    const [response] = await Promise.all([
        page.waitForResponse(
            'https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*'
        ),
        myOrders.click()
    ]);
    console.log(page.locator('.mt-4').textContent());
    // await page.locator("tbody").waitFor();
}

)