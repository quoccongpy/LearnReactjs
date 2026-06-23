import axiosClient from "../../../core/api/axiosClient";
import { decodeToken } from "../../../shared/utils/jwt";

const TOKEN_KEY = "auth_token";
const REFRESH_TOKEN_KEY = "refresh_token";
const EXPIRES_AT_KEY = "expires_at";

export const authService = {
  register,
  login,
  refreshToken,
  logout,
  getToken,
  getCurrentUser,
};
async function register(data) {
  const res = await axiosClient.post("/user", data);
  return res.data;
}

async function login(data) {
  const res = await axiosClient.post("/auth/login", data);
  setAuthData(res.data);
  return res.data;
}
async function refreshToken() {
  const refreshData = {
    accessToken: getToken(),
    refreshToken: getRefreshToken(),
  };

  const res = await axiosClient.post("/auth/refresh-token", refreshData);

  setAuthData(res.data);

  return res.data;
}
function logout() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(EXPIRES_AT_KEY);
}

function setAuthData(response) {
  localStorage.setItem(TOKEN_KEY, response.accessToken);
  localStorage.setItem(REFRESH_TOKEN_KEY, response.refreshToken);
  localStorage.setItem(EXPIRES_AT_KEY, response.expiresAt);
}

function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}
function getRefreshToken() {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
}
function getCurrentUser() {
  const token = getToken();

  if (!token) return null;
  const expiresAt = localStorage.getItem(EXPIRES_AT_KEY);
  if (expiresAt) {
    const isExpired = new Date(expiresAt) < new Date();
    if (isExpired) {
      logout();
      return null;
    }
  }

  return decodeToken(token);
}
export default authService;
