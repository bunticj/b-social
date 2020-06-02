const userModel = require('../model/user');

module.exports.addUser = (req,res,next) => {

    userModel.addNewUser(req.body)
    .then(resolve => {
        res.status(201).json({
            message: 'User created'
        });
    
    })
    .catch(err => console.log(err));
}