const { body , validationResult } = require('express-validator');
const userModel = require('../model/user');

module.exports.validateUser = () => {
    return [
        body('first_name')
        .not().isEmpty().withMessage('Field is empty'),

        body('last_name')
        .not().isEmpty().withMessage('Field is empty'),

        body('email')
        .not().isEmpty().withMessage('Field is empty')
        .isEmail().withMessage('Email is not valid')
        .custom(value => {
           return userModel.getUserByEmail(value)
           .then(resolve => {
               if (resolve.length > 0) {
                   throw new Error('Email address already in use');
               }
               return true;
               
           })
        
        }),

        body('password')
        .not().isEmpty().withMessage('Field is empty'),

        body('confirm_password')
        .not().isEmpty().withMessage('Field is empty')
        .custom((value, { req }) => {

            if (value !== req.body.password) {
                throw new Error(`Passwords don't match`)
            }
            return true;
        })
    ]
}

module.exports.validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next()
    }
    console.log(errors);
    return res.status(400).json({
        errors: errors.array()
    });
}