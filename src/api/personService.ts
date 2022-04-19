import apiClient from './api';
import { PersonsResponse } from './types';

const getAll = async () => {
  const response = await apiClient.get<PersonsResponse>('/persons', { params: { limit: 20 } });
  return response.data;
};

const getById = async (id: string) => {
  const response = await apiClient.get(`/persons/${id}`);
  return response.data;
};

const search = async (query: string) => {
  const response = await apiClient.get('/persons/search', { params: { term: query, fields: ['name'], limit: 20 } });
  return response.data;
};

const PersonService = {
  getAll,
  getById,
  search,
};

export default PersonService;
