const DBClass = require('./DB_connection');
const db = new DBClass();

module.exports.newFollower = (u_id, follow_id, res) => {
    let prResolve;
    let pr = new Promise((resolve) => {
        prResolve = resolve;
    });
    let sqlQuery = `INSERT INTO follower (user_id, following_user_id) VALUES (?,?) `;
    let params = [u_id, follow_id];
    db.connection.query(sqlQuery, params, (err, result) => {
        if (err) res.status(400).json(`User not found, change follower's ID`);
        prResolve(result);
    });
    return pr;
}

module.exports.checkFollower = (u_id, follow_id) => {
    let prResolve;
    let pr = new Promise((resolve) => {
        prResolve = resolve;
    });
    let sqlQuery = ` SELECT * FROM follower WHERE user_id = ${u_id} AND following_user_id = ${follow_id} `;
    db.connection.query(sqlQuery, (err, result) => {
        if (err) throw err;
        prResolve(result);
    });
    return pr;
}

module.exports.allFollowingUsers = (u_id) => {
    let prResolve;
    let pr = new Promise((resolve) => {
        prResolve = resolve;
    });
    let sqlQuery = `SELECT * FROM follower WHERE user_id=${u_id}`;
    db.connection.query(sqlQuery, (err, result) => {
        if (err) throw err;
        prResolve(result);
    });
    return pr;
}