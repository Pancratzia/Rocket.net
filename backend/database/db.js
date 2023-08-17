const Pool = require('pg').Pool;

const pool = new Pool({
  user: "postgres",
  password: "2003",
  host: "localhost",
  port: 5432,
  database: "rocket"
});

module.exports = pool;