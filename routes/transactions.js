const express = require("express");
const ensureAuthenticated = require("../middleware/auth.js");

const {
  createTransaction,
  getTransactions,
  getTransactionById,
} = require("../controllers/transactions.js");

const router = express.Router();

router.post("/create", ensureAuthenticated, async (req, res) => {
  try {
    const userId = req.user.id;
    const { accountId, amount, type } = req.body;
    await createTransaction(userId, accountId, amount, type);
    res.status(201).json({ message: "Transaction created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error creating transaction" });
  }
});

router.get("/", ensureAuthenticated, async (req, res) => {
  try {
    const userId = req.user.id;
    const transactions = await getTransactions(userId);
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: "Error getting transactions" });
  }
});

router.get("/:id", ensureAuthenticated, async (req, res) => {
  try {
    const userId = req.user.id;
    const transactionId = req.params.id;
    const transaction = await getTransactionById(transactionId, userId);
    if (transaction) {
      res.status(200).json(transaction);
    } else {
      res.status(404).json({ message: "Transaction not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error getting transaction by id" });
  }
});

module.exports = router;
