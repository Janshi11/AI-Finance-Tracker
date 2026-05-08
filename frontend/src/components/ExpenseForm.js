import { useState } from "react";
import axios from "axios";

function ExpenseForm({ refreshData }) {
  const [form, setForm] = useState({
    userId: "123",
    amount: "",
    category: "",
    description: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/expenses", {
        ...form,
        amount: Number(form.amount),
      });

      setForm({ userId: "123", amount: "", category: "", description: "" });

      refreshData(); // 🔥 auto refresh
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        type="number"
        name="amount"
        placeholder="Amount (+income / -expense)"
        value={form.amount}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="category"
        placeholder="Category"
        value={form.category}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
      />

      <button type="submit">Add</button>
    </form>
  );
}

export default ExpenseForm;