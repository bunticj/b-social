const express = require('express');
const router = express.Router();
const userController = require('../controller/user');

router.post('/register', userController.addUser);

module.exports = router;