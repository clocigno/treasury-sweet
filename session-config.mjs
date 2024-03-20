if (process.env.NODE_ENV !== "production") {
  import("dotenv").then((dotenv) => dotenv.config());
}

import session from "express-session";
import MySQLStore from "express-mysql-session";
import db from "./db.mjs";

const sessionStore = MySQLStore(session);

function sessionConfig() {
  return session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new sessionStore(
      {
        expiration: 10800000, // Session expiration time in milliseconds
        createDatabaseTable: true, // Create table if not exists
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
    ),
  });
}

export default sessionConfig;
