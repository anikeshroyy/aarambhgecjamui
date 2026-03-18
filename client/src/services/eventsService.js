import api from './api';

const eventsService = {
  getAll: async (category) => {
    const params = category ? { category } : {};
    const response = await api.get('/api/events', { params });
    return response.data;
  },
  getById: async (id) => {
    const response = await api.get(`/api/events/${id}`);
    return response.data;
  },
  create: async (formData) => {
    const response = await api.post('/api/events', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },
  update: async (id, formData) => {
    const response = await api.put(`/api/events/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },
  remove: async (id) => {
    const response = await api.delete(`/api/events/${id}`);
    return response.data;
  }
};

export default eventsService;
