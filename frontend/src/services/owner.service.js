// Owner API service
// Location: frontend/src/services/owner.service.js

import api from '../utils/api';

export const ownerService = {
  getDashboard: async () => {
    const response = await api.get('/owner/dashboard');
    return response.data;
  },

  getStoreRatings: async (storeId) => {
    const response = await api.get(`/owner/stores/${storeId}/ratings`);
    return response.data;
  },
};

