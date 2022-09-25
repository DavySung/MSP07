const memberController = require('../controllers/memberController.js')
const express = require('express')
const router = express.Router()

router.get('/get', memberController.getMembers)
//router.get('/get/:id', memberController.getMember)
router.post('/create', memberController.createMember)
router.post('/update', memberController.updateMember)
router.post('/delete', memberController.deleteMember)

module.exports = router
