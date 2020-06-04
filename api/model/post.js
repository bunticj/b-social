const DBClass = require('./DB_connection');
const db = new DBClass();


//after adding followers feature rewrite query
module.exports.posts = (limit, offset) => {
    let prResolve;
    let pr = new Promise((resolve, reject) => {
        prResolve = resolve;
    });

    let sqlQuery = `SELECT * FROM post ORDER BY post.created_at DESC LIMIT ${limit} OFFSET ${offset}`;
    db.connection.query(sqlQuery, (err, result) => {
        if (err) throw err;
        prResolve(result);
    });
    return pr;
}

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

//after adding followers feature rewrite query
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