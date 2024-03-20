import express from "express";
import {
  createAccount,
  getAccounts,
  getAccountById,
  updateAccountBalance,
  updateAccountType,
  deleteAccount,
  getTransactionsByAccountId,
} from "../controllers/accounts.mjs";
import { ensureAuthenticated } from "../middleware/auth.mjs";

const router = express.Router();

router.post("/create", ensureAuthenticated, async (req, res) => {
  try {
    const userId = req.user.id;
    const { accountType, balance } = req.body;
    await createAccount(userId, accountType, balance);
    res.status(201).json({ message: "Account created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error creating account" });
  }
});

router.get("/", ensureAuthenticated, async (req, res) => {
  try {
    const userId = req.user.id;
    const accounts = await getAccounts(userId);
    res.status(200).json(accounts);
  } catch (error) {
    res.status(500).json({ message: "Error getting accounts" });
  }
});

router.get("/:id", ensureAuthenticated, async (req, res) => {
  try {
    const userId = req.user.id;
    const accountId = req.params.id;
    const account = await getAccountById(accountId, userId);
    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }
    res.status(200).json(account);
  } catch (error) {
    res.status(500).json({ message: "Error getting account" });
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
    res.status(200).json({ message: "Account updated successfully" });
  } catch (error) {
    if (error.message === "Account not found") {
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
    res.status(200).json({ message: "Account deleted successfully" });
  } catch (error) {
    if (error.message === "Account not found") {
      return res.status(404).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Error deleting account" });
    }
  }
});

router.get("/:id/transactions", ensureAuthenticated, async (req, res) => {
  try {
    const userId = req.user.id;
    const accountId = req.params.id;
    const transactions = await getTransactionsByAccountId(userId, accountId);
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: "Error getting transactions" });
  }
});

export default router;
