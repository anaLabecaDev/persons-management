import apiClient from './api';
import {
  CreatePersonPayload,
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

const create = async (personPayload: CreatePersonPayload) => {
  const personData: CreatePersonRequest = {
    name: personPayload.name,
    ...(personPayload.email && {
      email: [
        {
          value: personPayload.email,
          primary: true,
          label: 'email',
        },
      ],
    }),
    ...(personPayload.phone && {
      phone: [
        {
          value: personPayload.phone,
          primary: true,
          label: 'email',
        },
      ],
    }),
    ...(personPayload.assistant && { '73d17c3f4d3c8a3856179466873d81a19b931b68': personPayload.assistant }),
    ...(personPayload.groups && { a4329aa33eb3484ce969c8ea9955d7c6a3d2b954: personPayload.groups }),
  };

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
