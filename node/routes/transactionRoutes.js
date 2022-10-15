const transactionController = require("../controllers/transactionController");
const express = require('express')
const router = express.Router()
const { authJwt } = require("../middleware");

router.get("/get", [authJwt.verifyToken], transactionController.GetTransactions);
router.post("/delete", [authJwt.verifyToken], transactionController.DeleteTransaction);
router.post("/create", [authJwt.verifyToken], transactionController.CreateTransaction);
router.post("/update", [authJwt.verifyToken], transactionController.UpdateTransaction);

module.exports = router