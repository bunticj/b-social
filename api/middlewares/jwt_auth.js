const jwt = require('jsonwebtoken');

module.exports.authCheck = (req, res, next) => {
    try {
        //handle 'Bearer' key word
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_KEY);

        req.userData = decoded;

        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Auth failed'
        });
    }
}
module.exports.signToken = (user) => {
    return jwt.sign({
        email: user.email,
        _id: user.user_id,
        username: user.username
    }, process.env.JWT_KEY, {
        expiresIn: 86400
    });

}