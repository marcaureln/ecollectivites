const { Pool } = require('pg');

const connectionString = process.env.DATABASE_URL;
const config = {
	host: process.env.PGHOST,
	port: process.env.PGPORT,
	user: process.env.PGUSER,
	password: process.env.PGPASSWORD,
	database: process.env.PGDATABASE,
};

const pool = new Pool(connectionString ? { connectionString } : config);

module.exports = {
	query: (queryString, params) => pool.query(queryString, params),
};
