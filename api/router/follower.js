const express = require('express');
const router = express.Router();
const followController = require('../controller/follower');
const authCheck = require('../middlewares/jwt_auth').authCheck;

router.post('/follow', authCheck, followController.followUser);
router.get('/follow', authCheck, followController.getFollowers);
module.exports = router;