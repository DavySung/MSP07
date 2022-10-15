const authenticate = require("../controllers/authenticateController");
const express = require('express')
const router = express.Router()


router.post('/login', authenticate.login);


module.exports = router