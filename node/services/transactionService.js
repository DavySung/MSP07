const db = require('../models')
const Transaction = db.Transaction;
const Product = db.Product;
const ProductPrice = db.ProductPrice;
const Member = db.Member;

const Op = require('sequelize').Op

exports.GetTransactionsAsync = async (req, res) => {
    try {
        return { message: await Transaction.findAll(), result: true };
    }
    catch (error) {
        console.log(`Error: ${error}`);
        return { message: error, result: false };
    }
}

exports.CreateTransactionAsync = async (req, res) => {
    if (!req) {
        return { message: "no body recieved", result: false };
    } else {
        try {
            //checks if they exist in the DB first
            const product = await Product.findOne({ where: { productCode: req.body.productCode } })
            const member = await Member.findOne({ where: { customerNumber: req.body.customerNumber } })

            await Transaction.create({
                customerNumber: member.customerNumber,
                productCode: product.productCode,
                transactionDate: req.body.transactionDate,
                price: req.body.price,
                orderID: req.body.orderID
            })
            return { message: "transaction created", result: true };
        }
        catch (error) {
            console.log(`Error: ${error}`);
            return { message: error.message, result: false };
        }
    }
}

exports.UpdateTransactionAsync = async (req, res) => {
    if (!req) {
        return { message: "no body recieved", result: false };
    } else {
        try {
            //checks if they exist in the DB first
            const product = await Product.findOne({ where: { productCode: req.body.productCode } })
            const member = await Member.findOne({ where: { customerNumber: req.body.customerNumber } })

            await Transaction.update({
                customerNumber: member.customerNumber,
                productCode: product.productCode,
                transactionDate: req.body.transactionDate,
                price: req.body.price,
                orderID: req.body.orderID
            }, {
                where: {
                    id: req.body.id
                }
            })
            return { message: "transaction updated", result: true };
        }
        catch (error) {
            console.log(`Error: ${error}`);
            return { message: error.message, result: false };
        }
    }
}

exports.DeleteTransactionAsync = async (req, res) => {
    if (!req) {
        return { message: "no body recieved", result: false };
    } else {
        try {
            await Transaction.destroy({
                where: {
                    id: req.body.id
                }
            })
            return { message: "transaction deleted", result: true };
        }
        catch (error) {
            console.log(`Error: ${error}`);
            return { message: error.message, result: false };
        }
    }
}
