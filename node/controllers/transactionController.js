const transactionService = require("../services/transactionService");

exports.GetTransactions = async (req, res) => {
    try {
        return res.status(200).send(await transactionService.GetTransactionsAsync());
    } catch (error) {
        return res.status(500).send({
            status: false,
            error: error,
        });
    }
}

exports.CreateTransaction = async (req, res) => {
    try {
        return res.status(200).send(await transactionService.CreateTransactionAsync(req));
    } catch (error) {
        return res.status(500).send({
            status: false,
            error: error,
        });
    }
}

exports.UpdateTransaction = async (req, res) => {
    try {
        return res.status(200).send(await transactionService.UpdateTransactionAsync(req));
    } catch (error) {
        return res.status(500).send({
            status: false,
            error: error,
        });
    }
}

exports.DeleteTransaction = async (req, res) => {
    try {
        return res.status(200).send(await transactionService.DeleteTransactionAsync(req));
    } catch (error) {
        return res.status(500).send({
            status: false,
            error: error,
        });
    }
}

