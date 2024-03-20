const db = require("../db.js");

const createAccount = async (userId, accountType, balance) => {
  try {
    const query =
      "INSERT INTO accounts (user_id, account_type, balance) VALUES (?, ?, ?)";
    await db.query(query, [userId, accountType, balance]);
  } catch (error) {
    console.error("Error creating account:", error);
    throw error;
  }
};

const getAccounts = async (userId) => {
  try {
    const query = "SELECT * FROM accounts WHERE user_id = ?";
    const [rows] = await db.query(query, [userId]);
    return rows;
  } catch (error) {
    console.error("Error getting accounts:", error);
    throw error;
  }
};

const getAccountById = async (accountId, userId) => {
  try {
    const query = "SELECT * FROM accounts WHERE id = ? AND user_id = ?";
    const [rows] = await db.query(query, [accountId, userId]);
    return rows[0];
  } catch (error) {
    console.error("Error getting account by id:", error);
    throw error;
  }
};

const updateAccountType = async (accountId, userId, newAccountType) => {
  try {
    const query =
      "UPDATE accounts SET account_type = ? WHERE id = ? AND user_id = ?";
    const [result] = await db.query(query, [newAccountType, accountId, userId]);
    if (result.affectedRows === 0) {
      throw new Error("Account not found");
    }
  } catch (error) {
    console.error("Error updating account type:", error);
    throw error;
  }
};

const updateAccountBalance = async (accountId, userId, newBalance) => {
  try {
    const query =
      "UPDATE accounts SET balance = ? WHERE id = ? AND user_id = ?";
    const [result] = await db.query(query, [newBalance, accountId, userId]);
    if (result.affectedRows === 0) {
      throw new Error("Account not found");
    }
  } catch (error) {
    console.error("Error updating account balance:", error);
    throw error;
  }
};

const deleteAccount = async (accountId, userId) => {
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();

    const query = "DELETE FROM accounts WHERE id = ? AND user_id = ?";
    const [result] = await connection.query(query, [accountId, userId]);

    if (result.affectedRows === 0) {
      throw new Error("Account not found or access denied");
    }

    const deleteTransactionsQuery =
      "DELETE FROM transactions WHERE account_id = ?";
    await connection.query(deleteTransactionsQuery, [accountId]);

    await connection.commit();
  } catch (error) {
    await connection.rollback();
    console.error("Error deleting account:", error);
    throw error;
  } finally {
    connection.release();
  }
};

const getTransactionsByAccountId = async (userId, accountId) => {
  try {
    const query = `
      SELECT t.* 
      FROM transactions t
      JOIN accounts a ON t.account_id = a.id
      WHERE a.id = ? AND a.user_id = ?
    `;
    const [transactions] = await db.query(query, [accountId, userId]);

    if (transactions.length === 0) {
      throw new Error(
        "No transactions found for this account or access denied"
      );
    }

    return transactions;
  } catch (error) {
    console.error("Error in getting transactions by account_id:", error);
    throw error; // Or handle the error as appropriate
  }
};

module.exports = {
  createAccount,
  getAccounts,
  getAccountById,
  updateAccountType,
  updateAccountBalance,
  deleteAccount,
  getTransactionsByAccountId,
};
