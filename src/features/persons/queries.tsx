import { useMutation, useQueryClient } from 'react-query';
import PersonService from '../../api/personService';
import { CreatePersonPayload } from '../../api/types';

export const useDeletePerson = () => {
  const queryClient = useQueryClient();

  return useMutation((id: number) => PersonService.deletePerson(id), {
    onSuccess: () => {
      // ✅ always invalidate the list list
      queryClient.invalidateQueries(['persons', 'search']);
    },
  });
};

export const useAddPerson = () => {
  const queryClient = useQueryClient();

  return useMutation((person: CreatePersonPayload) => PersonService.create(person), {
    onSuccess: () => {
      queryClient.invalidateQueries(['persons', 'search']);
    },
  });
};
