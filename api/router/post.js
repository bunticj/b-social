const express = require('express');
const router = express.Router();
const postController = require('../controller/post');
const authCheck = require('../middlewares/jwt_auth').authCheck;

router.post('/post', authCheck, postController.createPost);
router.get('/post',authCheck, postController.getPosts);
router.get('/post/:postId', authCheck, postController.getSinglePost);
module.exports = router;