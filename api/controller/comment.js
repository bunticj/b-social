const commentModel = require('../model/comment');
const kafkaMessageClass = require('../kafka-node/kafkaMessageClass');
const produceMessage = require('../kafka-node/producer').produceMessage;
const kafkaPayload = [];

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
        commentModel.newComment(req.body.comment_content, req.userData._id, req.params.postId, res)
            .then(resolve => {
                if (resolve) {
                    const timeNow = new Date().toISOString();
                    const topic = 'CommentTopic';
                    //send message on comment to kafka
                    kafkaPayload.push(new kafkaMessageClass('user_id', req.userData._id, topic));
                    kafkaPayload.push(new kafkaMessageClass('username', req.userData.username, topic));
                    kafkaPayload.push(new kafkaMessageClass('email', req.userData.email, topic));
                    kafkaPayload.push(new kafkaMessageClass('post_id', req.params.postId, topic));
                    kafkaPayload.push(new kafkaMessageClass('comment_id', resolve.insertId, topic));
                    kafkaPayload.push(new kafkaMessageClass('comment_content', req.body.comment_content, topic));
                    kafkaPayload.push(new kafkaMessageClass('date_of_registration', timeNow, topic));

                    produceMessage(kafkaPayload);
                    res.status(201).json('Comment created');
                }
            })
            .catch(err => res.status(500).json(err));
    } else {
        res.status(400).json('Bad request');
    }
}