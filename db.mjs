import mysql from "mysql2/promise";

if (process.env.NODE_ENV !== "production") {
  const dotenv = await import("dotenv");
  dotenv.config();
}

const db = mysql.createPool(process.env.DATABASE_URL);

export default db;
