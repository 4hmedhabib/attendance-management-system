import axios from "axios";

const API_URL = "http://localhost:3001";

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// apiClient.interceptors.response.use(
//   (response) => {
//     return response.data;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

export default apiClient;
