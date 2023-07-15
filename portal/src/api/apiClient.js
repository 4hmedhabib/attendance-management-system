import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3001/api/",
});

export const fetchAPI = async (method, endpoint, payload) => {
  try {
    const response = await apiClient({
      method: method,
      url: endpoint,
      data: { payload },
    });

    return response.data;
  } catch (err) {
    console.error("Error fetching data:", err);
    throw err;
  }
};

export default apiClient;
