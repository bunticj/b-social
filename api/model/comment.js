const DBClass = require('./DB_connection');
const db = new DBClass();


module.exports.comments = (post_id) => {
    let prResolve;
    let pr = new Promise((resolve, reject) => {
        prResolve = resolve;
    });

    let sqlQuery = `SELECT * FROM comment WHERE post_id=${post_id}`;
    db.connection.query(sqlQuery, (err, result) => {
        if (err) throw err;
        prResolve(result);
    });
    return pr;
}

module.exports.newComment = (comment_content, u_id, post_id,res) => {
    let prResolve;
    let pr = new Promise((resolve) => {
        prResolve = resolve;
    });
    let sqlQuery = `INSERT INTO comment (comment_content,user_id, post_id) VALUES (?,?,?) `;
    let params = [comment_content, u_id, post_id];
    db.connection.query(sqlQuery, params, (err, result) => {
        if (err) res.status(400).json('Bad request');
        prResolve(result);
    });
    return pr;
}