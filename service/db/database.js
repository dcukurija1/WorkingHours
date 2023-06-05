require('dotenv').config()
const { Pool } = require("pg");

const pool = new Pool({
	host: process.env.DBHOST,
	user: process.env.DBUSER,
	port: process.env.DBPORT,
	password: process.env.DBPASSWORD,
	database: process.env.DBNAME
});

module.exports = pool

