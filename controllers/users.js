import db from "../db.js";
import bcrypt from "bcryptjs";

export const getUserByUsername = async (username) => {
  const query = "SELECT * FROM users WHERE username = ?";
  try {
    const [rows] = await db.query(query, [username]);
    return rows[0];
  } catch (error) {
    console.error("Error fetching user by username:", error);
    throw error;
  }
};

export const getUserById = async (id) => {
  const query = "SELECT * FROM users WHERE id = ?";
  try {
    const [rows] = await db.query(query, [id]);
    return rows[0];
  } catch (error) {
    console.error("Error fetching user by id:", error);
    throw error;
  }
};

export const createUser = async (username, email, password) => {
  try {
    const query =
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query(query, [username, email, hashedPassword]);
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

export const updateUser = async (id, username, email, password) => {
  try {
    const query =
      "UPDATE users SET username = ?, email = ?, password = ? WHERE id = ?";
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query(query, [username, email, hashedPassword, id]);
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};
