const express = require("express");
const ensureAuthenticated = require("../middleware/auth.js");

const {
  createAccount,
  getAccounts,
  getAccountById,
  updateAccountBalance,
  updateAccountType,
  deleteAccount,
  getTransactionsByAccountId,
} = require("../controllers/accounts.js");

const router = express.Router();

router.post("/create", ensureAuthenticated, async (req, res) => {
  try {
    const userId = req.user.id;
    const { accountType, balance } = req.body;
    await createAccount(userId, accountType, balance);
    return res.status(201).json({ message: "Account created successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error creating account" });
  }
});

router.get("/", ensureAuthenticated, async (req, res) => {
  try {
    const userId = req.user.id;
    const accounts = await getAccounts(userId);
    return res.status(200).json(accounts);
  } catch (error) {
    return res.status(500).json({ message: "Error getting accounts" });
  }
});

router.get("/:id", ensureAuthenticated, async (req, res) => {
  try {
    const userId = req.user.id;
    const accountId = req.params.id;
    const account = await getAccountById(accountId, userId);
    if (!account) {
      return res
        .status(404)
        .json({ message: "Account not found or access denied" });
    }
    return res.status(200).json(account);
  } catch (error) {
    return res.status(500).json({ message: "Error getting account" });
  }
});

router.patch("/:id", ensureAuthenticated, async (req, res) => {
  try {
    const userId = req.user.id;
    const accountId = req.params.id;
    const { accountType, balance } = req.body;
    if (accountType) {
      await updateAccountType(accountId, userId, accountType);
    }
    if (balance) {
      await updateAccountBalance(accountId, userId, balance);
    }
    return res.status(200).json({ message: "Account updated successfully" });
  } catch (error) {
    if (error.message === "Account not found or access denied.") {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: "Error updating account" });
  }
});

router.delete("/:id", ensureAuthenticated, async (req, res) => {
  try {
    const userId = req.user.id;
    const accountId = req.params.id;
    await deleteAccount(accountId, userId);
    return res.status(200).json({ message: "Account deleted successfully" });
  } catch (error) {
    if (error.message === "Account not found or access denied.") {
      return res.status(404).json({ message: error.message });
    } else {
      return res.status(500).json({ message: "Error deleting account" });
    }
  }
});

router.get("/:id/transactions", ensureAuthenticated, async (req, res) => {
  try {
    const userId = req.user.id;
    const accountId = req.params.id;
    const transactions = await getTransactionsByAccountId(userId, accountId);
    return res.status(200).json(transactions);
  } catch (error) {
    return res.status(500).json({ message: "Error getting transactions" });
  }
});

module.exports = router;
