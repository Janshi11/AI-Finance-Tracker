
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ChatBot from "../components/ChatBot";
import deleteIcon from "../assets/trash.png";
import axios from "axios";
import "../App.css";





import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar, Pie } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

function App() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [expenses, setExpenses] = useState([]);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [form, setForm] = useState({
    type: "expense",
    amount: "",
    category: "",
    description: "",
  });

  // FETCH
  

const fetchData = async () => {
  if (!user) return;

  const res = await axios.post(
    "https://ai-finance-tracker-mf04.onrender.com/api/expenses/user",
    {
      userId: user._id
    }
  );

  setExpenses(res.data);
};

 useEffect(() => {
  if (!user) {
    navigate("/");
  } else {
    fetchData();
  }
}, []);

  // ADD
  const handleAdd = async () => {
  if (!user) return;
  if (!form.amount || !form.category) return;

  await axios.post(
    "https://ai-finance-tracker-mf04.onrender.com/api/expenses",
    {
      userId: user._id,
      amount:
        form.type === "expense"
          ? -Math.abs(Number(form.amount))
          : Math.abs(Number(form.amount)),
      category: form.category,
      description: form.description,
    }
  );

  setForm({
    type: "expense",
    amount: "",
    category: "",
    description: "",
  });

  fetchData();
};

  // DELETE
  const handleDelete = async (id) => {
    await axios.delete(`https://ai-finance-tracker-mf04.onrender.com/api/expenses/${id}`);
    fetchData();
  };

  // CALCULATIONS
  const income = expenses
    .filter((e) => e.amount > 0)
    .reduce((acc, e) => acc + e.amount, 0);

  const expense = expenses
    .filter((e) => e.amount < 0)
    .reduce((acc, e) => acc + e.amount, 0);

  const balance = income + expense;

  // CATEGORY DATA
  const categoryMap = {};
  expenses.forEach((e) => {
    const cat = (e.category || "Other").toLowerCase();
    categoryMap[cat] = (categoryMap[cat] || 0) + e.amount;
  });

  const labels = Object.keys(categoryMap);
  const values = Object.values(categoryMap);

  // BAR
  const barData = {
    labels,
    datasets: [
      {
        label: "Amount",
        data: values,
        backgroundColor: ["#ff2e88", "#ff5fa2", "#ff8fab", "#ffc2d1"],
        borderRadius: 10,
      },
    ],
  };

  // PIE
  const pieData = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        data: [income, Math.abs(expense)],
        backgroundColor: ["#ff2e88", "#ff8fab"],
      },
    ],
  };
  // replaced here --check note 

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { labels: { color: "black" ,  font: {
    size: 14,
    weight: "bold"
  }} } },
    scales: {
      x: { ticks: { color: "black" ,  font: {
    size: 14,
    weight: "bold"
  } }, grid: { display: false } },
      y: { ticks: { color: "black" ,  font: {
    size: 14,
    weight: "bold"
  }}, grid: { color: "black" } },
    },
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { labels: { color: "black",  font: {
    size: 14,
    weight: "bold"
  } } } },
  };
  // SORT + GROUP
  const grouped = {};
  const sortedExpenses = [...expenses]
    .filter((e) => e.date)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  sortedExpenses.forEach((e) => {
    const date = new Date(e.date).toLocaleDateString();

    if (!grouped[date]) grouped[date] = [];
    grouped[date].push(e);
  });

  Object.keys(grouped).forEach((date) => {
    grouped[date].sort((a, b) => {
      if (a.amount > 0 && b.amount < 0) return -1;
      if (a.amount < 0 && b.amount > 0) return 1;
      return Math.abs(b.amount) - Math.abs(a.amount);
    });
  });
// 🔥 TOP CATEGORY FIX
const categoryTotals = {};

expenses.forEach((e) => {
  if (e.amount < 0) {
    const cat = e.category || "Other";
    categoryTotals[cat] =
      (categoryTotals[cat] || 0) + Math.abs(e.amount);
  }
});

let topCategory = "No data";

if (Object.keys(categoryTotals).length > 0) {
  topCategory = Object.keys(categoryTotals).reduce((a, b) =>
    categoryTotals[a] > categoryTotals[b] ? a : b
  );
}
  return (
    <div className="container dashboard-page">
      <h1>AI Expense Tracker</h1>

      {/* TABS */}
      <div className="tabs">
        <button
          className={activeTab === "dashboard" ? "active" : ""}
          onClick={() => setActiveTab("dashboard")}
        >
          Dashboard
        </button>

        <button
          className={activeTab === "transactions" ? "active" : ""}
          onClick={() => setActiveTab("transactions")}
        >
          Transactions
        </button>
      </div>

      {/* FORM */}
      <div className="form">
        <select
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>

        <input
          type="number"
          placeholder="Amount"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
        />

        <input
          type="text"
          placeholder="Category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />

        <input
          type="text"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <button onClick={handleAdd}>Add</button>
      </div>

      {/* DASHBOARD */}
      {activeTab === "dashboard" && (
        <>
          <div className="cards">
            <div className="card">
              <h3>Total Balance</h3>
              <p className="balance">
                ₹{balance.toLocaleString("en-IN")}
              </p>
            </div>

            <div className="card">
              <h3>Income</h3>
              <p className="income">
                + ₹{income.toLocaleString("en-IN")}
              </p>
            </div>

            <div className="card">
              <h3>Expenses</h3>
              <p className="expense">
                - ₹{Math.abs(expense).toLocaleString("en-IN")}
              </p>
            </div>
          </div>
         
          <div className="charts">
            <div className="chart-box">
              <h3>Category Overview</h3>
              <div className="chart-wrapper">
                <Bar data={barData} options={barOptions} />
              </div>
            </div>

            <div className="chart-box">
              <h3>Income vs Expense</h3>
              <div className="chart-wrapper">
                <Pie data={pieData} options={pieOptions} />
              </div>
            </div>
          </div>
        </>
      )}

      {/* TRANSACTIONS */}
      {activeTab === "transactions" && (
        <div className="transactions">
          <h3>Transactions by Date</h3>

          {Object.keys(grouped).map((date) => (
            <div key={date}>
              <h4>{date}</h4>

              {grouped[date].map((e) => (
                <div className="txn-row" key={e._id}>
                  <span className="txn-category">{e.category}</span>

                  <span
                    className="txn-amount"
                    style={{
                      color: e.amount > 0 ? "#00ff88" : "#ff4d6d",
                    }}
                  >
                    {e.amount > 0
                      ? `+ ₹${e.amount.toLocaleString("en-IN")}`
                      : `- ₹${Math.abs(e.amount).toLocaleString("en-IN")}`}
                  </span>

                  <img
                    src={deleteIcon}
                    alt="delete"
                    className="delete-icon"
                    onClick={() => handleDelete(e._id)}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
      <ChatBot expenses={expenses} />
    </div>
  );
}




export default App; 