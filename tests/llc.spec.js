const { test, expect } = require('@playwright/test');

test('Playwright Special Locators', async ({ page }) => {
    test.setTimeout(60000);
    const slowExpect = expect.configure({ timeout: 9000 })
    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel("Check me out if you Love IceCreams!").click();
    await page.getByLabel("Employed").check();
    await page.getByLabel("Gender").selectOption("Female");
    // npx playwright test --ui
    await page.getByPlaceholder("Password").fill("abc123");
    await page.getByRole("button", { name: 'Submit' }).click();

    // asper config file this waits 5 secs at most for the locator
    await page.getByText(" The Form has been submitted successfully!.").isVisible();

    await expect(page.getByText(" The Form has been submitted successfully!.")).toBeVisible({ timeout: 10_000 });


    // action timeout below
    await page.getByRole("link", { name: 'Shop' }).click({ timeout: 10_000 });

    await slowExpect(page.locator(".my-4").first()).toHaveText("Shop");
    await page.locator("app-card").filter({ hasText: 'Nokia Edge' }).getByRole("button").click();

});