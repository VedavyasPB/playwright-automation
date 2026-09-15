const { test, expect } = require('@playwright/test');

test('pop-up validations', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    // await page.goto('https://google.com');
    // await page.goBack();
    // await page.goForward();
    await expect(page.locator('#displayed-text')).toBeVisible();
    await page.locator('#hide-textbox').click();
    await expect(page.locator('#displayed-text')).toBeHidden();

    page.on('dialog', dialog => dialog.accept()); //throughout the script wherever or whenever this event occurs, the dialog gets accepted
    await page.locator('#confirmbtn').click();
    await page.locator('#mousehover').hover();
    const framePage = await page.frameLocator('#courses-iframe');
    await framePage.locator("li href*='lifetime-access']:visible").click(); // Clicks only visible among multiple elements identified
    const textCheck = await framePage.locator('.text h2').textContent();
    console.log(textCheck.split(" ")[1]);

})