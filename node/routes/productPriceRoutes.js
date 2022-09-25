const productPriceController = require('../controllers/productPriceController.js')
const express = require('express')
const router = express.Router()

router.get('/get', productPriceController.getProductPrices)
router.post('/create', productPriceController.createProductPrice)
router.post('/update', productPriceController.updateProductPrice)
router.post('/delete', productPriceController.deleteProductPrice)

module.exports = router
