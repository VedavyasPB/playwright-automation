class LoginPage {

    constructor(page) {
        this.page = page;
        this.signInBtn = page.locator("[value='Login']");
        this.userName = page.locator("#userEmail");
        this.password = page.locator("#userPassword");
    }

    async validLogin(username, password) {
        await this.userName.fill(username);
        await this.password.fill(password);
        await this.signInBtn.click();
    }

    async goTo() {
        await this.page.goto("https://rahulshettyacademy.com/client/#/auth/login", {
            waitUntil: "domcontentloaded",
            timeout: 30000
        });
    }
}

module.exports = { LoginPage };