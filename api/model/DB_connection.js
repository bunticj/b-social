const mysql = require('mysql');

module.exports = class DB {
    constructor() {
        this.connection = mysql.createConnection({
            host: process.env.DATABASE_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_ROOT_PASSWORD,
            database:  process.env.MYSQL_DATABASE,
            port: process.env.MYSQL_PORT
        })
    }

}