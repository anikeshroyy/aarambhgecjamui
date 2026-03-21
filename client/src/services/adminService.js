import api from './api';

const adminService = {
  list: async () => {
    const response = await api.get('/api/admin/list');
    return response.data;
  },

  create: async (adminData) => {
    const response = await api.post('/api/admin/create', adminData);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/api/admin/${id}`);
    return response.data;
  }
};

export default adminService;
