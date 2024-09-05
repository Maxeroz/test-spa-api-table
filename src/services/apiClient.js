import axios from "axios";

const HOST = "https://test.v5.pryaniky.com";

const apiClient = axios.create({
  baseURL: HOST,
  headers: {
    "x-auth": localStorage.getItem("authToken") || "",
  },
});

// Добавляем интерсептор для обновления заголовка при изменении токена
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers["x-auth"] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
