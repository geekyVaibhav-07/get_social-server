const mysql = require('mysql');
const dotenv = require('dotenv');
const util = require('util');

dotenv.config({ path: './config.env' });

const connection = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DB,
    timezone: 'utc'
});

const query = util.promisify(connection.query).bind(connection);

module.exports.query = query;
module.exports.db = connection;
