export interface CreateTransactionDTO {
    customerNumber: string,
    productCode: string;
    transactionDate: Date;
    productPriceID: Number;
    orderID: Number;
}
