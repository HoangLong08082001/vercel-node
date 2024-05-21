const { createPool } = require("mysql");
const dotenv = require("dotenv");
dotenv.config();
const pool = createPool({
  port: 3306,
  host: "localhost",
  user: "root",
  password: "",
  database: "AffiliateDatabase",
  connectionLimit: 10,
});

module.exports = pool;
