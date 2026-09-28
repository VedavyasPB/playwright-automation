const base = require('@playwright/test');


exports.customTest = base.test.extend({
    testDataForOrder: {
        "username": "pbvedavyas29@gmail.com",
        "password": "Rahul@123",
        "productName": "ZARA COAT 3"
    }
})