const productController = require('../controllers/productController.js')
const express = require('express')
const router = express.Router()

router.get('/get', productController.getProducts)
router.post('/create', productController.createProduct)
router.post('/update', productController.updateProduct)
router.post('/delete', productController.deleteProduct)

module.exports = router
