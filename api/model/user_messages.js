const DBClass = require('./DB_connection');
const db = new DBClass();

module.exports.newMessage = (data) => {
    let prResolve;
    let pr = new Promise((resolve) => {
        prResolve = resolve;
    });
    let sqlQuery = `INSERT INTO user_message (user_id, message_content) VALUES (?,?) `;
    let params = [data.user_id, data.message_content];
    db.connection.query(sqlQuery, params, (err, result) => {
        if (err) throw err;
        prResolve(result);
    });
    return pr;
}

module.exports.getMessages = (u_id) => {

    let prResolve;
    let pr = new Promise((resolve, reject) => {
        prResolve = resolve;
    });

    let sqlQuery = `SELECT * FROM user_message WHERE user_id =${u_id} AND seen = false; `;
    db.connection.query(sqlQuery, (err, result) => {
        if (err) throw err;
        prResolve(result);
    });
    return pr;

}
module.exports.updateToSeen = (u_id) => {
    let prResolve;
    let pr = new Promise((resolve, reject) => {
        prResolve = resolve;
    });

    let sqlQuery = `UPDATE user_message SET seen=true WHERE user_id =${u_id}; `
    db.connection.query(sqlQuery, (err, result) => {
        if (err) throw err;
        prResolve(result);
    });
    return pr;

}
