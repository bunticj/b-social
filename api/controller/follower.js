const followModel = require('../model/follower');

module.exports.followUser = (req, res, next) => {
    if (req.userData._id && req.body.follow_id) {
        followModel.checkFollower(req.userData._id, req.body.follow_id)
            .then(resolve => {
                if (resolve.length > 0) {
                    res.status(400).json('You are already following this person');
                }
            })
            .then(followModel.newFollower(req.userData._id, req.body.follow_id, res))
            .then(resolve => {
                if (resolve) {
                    res.status(200).json({
                        message: 'Follow success'
                    });
                }               
            }).catch(err => res.status(500).json('Internal error'));
    } else {
        res.status(400).json('Bad request');
    }
}

module.exports.getFollowers = (req, res, next) => {
    followModel.allFollowingUsers(req.userData._id)
    .then (resolve => {
        if(resolve) {
            res.status(200).json(resolve);

        }
    })
    .catch(err => res.status(500).json('Internal error'));
}