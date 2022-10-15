const productController = require('../controllers/productController.js')
const express = require('express')
const router = express.Router()
const { authJwt } = require("../middleware");

router.get('/get', [authJwt.verifyToken], productController.getProducts)
router.post('/create', [authJwt.verifyToken], productController.createProduct)
router.post('/update', [authJwt.verifyToken], productController.updateProduct)
router.post('/delete', [authJwt.verifyToken], productController.deleteProduct)

module.exports = router
