const messageModel = require('../model/user_messages');

module.exports.createMessage = (req, res, next) => {

    if (req.body.user_id && req.body.message_content){
        messageModel.newMessage(req.body)
        .then(resolve => {
            if (resolve) {
                res.status(200).json('Notification sent');
            }
        }).catch(err => res.status(500).json('Internal error'));


    }
    else{
        res.status(400).json('Bad request');
    }

}
module.exports.readMessages =(req, res, next) => {

    if(req.userData._id !== parseInt(req.params.userId)){
        console.log(req.userData._id, req.params.userId);
        res.status(403).json('Forbidden')
    }
    messageModel.getMessages(req.userData._id)
    .then(resolve => {
        if (resolve){
            messageModel.updateToSeen(req.userData._id).then(result => {
                if (result) console.log('All notifications seen');
            }).catch(err => console.log(err));            
            res.status(200).json(resolve);
        }
    })
    .catch(err => res.status(500).json('Internal error'));

}