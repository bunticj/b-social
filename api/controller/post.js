const postModel = require('../model/post');
const kafkaMessageClass = require('../kafka-node/kafkaMessageClass');
const produceMessage = require('../kafka-node/producer').produceMessage;
const kafkaPayload = [];


module.exports.getPosts = (req, res, next) => {
    
    let page = parseInt(req.query.page || 1);
    let size = parseInt(req.query.size || 10);
    let offset = (page - 1) * size;
    let numOfRows;
    postModel.rowCount()
    .then(result => { 
        numOfRows = result[0].row_num;
    });

    postModel.posts(size,offset)
        .then(resolve => {
            if (resolve) {
                res.status(200).json({
                    data: resolve,
                    currentPage : page,
                    pageSize : size,
                    totalPages: Math.ceil(numOfRows/size)
                });
            }
        })
        .catch(err => res.status(500).json(err));
}

module.exports.getSinglePost = (req, res, next) => {
    postModel.singlePost(req.params.postId)
    .then(resolve => {
        if(resolve) {
            res.status(200).json(resolve);
        }
    })
    .catch(err => res.status(500).json(err));
}

module.exports.createPost = (req, res, next) => {

    if (req.body.post_content && req.userData._id) {
        postModel.newPost(req.userData._id, req.body.post_content)
            .then(resolve => {
                const timeNow = new Date().toISOString();
                const topic = 'PostTopic';

                //send message on post add to kafka
                kafkaPayload.push(new kafkaMessageClass('user_id', req.userData._id, topic));
                kafkaPayload.push(new kafkaMessageClass('username', req.userData.username, topic));
                kafkaPayload.push(new kafkaMessageClass('email', req.userData.email, topic));
                kafkaPayload.push(new kafkaMessageClass('post_id', resolve.insertId, topic));
                kafkaPayload.push(new kafkaMessageClass('post_content', req.body.post_content, topic));
                kafkaPayload.push(new kafkaMessageClass('date_of_registration', timeNow, topic));

                produceMessage(kafkaPayload);
                res.status(201).json({
                    message: 'Post created',
                });
            })
            .catch(err => res.status(500).json(err));

    } else {
        res.status(400).json('Bad request');
    }
}