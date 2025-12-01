// Auth API service
// Location: frontend/src/services/auth.service.js

import api from '../utils/api';

export const authService = {
  register: async (data) => {
    const response = await api.post('/auth/register', data);
    return response.data;
  },

  login: async (data) => {
    const response = await api.post('/auth/login', data);
    return response.data;
  },

  updatePassword: async (data) => {
    const response = await api.put('/auth/password', data);
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
};

