const express = require('express');
const router = express.Router();
const userController = require('../controller/user');
const validation = require('../middlewares/validation');

router.post('/register', validation.validateUser(),validation.validate,userController.addUser);
router.post('/login', userController.loginUser);
module.exports = router;