import api from './api';

const teamService = {
  getAll: async (section) => {
    const params = section ? { section } : {};
    const response = await api.get('/api/team', { params });
    return response.data;
  },
  getById: async (id) => {
    const response = await api.get(`/api/team/${id}`);
    return response.data;
  },
  create: async (formData) => {
    const response = await api.post('/api/team', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },
  update: async (id, formData) => {
    const response = await api.put(`/api/team/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },
  delete: async (id) => {
    const response = await api.delete(`/api/team/${id}`);
    return response.data;
  }
};

export default teamService;
