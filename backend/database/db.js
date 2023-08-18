const Pool = require('pg').Pool;

const pool = new Pool({
  user: "postgres",
  password: "Efesios2.10",
  host: "localhost",
  port: 5432,
  database: "rocket"
});

module.exports = pool;