const mysql = require("mysql");
const dotenv = require("dotenv");
dotenv.config();

const pool = mysql.createConnection({
  port: 3306,
  host: "bcgaeemvgnpid5deovnl-mysql.services.clever-cloud.com",
  user: "udohbxjnv0bsa4k5",
  password: "Mdln88ghsZpmnAg9bZky",
  database: "bcgaeemvgnpid5deovnl",
  connectionLimit: 10,
});

pool.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL!");
});
module.exports = pool;
