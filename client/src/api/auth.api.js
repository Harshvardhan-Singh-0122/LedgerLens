import api from "./axios";

export const register = (data) => api.post("/auth/register", data);

export const login = (data) => api.post("/auth/login", data);

export const logout = () => api.post("/auth/logout");

export const getProfile = () => api.get("/auth/profile");

export const refreshToken = () => api.post("/auth/refresh-token");

export const verifyEmail = (token) => api.get(`/auth/verify-email?token=${token}`);