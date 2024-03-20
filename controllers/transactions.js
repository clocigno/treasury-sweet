const db = require("../db.js");

const createTransaction = async (userId, accountId, amount, type) => {
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();

    const signedAmount = type === "credit" ? amount : -amount;
    const transactionQuery =
      "INSERT INTO transactions (account_id, amount, transaction_type) VALUES (?, ?, ?)";
    const accountQuery =
      "UPDATE accounts SET balance = balance + ? WHERE id = ? AND user_id = ?";

    await connection.query(transactionQuery, [accountId, amount, type]);
    const accountResult = await connection.query(accountQuery, [
      signedAmount,
      accountId,
      userId,
    ]);

    if (accountResult[0].affectedRows === 0) {
      throw new Error("Account not found or access denied");
    }

    await connection.commit();
  } catch (error) {
    await connection.rollback();
    console.error("Error creating transaction:", error);
    throw error;
  } finally {
    connection.release();
  }
};

const getTransactions = async (userId) => {
  try {
    const query = "SELECT * FROM transactions WHERE user_id = ?";
    const [rows] = await db.query(query, [userId]);
    return rows;
  } catch (error) {
    console.error("Error getting transactions:", error);
    throw error;
  }
};

const getTransactionById = async (transactionId, userId) => {
  try {
    const query = "SELECT * FROM transactions WHERE id = ? AND user_id = ?";
    const [rows] = await db.query(query, [transactionId, userId]);
    return rows[0];
  } catch (error) {
    console.error("Error getting transaction by id:", error);
    throw error;
  }
};

module.exports = {
  createTransaction,
  getTransactions,
  getTransactionById,
};
