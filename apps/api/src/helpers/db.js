const { Pool } = require('pg');

const isDevelopment = process.env.NODE_ENV === 'development';
const connectionString = process.env.DATABASE_URL;

const pool = new Pool({ connectionString, ssl: isDevelopment ? false : { rejectUnauthorized: false } });

module.exports = {
	query: (queryString, params) => pool.query(queryString, params),
};
