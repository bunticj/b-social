const postModel = require('../model/post');
const produceMessage = require('../kafka-node/producer').produceMessage;


module.exports.getPosts = (req, res, next) => {

    let page = parseInt(req.query.page || 1);
    let size = parseInt(req.query.size || 10);
    let offset = (page - 1) * size;
    let numOfRows;
    postModel.rowCount()
        .then(result => {
            numOfRows = result[0].row_num;
        });
    postModel.posts(size, offset, req.userData._id)
        .then(resolve => {
            if (resolve) {
                res.status(200).json({
                    data: resolve,
                    currentPage: page,
                    pageSize: size,
                    totalPages: Math.ceil(numOfRows / size)
                });
            }
        })
        .catch(err => res.status(500).json(err));
}

module.exports.getSinglePost = (req, res, next) => {
    postModel.singlePost(req.params.postId)
        .then(resolve => {
            if (resolve) {
                res.status(200).json(resolve);
            }
        })
        .catch(err => res.status(500).json(err));
}

module.exports.createPost = (req, res, next) => {

    if (req.body.post_content && req.userData._id) {
        console.log(req.body.post_content, req.userData._id);
        postModel.newPost(req.userData._id, req.body.post_content)
            .then(resolve => {
                if (resolve) {
                    const timeNow = new Date().toISOString();
                    const topic = 'PostTopic';
                    //send message on post add to kafka
                    let kafkaPayload = [
                        {topic : topic, key : 'user_id', messages: req.userData._id, partition:0},
                        {topic : topic, key : 'username', messages: req.userData.username, partition:0},
                        {topic : topic, key : 'email', messages: req.userData.email, partition:0},
                        {topic : topic, key : 'post_id', messages: resolve.insertId, partition:0},
                        {topic : topic, key : 'post_content', messages: req.body.post_content, partition:0},
                        {topic : topic, key : 'post_created_at', messages: timeNow, partition:0},
                    ];
                    produceMessage(kafkaPayload);
                    res.status(201).json({
                        message: 'Post created',
                    });
                }
            })
            .catch(err => res.status(500).json(err));

    } else {
        res.status(400).json('Bad request');
    }
}