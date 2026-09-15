const { test, expect } = require('@playwright/test');

test('Browser Context Playwright Test', async ({ browser }) => {



    const context = await browser.newContext();
    const page = await context.newPage();

    const userName = page.locator("#username");
    const password = page.locator("[type='password']");
    const signInBtn = page.locator("#signInBtn");
    const cardTitles = page.locator('.card-body a');

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    await page.locator("#username").fill('rahulshettyacademy');
    await page.locator("[type='password']").fill('Learning');
    await page.locator("#signInBtn").click();
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText('Incorrfffect');

    await userName.fill("");
    await userName.fill("rahulshettyacademy");
    await password.fill("");
    await password.fill("Learning@830$3mK2");
    await signInBtn.click();

    //commenting below two lines will fail the test in further steps,, cuz further step won't waiit for element as it returns array
    console.log(await page.locator('.card a').nth(1).textContent());
    console.log(await page.locator('.card a').first(1).textContent());

    const allTitles = await cardTitles.allTextContents();
    console.log(allTitles);
}

)


// test.only runs only that inside a file of multple tests
test('Page Playwright Test', async ({ page }) => {
    await page.goto('https://www.google.com/maps');
    console.log(await page.title());
    await expect(page).toHaveTitle('Google Maps')


}
)

// multiple tests exist in the same file so they get executed sequentially, if each has separate file they run parallely