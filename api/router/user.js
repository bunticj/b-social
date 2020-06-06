const express = require('express');
const router = express.Router();
const userController = require('../controller/user');
const messageController = require('../controller/user_messages');
const validation = require('../middlewares/validation');
const authCheck = require('../middlewares/jwt_auth').authCheck;

router.post('/register', validation.validateUser(),validation.validate,userController.addUser);
router.post('/login', userController.loginUser);
router.get('/user',authCheck, userController.getUsers);
router.post('/user/:userId/message', messageController.createMessage);
router.get('/user/:userId/message', authCheck, messageController.readMessages);

module.exports = router;