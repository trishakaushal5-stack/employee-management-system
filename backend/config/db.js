require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "loginapp",
  password: "2530",
  port: 5432
});

module.exports = pool;

module.exports = pool;