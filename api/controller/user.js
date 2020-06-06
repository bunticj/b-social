const userModel = require('../model/user');
const signToken = require('../middlewares/jwt_auth').signToken;
const bcrypt = require('bcryptjs');
const produceMessage = require('../kafka-node/producer').produceMessage;

module.exports.addUser = (req, res, next) => {
    userModel.addNewUser(req.body)
        .then(userModel.getUserByEmail(req.body.email))
        .then(resolve => {
            if (resolve) {
                const tokenPayload = {
                    email: req.body.email,
                    user_id: resolve.insertId,
                    username: req.body.username
                };
            //send message on registration to kafka
                const topic = 'UserRegisterTopic';
                let timeNow = new Date().toISOString();
                let kafkaPayload = [
                    {topic : topic, key : 'user_id', messages: resolve.insertId, partition:0},
                    {topic : topic, key : 'username', messages: req.body.username, partition:0},
                    {topic : topic, key : 'email', messages: req.body.email, partition:0},
                    {topic : topic, key : 'first_name', messages: req.body.first_name, partition:0},
                    {topic : topic, key : 'last_name', messages: req.body.last_name, partition:0},
                    {topic : topic, key : 'date_of_registration', messages: timeNow, partition:0},
                ];
                produceMessage(kafkaPayload);

                const token = signToken(tokenPayload);
                res.status(201).json({
                    message: 'User created',
                    token
                });
            }
        })
        .catch(err => res.status(500).json('Internal error'));
}

module.exports.loginUser = (req, res, next) => {
    userModel.getUserByEmail(req.body.email)
        .then(resolve => {
            if (!resolve[0]) {
                res.status(401).json('Authentication failed');
            }
            bcrypt.compare(req.body.password, resolve[0].password).then(result => {
                if (result) {
                    const tokenPayload = {
                        email: req.body.email,
                        user_id: resolve[0].user_id
                    };
                    const token = signToken(tokenPayload);
                    return res.status(200).json({
                        message: 'Authentication succesful',
                        token

                    });
                } else {
                    res.status(401).json('Authentication failed');
                }
            });
        })
        .catch(err => res.status(500).json('Internal error'));
}

module.exports.getUsers = (req, res, next) => {
    userModel.getAllUsers()
        .then(resolve => {
            if (resolve) {
                res.status(200).json(resolve);
            }
        })
        .catch(err => res.status(500).json('Internal error'));
}