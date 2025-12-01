// Rating API service
// Location: frontend/src/services/rating.service.js

import api from '../utils/api';

export const ratingService = {
  createOrUpdateRating: async (data) => {
    const response = await api.post('/ratings', data);
    return response.data;
  },

  getMyRatings: async () => {
    const response = await api.get('/ratings/my-ratings');
    return response.data;
  },

  deleteRating: async (id) => {
    const response = await api.delete(`/ratings/${id}`);
    return response.data;
  },
};

