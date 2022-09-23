const transactionService = require("../services/transactionService");

beforeAll(async () => {

});

afterAll(async () => {

});

test('create-transaction', async () => {
    let req = { customerNumber: 1, productCode: 1, transactionDate: Date.now(), productPriceID: 1, orderID: 1 }
    let result = await transactionService.CreateTransactionAsync(req)
    expect(result).toBe(true);
}, 20000)

test('update-transaction', async () => {
    let req = { id: 1, customerNumber: 1, productCode: 1, transactionDate: Date.now(), productPriceID: 1, orderID: 1 }
    let result = await transactionService.UpdateTransactionAsync(req)
    expect(result).toBe(true);
}, 20000)

test('get-transactions', async () => {
    expect(await transactionService.GetTransactionsAsync()).toBe(true);
}, 20000)

