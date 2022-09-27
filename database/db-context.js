const { Sequelize } = require("sequelize");

let {
    DB_DATABASE,
    DB_USERNAME,
    DB_PASSWORD,
    DB_HOST,
} = process.env;

DB_DATABASE = DB_DATABASE ?? 'shifts'
DB_USERNAME = DB_USERNAME ?? 'xpto-user'
DB_PASSWORD = DB_PASSWORD ?? 'xpto-pass'
DB_HOST = DB_HOST ?? 'localhost'

const DbContext = new Sequelize(DB_DATABASE, DB_USERNAME, DB_PASSWORD, {
    host: DB_HOST,
    dialect: 'mysql',
});

module.exports = { DbContext }