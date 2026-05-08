const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { message, expenses } = req.body;

    if (!message) {
      return res.json({ reply: "Ask something about your finances." });
    }

    const lower = message.toLowerCase();

    // 💰 totals
    const income = expenses
      .filter((e) => e.amount > 0)
      .reduce((sum, e) => sum + e.amount, 0);

    const expenseList = expenses.filter((e) => e.amount < 0);

    const totalExpense = expenseList.reduce(
      (sum, e) => sum + Math.abs(e.amount),
      0
    );

    const balance = income - totalExpense;

    // 📊 category analysis (IGNORE savings)
    const categoryMap = {};

    expenseList.forEach((e) => {
      if (e.category.toLowerCase() !== "savings") {
        categoryMap[e.category] =
          (categoryMap[e.category] || 0) + Math.abs(e.amount);
      }
    });

    const sorted = Object.entries(categoryMap).sort(
      (a, b) => b[1] - a[1]
    );

    const topCategory = sorted.length ? sorted[0][0] : null;
    const topAmount = sorted.length ? sorted[0][1] : 0;

    let reply = "";

    // 🤖 SMART RESPONSES
    if (lower.includes("save")) {
      if (topCategory) {
        reply = `You're spending most on ${topCategory} (₹${topAmount}). Try reducing that to save more money.`;
      } else {
        reply = "Track your expenses to identify where you can save.";
      }
    } 
    else if (lower.includes("spend")) {
      reply = `You have spent ₹${totalExpense} in total.`;
    } 
    else if (lower.includes("where")) {
      reply = `Your highest spending is on ${topCategory} (₹${topAmount}).`;
    } 
    else if (lower.includes("balance")) {
      reply = `Your current balance is ₹${balance}.`;
    } 
    else {
      reply =
        "Ask me things like: 'Where am I spending most?' or 'How can I save money?'";
    }

    res.json({ reply });
  } catch (err) {
    console.error("AI ERROR:", err);
    res.json({ reply: "Something went wrong." });
  }
});

module.exports = router;