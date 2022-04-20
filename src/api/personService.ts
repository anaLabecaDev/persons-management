import apiClient from './api';
import {
  CreatePersonRequest,
  DeletePersonResponse,
  PersonByIdResponse,
  PersonsResponse,
  PersonsSearchResponse,
} from './types';

const defaultListLimit = 15;

const getAll = async (page: number, limit = defaultListLimit) => {
  const response = await apiClient.get<PersonsResponse>('/persons', { params: { limit, start: page } });
  return response.data;
};

const getById = async (id: string) => {
  const response = await apiClient.get<PersonByIdResponse>(`/persons/${id}`);
  return response.data;
};

const search = async (query: string, page: number, limit = defaultListLimit) => {
  const response = await apiClient.get<PersonsSearchResponse>('/persons/search', {
    params: { term: query, fields: ['name'], limit, start: page },
  });
  return response.data;
};

const deletePerson = async (id: number) => {
  const response = await apiClient.delete<DeletePersonResponse>(`/persons/${id}`);
  return response.data;
};

const create = async (personData: CreatePersonRequest) => {
  const response = await apiClient.post<PersonByIdResponse>('/persons', personData);
  return response.data;
};

const PersonService = {
  getAll,
  getById,
  search,
  deletePerson,
  create,
  defaultListLimit,
};

export default PersonService;
