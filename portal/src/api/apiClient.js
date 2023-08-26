import axios from "axios";

const API_URL = "http://localhost:3001";

const apiClient = axios.create({
  baseURL: API_URL,
  mode: "same-origin",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

export default apiClient;
