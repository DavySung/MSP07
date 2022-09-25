const productController = require('../controllers/productController.js')
const express = require('express')
const router = express.Router()

router.get('/get', productController.getMembers)
router.get('/get/:id', productController.getMember)
router.post('/create', productController.createMember)
router.post('/update', productController.updateMember)
router.post('/delete', productController.deleteMember)

module.exports = router
