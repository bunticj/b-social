const DBClass = require('./DB_connection');
const db = new DBClass();

//get all post from user and those who is followed by the user
module.exports.posts = (limit, offset, u_id) => {
    let prResolve;
    let pr = new Promise((resolve, reject) => {
        prResolve = resolve;
    });

    let sqlQuery = `SELECT * FROM post WHERE user_id=${u_id} OR user_id IN (SELECT following_user_id FROM follower WHERE user_id = ${u_id})
    ORDER BY post.created_at DESC LIMIT ${limit} OFFSET ${offset} `;
    db.connection.query(sqlQuery, (err, result) => {
        if (err) throw err;
        prResolve(result);
    });
    return pr;
}

//add new post
module.exports.newPost = (u_id, post_content) => {
    let prResolve;
    let pr = new Promise((resolve) => {
        prResolve = resolve;
    });
    let sqlQuery = `INSERT INTO post (user_id, post_content) VALUES (?,?) `;
    let params = [u_id, post_content];
    db.connection.query(sqlQuery, params, (err, result) => {
        if (err) throw err;
        prResolve(result);
    });
    return pr;
}

//get single post
module.exports.singlePost = (id) => {
    let prResolve;
    let pr = new Promise((resolve, reject) => {
        prResolve = resolve;
    });
    let sqlQuery = `SELECT * FROM post WHERE post_id=${id}`;
    db.connection.query(sqlQuery, (err, result) => {
        if (err) throw err;
        prResolve(result);
    });
    return pr;
}

module.exports.rowCount = () => {
    let prResolve;
    let pr = new Promise((resolve, reject) => {
        prResolve = resolve;
    });
    let sqlQuery = `SELECT COUNT(*) AS row_num FROM post`;
    db.connection.query(sqlQuery, (err, result) => {
        if (err) throw err;
        prResolve(result);
    });
    return pr;
}