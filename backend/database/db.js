require('dotenv').config(); // Carga las variables de entorno desde el archivo .env

const Pool = require('pg').Pool;

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  // ssl: true
});

module.exports = pool;