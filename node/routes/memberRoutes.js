const memberController = require('../controllers/memberController.js')
const express = require('express')
const router = express.Router()
const { authJwt } = require("../middleware");

router.get('/get', [authJwt.verifyToken], memberController.getMembers)
//router.get('/get/:id', memberController.getMember)
router.post('/create', [authJwt.verifyToken], memberController.createMember)
router.post('/update', [authJwt.verifyToken], memberController.updateMember)
router.post('/delete', [authJwt.verifyToken], memberController.deleteMember)

module.exports = router
