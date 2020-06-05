const userModel = require('../model/user');
const signToken = require('../middlewares/jwt_auth').signToken;
const bcrypt = require('bcryptjs');
const kafkaMessageClass = require('../kafka-node/kafkaMessageClass');
const produceMessage = require('../kafka-node/producer').produceMessage;
const kafkaPayload = [];

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
                const timeNow = new Date().toISOString();
                const topic = 'UserRegisterTopic';
                //send message on registration to kafka
                kafkaPayload.push(new kafkaMessageClass('user_id', resolve.insertId, topic));
                kafkaPayload.push(new kafkaMessageClass('username', req.body.username, topic));
                kafkaPayload.push(new kafkaMessageClass('first_name', req.body.first_name, topic));
                kafkaPayload.push(new kafkaMessageClass('last_name', req.body.last_name, topic));
                kafkaPayload.push(new kafkaMessageClass('email', req.body.email, topic));
                kafkaPayload.push(new kafkaMessageClass('date_of_registration', timeNow, topic));

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