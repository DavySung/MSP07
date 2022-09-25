const productPriceController = require('../controllers/productPriceController.js')
const express = require('express')
const router = express.Router()

router.get('/get', productPriceController.getMembers)
router.post('/create', productPriceController.createMember)
router.post('/update', productPriceController.updateMember)
router.post('/delete', productPriceController.deleteMember)

module.exports = router
