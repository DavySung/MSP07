export interface CreateTransactionDTO {
    customerNumber: string,
    productCode: string;
    transactionDate: Date;
    price: Number;
    orderID: Number;
}
