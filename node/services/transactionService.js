const db = require('../models')
// const Transaction = require("../models/transaction");
const Transaction = db.Transaction;
const Op = require('sequelize').Op

exports.GetTransactionsAsync = async (req, res) => {
    return await Transaction.findAll();
}

exports.CreateTransactionAsync = async (req, res) => {
    if (!req) {
        return false;
    } else {
        try {
            await Transaction.create({
                customerNumber: req.body.customerNumber,
                productCode: req.body.productCode,
                transactionDate: req.body.transactionDate,
                productPriceID: req.body.productPriceID,
                orderID: req.body.orderID
            })
            return true;
        }
        catch (error) {
            console.log(`Error: ${error}`);
            return false;
        }
    }
}

exports.UpdateTransactionAsync = async (req, res) => {
    if (!req) {
        return false;
    } else {
        try {
            await Transaction.update({
                customerNumber: req.body.customerNumber,
                productCode: req.body.productCode,
                transactionDate: req.body.transactionDate,
                productPriceID: req.body.productPriceID,
                orderID: req.body.orderID
            }, {
                where: {
                    id: req.body.id
                }
            })
            return true;
        }
        catch (error) {
            console.log(`Error: ${error}`);
            return false;
        }
    }
}

exports.DeleteTransactionAsync = async (req, res) => {
    if (!req) {
        return false;
    } else {
        await Transactions.destroy({
            where: {
                id: req.id
            }
        }).then(async (result) => {
            console.log(result);
            return true;
        })
    }
}
