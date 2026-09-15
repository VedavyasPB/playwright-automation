const { test, expect } = require('@playwright/test');

test('Place Order', async ({ page }) => {

    const productName = "ZARA COAT 3";
    const email = "pbvedavyas29@gmail.com";


    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    const userName = page.getByPlaceholder("email@example.com");
    const password = page.getByPlaceholder("enter your password");
    const signInBtn = page.getByRole("button", "{name='Login'}");
    const titles = page.locator('.card-body b');
    const products = page.locator('.card-body');
    const cartButton = page.getByRole("button", { name: "Cart" });
    const checkOut = await page.getByRole("button", { name: "Checkout" }); // page.locator("text:Checkout");
    const selectCountry = page.getByPlaceholder("Select Country");
    const selectCountrySearchResults = page.locator(".ta-results");
    const mail = page.locator(".details__user [type='text']").first();
    const placeOrder = page.getByText("Place Order");
    const orderSuccessMessage = page.locator(".hero-primary");
    const myOrders = page.locator("button[routerlink*='myorders']");
    const rows = page.locator("tbody tr");





    await userName.fill(email);
    await password.fill('Rahul@123');
    await signInBtn.click();

    // await page.waitForLoadState('networkidle'); // Not working for a few people and is also discouraged to use this in playwrght website
    await titles.first().waitFor();
    const titleNames = await titles.allTextContents();
    console.log(titleNames);

    const count = await products.count();

    await products.filter({ hasText: `${productName}` }).getByRole("button", { name: "Add to Cart" }).click();

    await page.getByRole("listitem").cartButton.click();
    await page.locator("div li").first().waitFor();
    await expect(page.getByText("ZARA COAT 3")).toBeVisible();
    await checkOut.click();

    await selectCountry.pressSequentially("ind", { delay: 150 });
    await selectCountrySearchResults.waitFor();

    await page.getByRole("button", { name: "India" }).nth(1).click();

    await expect(mail).toHaveText(email);
    await placeOrder.click();
    await expect(page.getByText(" Thankyou for the order. ")).toBeVisible();

    // const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    // console.log(orderId);
    // await myOrders.click();
    // await page.locator("tbody").waitFor();
    // for (let i = 0; i < await rows.count(); i++) {
    //     const rowOrderId = await rows.nth(i).locator("th").textContent();
    //     if (orderId.includes(rowOrderId)) {
    //         await rows.nth(i).locator("button").first().click();
    //         break;
    //     }
    // }

    // const orderIdDetails = await page.locator(".col-text").textContent();
    // awaitexpect(orderId.includes(orderIdDetails)).toBeTruthy();
    // await page.pause();
}

)

test('UI Controls Test', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const userName = page.locator("#username");
    const password = page.locator("[type='password']");
    const signInBtn = page.locator("#signInBtn");
    const dropdown = page.locator('select.form-control');
    const radioBtn = page.locator('.radiotextsty');
    const okayBtn = page.locator('#okatBtn');
    const terms = page.locator('#terms');
    const documentLink = page.locator('[href*="documents-request"]');



    await userName.fill('rahulshettyacademy');
    await password.fill('Learning@830$3mK2');
    await dropdown.selectOption('consult');
    await radioBtn.last().click();
    await okayBtn.click();

    console.log(await radioBtn.last().isChecked());
    await expect(radioBtn.last()).toBeChecked();
    await terms.click();
    await expect(terms).toBeChecked();
    await terms.click();
    expect(await terms.isChecked()).toBeFalsy();

    await expect(documentLink).toHaveAttribute("class", "blinkingText");


    await page.pause();
})

test('Child window handling', async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator("#username");

    const documentLink = page.locator('[href*="documents-request"]');

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

    const [newPage] = await Promise.all([context.waitForEvent('page'),
    documentLink.click()]);

    const mailSuggestionText = await newPage.locator('.red').textContent();
    console.log(mailSuggestionText);

    const arrayText = await mailSuggestionText.split("@");
    const domain = arrayText[1].split(" ")[0];
    console.log(domain);

    await userName.fill(domain);
    console.log(`${await userName.inputValue()} is the username`);
    page.pause();

})


