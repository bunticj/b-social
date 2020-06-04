const DBClass = require('./DB_connection');
const db = new DBClass();
const bcrypt = require('bcryptjs');

module.exports.addNewUser = (data) => {
    let prResolve;
    let pr = new Promise(resolve => {
        prResolve = resolve;
    });

    bcrypt.hash(data.password, 10, (err, hash) => {
        let sqlQuery = `INSERT INTO user (first_name, last_name,username, email, password) VALUES (?,?,?,?,?) `;
        let params = [data.first_name, data.last_name, data.username, data.email, hash];
        db.connection.query(sqlQuery, params, (err, result) => {
            if (err) throw err;
            prResolve(result);
        });
    });
    return pr;
}

module.exports.getAllUsers = () => {

    let prResolve;
    let pr = new Promise(resolve => {
        prResolve = resolve;
    });
    let sqlQuery = `SELECT *  FROM user `;
    db.connection.query(sqlQuery,(err, result) => {
        if (err) throw err;
        prResolve(result);
    });
    return pr;
}
module.exports.getUserByEmail = (email) => {
    let prResolve;
    let pr = new Promise(resolve => {
        prResolve = resolve;
    });
    let sqlQuery = `SELECT *  FROM user WHERE email = ?`;
    db.connection.query(sqlQuery,email,(err, result) => {
        if (err) throw err;
        prResolve(result);
    });
    return pr;
}

module.exports.getUserByUsername  = (username) => {
    let prResolve;
    let pr = new Promise(resolve => {
        prResolve = resolve;
    });
    let sqlQuery = `SELECT *  FROM user WHERE username = ?`;
    db.connection.query(sqlQuery,username,(err, result) => {
        if (err) throw err;
        prResolve(result);
    });
    return pr;
}
