import * as authApi from "../api/auth.api";

export const registerUser = async (userData) => {
  const response = await authApi.register(userData);
  return response.data;
};

export const loginUser = async (userData) => {
  const response = await authApi.login(userData);
  return response.data;
};

export const logoutUser = async () => {
  const response = await authApi.logout();
  return response.data;
};

export const getProfile = async () => {
  const response = await authApi.getProfile();
  return response.data;
};

export const refreshAccessToken = async () => {
  const response = await authApi.refreshToken();
  return response.data;
};

export const verifyUserEmail = async (token) => {
  const response = await authApi.verifyEmail(token);
  return response.data;
};