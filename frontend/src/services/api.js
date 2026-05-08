import axios from "axios";

const API = axios.create({
  baseURL: "https://ai-finance-tracker-mf04.onrender.com/api"
});

export default API;