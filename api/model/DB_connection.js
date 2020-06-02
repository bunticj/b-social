const mysql = require('mysql');

module.exports = class DB {
    constructor() {
        this.connection = mysql.createConnection({
            host: '127.0.0.1',
            user: 'root',
            database:'b-social',
            port: 3306
        })
    }
    
}