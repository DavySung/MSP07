const productPriceController = require('../controllers/productPriceController.js')
const express = require('express')
const router = express.Router()
const { authJwt } = require("../middleware");

router.get('/get', [authJwt.verifyToken], productPriceController.getProductPrices)
router.post('/create', [authJwt.verifyToken], productPriceController.createProductPrice)
router.post('/update', [authJwt.verifyToken], productPriceController.updateProductPrice)
router.post('/delete', [authJwt.verifyToken], productPriceController.deleteProductPrice)

module.exports = router
