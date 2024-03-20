const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
const db = require("./db.js");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const sessionStore = new MySQLStore(
  {
    expiration: 10800000,
    createDatabaseTable: true,
    schema: {
      tableName: "sessions",
      columnNames: {
        session_id: "session_id",
        expires: "expires",
        data: "data",
      },
    },
  },
  db
);

function sessionConfig() {
  return session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
  });
}

module.exports = sessionConfig;
