const express = require("express");
const router = express.Router();

const {
  getUserExpenses,
  addExpense,
  deleteExpense,
  getInsights,
  getMonthly
} = require("../controllers/expenseController");

// ✅ GET USER EXPENSES
router.post("/user", getUserExpenses);

// ✅ ADD EXPENSE
router.post("/", addExpense);

// ✅ DELETE
router.delete("/:id", deleteExpense);

// ✅ INSIGHTS (USER BASED)
router.post("/insights", getInsights);

// ✅ MONTHLY (USER BASED)
router.post("/monthly", getMonthly);

module.exports = router;