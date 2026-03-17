import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

let isRefreshing = false;
let refreshSubscribers = [];

const onRefreshed = (token) => {
  refreshSubscribers.forEach((callback) => callback(token));
  refreshSubscribers = [];
};

const addSubscriber = (callback) => {
  refreshSubscribers.push(callback);
};

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401) {
      if (!isRefreshing) {
        isRefreshing = true;

        try {
          const refreshToken = localStorage.getItem("refresh_token");

          const res = await axios.post(
            "https://localhost:5001/api/auth/refresh-token",
            {
              refreshToken: refreshToken,
            },
          );

          const newToken = res.data.accessToken;

          localStorage.setItem("auth_token", newToken);

          isRefreshing = false;

          onRefreshed(newToken);

          originalRequest.headers.Authorization = `Bearer ${newToken}`;

          return axiosClient(originalRequest);
        } catch (err) {
          isRefreshing = false;

          localStorage.clear();
          window.location.href = "/login";

          return Promise.reject(err);
        }
      }

      return new Promise((resolve) => {
        addSubscriber((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          resolve(axiosClient(originalRequest));
        });
      });
    }

    return Promise.reject(error);
  },
);

export default axiosClient;
