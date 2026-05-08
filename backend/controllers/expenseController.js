const Expense = require("../models/Expense");

// ✅ GET USER EXPENSES (IMPORTANT)
exports.getUserExpenses = async (req, res) => {
  try {
    const { userId } = req.body;

    const expenses = await Expense.find({ userId });

    res.json(expenses);

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};

// ✅ ADD EXPENSE
exports.addExpense = async (req, res) => {
  try {
    const { userId, amount, category, description } = req.body;

    const expense = new Expense({
      userId,
      amount,
      category,
      description
    });

    await expense.save();

    res.status(201).json(expense);

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};

// ✅ DELETE EXPENSE
exports.deleteExpense = async (req, res) => {
  try {
    const deleted = await Expense.findByIdAndDelete(req.params.id);

    res.json({
      message: "Deleted"
    });

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};

// ✅ INSIGHTS (USER BASED)
exports.getInsights = async (req, res) => {
  try {
    const { userId } = req.body;

    const expenses = await Expense.find({ userId });

    const totalSpent = expenses.reduce(
      (sum, item) => sum + item.amount,
      0
    );

    const categoryMap = {};

    expenses.forEach((item) => {
      categoryMap[item.category] =
        (categoryMap[item.category] || 0) + item.amount;
    });

    let highestCategory = "";
    let max = 0;

    for (let cat in categoryMap) {
      if (categoryMap[cat] > max) {
        max = categoryMap[cat];
        highestCategory = cat;
      }
    }

    res.json({
      totalSpent,
      highestCategory
    });

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};

// ✅ MONTHLY DATA (USER BASED)
exports.getMonthly = async (req, res) => {
  try {
    const { userId } = req.body;

    const expenses = await Expense.find({ userId });

    const monthlyData = {};

    expenses.forEach((item) => {
      const month = new Date(item.date).toLocaleString("default", {
        month: "short"
      });

      monthlyData[month] =
        (monthlyData[month] || 0) + item.amount;
    });

    res.json(monthlyData);

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};