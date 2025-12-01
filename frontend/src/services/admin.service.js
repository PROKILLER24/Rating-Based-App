// Admin API service
// Location: frontend/src/services/admin.service.js

import api from '../utils/api';

export const adminService = {
  getDashboard: async () => {
    const response = await api.get('/admin/dashboard');
    return response.data;
  },
};

