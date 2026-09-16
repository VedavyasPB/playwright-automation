const { test, expect } = require('@playwright/test');
let titles;
let webContext;
const email = "pbvedavyas29@gmail.com";
test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    // Locators    
    const userName = page.locator("#userEmail");
    const password = page.locator("#userPassword");
    const signInBtn = page.locator("[value='Login']");
    titles = page.locator('.card-body b');

    // Test
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    await userName.fill(email);
    await password.fill('Rahul@123');
    await signInBtn.click();

    // await page.waitForLoadState('networkidle'); // Not working for a few people and is also discouraged to use this in playwrght website
    await titles.first().waitFor();
    await context.storageState({ path: 'state.json' });
    webContext = await browser.newContext({ storageState: 'state.json' });

})

test('Place Order', async () => {

    const productName = "ZARA COAT 3";

    const page = await webContext.newPage();

    //Locators

    const products = page.locator(".card-body");
    const cartButton = page.locator("[routerlink*='cart']");
    const checkOut = page.locator("li[class='totalRow'] button[type='button']"); // page.locator("text:Checkout");
    const selectCountry = page.locator("[placeholder*='Country']");
    const selectCountrySearchResults = page.locator(".ta-results");
    const mail = page.locator(".details__user [type='text']").first();
    const placeOrder = page.locator(".action__submit");
    const orderSuccessMessage = page.locator(".hero-primary");
    const myOrders = page.locator("button[routerlink*='myorders']");
    const rows = page.locator("tbody tr");

    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');




    // await userName.fill(email);
    // await password.fill('Rahul@123');
    // await signInBtn.click();

    // await page.waitForLoadState('networkidle'); // Not working for a few people and is also discouraged to use this in playwrght website
    // await titles.first().waitFor();


    const titleNames = await titles.allTextContents();
    console.log(titleNames);

    const count = await products.count();

    for (let i = 0; i < count; ++i) {
        if (await products.nth(i).locator("b").textContent() === productName) {
            await products.nth(i).locator("text= Add To Cart").click();
            break;
        }
    }
    await cartButton.click();
    await page.locator("div li").first().waitFor();

    const bool = await page.locator("h5:has-text('Zara Coat 3')").isVisible();
    expect(bool).toBeTruthy();
    await checkOut.click();

    await selectCountry.pressSequentially("ind", { delay: 150 });
    await selectCountrySearchResults.waitFor();

    const resultCount = await selectCountrySearchResults.locator("button").count();
    for (let i = 0; i < resultCount; ++i) {
        let text = await selectCountrySearchResults.locator("button").nth(i).textContent();
        if (text.trim() === "India") {
            await selectCountrySearchResults.locator("button").nth(i).click();
            break;
        }
    }

    await expect(mail).toHaveText(email);
    await placeOrder.click();
    await expect(orderSuccessMessage).toHaveText(" Thankyou for the order. ");
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderId);
    await myOrders.click();
    await page.locator("tbody").waitFor();
    for (let i = 0; i < await rows.count(); i++) {
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        if (orderId.includes(rowOrderId)) {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }

    const orderIdDetails = await page.locator(".col-text").textContent();
    awaitexpect(orderId.includes(orderIdDetails)).toBeTruthy();
    await page.pause();
}

)

