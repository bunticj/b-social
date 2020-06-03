const userModel = require('../model/user');
const signToken = require('../middlewares/jwt_auth').signToken;
const bcrypt = require('bcryptjs');

module.exports.addUser = (req, res, next) => {
    userModel.addNewUser(req.body)
        .then(userModel.getUserByEmail(req.body.email))
        .then(resolve => {
            const tokenPayload = {
                email: req.body.email,
                user_id: resolve.insertId
            };
            const token = signToken(tokenPayload);
            console.log(token);
            res.status(201).json({
                message: 'User created',
                token
            });

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
                }
                else {
                    res.status(401).json('Authentication failed');
                }
            });
        })
        .catch(err =>  res.status(500).json('Internal error'));
}