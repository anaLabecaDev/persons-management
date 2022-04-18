import apiClient from './api';

const getAll = async () => {
  const response = await apiClient.get('/persons', { params: { limit: 20 } });
  return response.data;
};

const getById = async (id: string) => {
  const response = await apiClient.get(`/tutorials/${id}`);
  return response.data;
};

const PersonService = {
  getAll,
  getById,
};

export default PersonService;
