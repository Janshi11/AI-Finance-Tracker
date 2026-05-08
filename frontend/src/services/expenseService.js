import API from "./api";

// get all expenses
export const getExpenses = () => API.get("/expenses");

// add expense
export const addExpense = (data) => API.post("/expenses", data);

// insights
export const getInsights = () => API.get("/expenses/insights");

// monthly
export const getMonthly = () => API.get("/expenses/monthly");