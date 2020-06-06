const axios = require('axios');

module.exports.sendRequest = (messageObj) => {
axios.request({
    method: 'POST',
    url: `http://localhost:7000/user/${messageObj.post_author}/message`,
    data: {user_id: messageObj.post_author,message_content:`Your post with ID=${messageObj.post_id} has been commented`},
    header: {'Content-Type' : 'application/json'}
}).then(response => {          
  console.log('Notification sent');
}).catch(err => console.log(err));

}