const express = require('express');
const router = express.Router();
const commentController = require('../controller/comment');
const authCheck = require('../middlewares/jwt_auth').authCheck;

router.get('/post/:postId/comment', authCheck, commentController.getComments);
router.post('/post/:postId/comment', authCheck, commentController.addComment);
module.exports = router;