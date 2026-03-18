import api from './api';

const galleryService = {
  getAll: async (edition, category) => {
    const params = {};
    if (edition) params.edition = edition;
    if (category) params.category = category;
    
    const response = await api.get('/api/gallery', { params });
    return response.data;
  },
  upload: async (formData) => {
    const response = await api.post('/api/gallery', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },
  remove: async (id) => {
    const response = await api.delete(`/api/gallery/${id}`);
    return response.data;
  }
};

export default galleryService;
