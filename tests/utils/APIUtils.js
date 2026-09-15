class APIUtils {
    constructor(apiContext, loginPayload) {
        this.apiContext = apiContext;
        this.loginPayload = loginPayload;
    }

    async getToken() {

        const loginResponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login', { data: this.loginPayload });
        expect(await loginResponse.ok()).toBeTruthy();
        const loginResponseJSON = await loginResponse.json();
        const loginToken = loginResponseJSON.token;

        console.log(loginToken);
        return loginToken;
    }

    async createOrder(orderPayload) {
        let response = {};
        response.token = await this.getToken();
        const orderResponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/order/create-order', { data: orderPayload, headers: { 'Authorization': response.token, 'Content-type': 'application/json' } })
        const orderResponseJSON = await orderResponse.json();
        orderId = orderResponseJSON.orders[0];
        console.log(`Here is the placed order ID: ${orderId}`)
        response.orderId = orderId;
        return response;

    }
}

module.exports = { APIUtils };