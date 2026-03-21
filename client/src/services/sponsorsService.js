import api from './api';

const sponsorsService = {
  getAll: async () => {
    const response = await api.get('/api/sponsors');
    return response.data;
  },

  create: async (formData) => {
    const response = await api.post('/api/sponsors', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },

  update: async (id, formData) => {
    const response = await api.put(`/api/sponsors/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/api/sponsors/${id}`);
    return response.data;
  }
};

export default sponsorsService;
