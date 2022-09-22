const memberController = require('../controllers/memberController.js')
const express = require('express')
const router = express.Router()

router.get('/get', memberController.getMembers)

module.exports = router
