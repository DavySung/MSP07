const transactionController = require("../controllers/transactionController");
const express = require('express')
const router = express.Router()

router.get("/get", transactionController.GetTransactions);
router.post("/delete", transactionController.DeleteTransaction);
router.post("/create", transactionController.CreateTransaction);
router.post("/update", transactionController.UpdateTransaction);

module.exports = router