const mysql = require("mysql2/promise");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const db = mysql.createPool(process.env.DATABASE_URL);

module.exports = db;
