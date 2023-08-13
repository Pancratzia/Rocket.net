const Pool = require('pg').Pool;

const pool = new Pool({
  user: "postgres",
  password: "",
  host: "localhost",
  port: 3000,
  database: "rocket"
});

module.exports = pool;