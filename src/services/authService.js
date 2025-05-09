// src/services/authService.js
import { apiGet, apiPost } from './api';

export const login = async (email, password) => {
  return apiPost('/auth/login', { email, password });
};

export const logout = async () => {
  return apiPost('/auth/logout');
};

export const getCurrentUser = async () => {
  return apiGet('/auth/me');
};
