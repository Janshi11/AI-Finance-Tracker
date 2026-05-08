import axios from "axios";

const API = "https://ai-finance-tracker-mf04.onrender.com/api/expenses";

export const getExpenses = async () => {
  const res = await axios.get(API);
  return res.data;
};