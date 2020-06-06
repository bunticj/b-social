const commentModel = require('../model/comment');
const postModel = require('../model/post');
const produceMessage = require('../kafka-node/producer').produceMessage;

module.exports.getComments = (req, res, next) => {
    commentModel.comments(req.params.postId)
        .then(resolve => {
            if (resolve) {
                res.status(200).json(resolve);
            }
        })
        .catch(err => res.status(500).json(err));
}

module.exports.addComment = (req, res, next) => {
    if (req.body.comment_content && req.params.postId && req.userData._id) {
        let postAuthor;
        postModel.singlePost(req.params.postId)
            .then(resolve => {
                if (resolve.length > 0) {
                    postAuthor = resolve[0].user_id;
                }
            });
        commentModel.newComment(req.body.comment_content, req.userData._id, req.params.postId, res)
            .then(resolve => {
                if (resolve) {             
                    const timeNow = new Date().toISOString();
                    const topic = 'CommentTopic';
                    //send message on comment to kafka                    
                    let kafkaPayload = [
                    {topic : topic, key : 'user_id', messages: req.userData._id, partition:0},
                    {topic : topic, key : 'username', messages: req.userData.username, partition:0},
                    {topic : topic, key : 'email', messages: req.userData.email, partition:0},
                    {topic : topic, key : 'post_id', messages: req.params.postId, partition:0},
                    {topic : topic, key : 'post_author', messages: postAuthor, partition:0},
                    {topic : topic, key : 'comment_id', messages: resolve.insertId, partition:0},
                    {topic : topic, key : 'comment_content', messages: req.body.comment_content, partition:0},
                    {topic : topic, key : 'comment_created_at', messages: timeNow, partition:0},
                ];
                    produceMessage(kafkaPayload);
                    res.status(201).json('Comment created');
                }
            })
            .catch(err => res.status(500).json(err));
    } else {
        res.status(400).json('Bad request');
    }
}