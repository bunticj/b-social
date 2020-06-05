const express = require('express');
const router = express.Router();
const userController = require('../controller/user');
const validation = require('../middlewares/validation');
const authCheck = require('../middlewares/jwt_auth').authCheck;

router.post('/register', validation.validateUser(),validation.validate,userController.addUser);
router.post('/login', userController.loginUser);
router.get('/user',authCheck, userController.getUsers);

module.exports = router;