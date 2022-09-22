const memberController = require('../controllers/memberController.js')
const express = require('express')
const router = express.Router()

router.get('/get', memberController.getMembers)
router.get('/get/:customerNumber', memberController.getMember)

module.exports = router
