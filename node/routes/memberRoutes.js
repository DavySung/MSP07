const memberController = require('../controllers/memberController.js')
const express = require('express')
const router = express.Router()

router.get('/get', memberController.getMembers)
router.get('/get/:id', memberController.getMember)

module.exports = router
