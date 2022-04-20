import React, { useRef } from 'react';
import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
} from '@chakra-ui/react';
import { useMutation, useQueryClient } from 'react-query';
import PersonService from '../../api/personService';

type DeleteWarningProps = {
  personId: number;
  isDeleteWarningOpen: boolean;
  onDeleteWarningClose: () => void;
};

function DeleteWarning({ personId, isDeleteWarningOpen, onDeleteWarningClose }: DeleteWarningProps) {
  const cancelRef = useRef<HTMLButtonElement>(null);
  const queryClient = useQueryClient();

  const deletePerson = useMutation((id: number) => PersonService.deletePerson(id), {
    onSuccess: () => {
      onDeleteWarningClose();
      queryClient.invalidateQueries(['persons', 'searchPersons']);
    },
  });

  const handleOnDelete = () => {
    if (personId) {
      deletePerson.mutate(personId);
    }
  };

  return (
    <AlertDialog isOpen={isDeleteWarningOpen} leastDestructiveRef={cancelRef} onClose={onDeleteWarningClose}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader borderBottomWidth="1px" borderBottomColor="grey.500" bg="blackAlpha.100">
            Delete Customer
          </AlertDialogHeader>

          <AlertDialogBody>Are you sure? You can&apos;t undo this action afterwards.</AlertDialogBody>

          <AlertDialogFooter borderTopWidth="1px" borderTopColor="grey.500" bg="blackAlpha.100">
            <Button borderRadius="unset" bg="white" ref={cancelRef} onClick={onDeleteWarningClose}>
              Cancel
            </Button>
            <Button
              variant="outline"
              colorScheme="red"
              onClick={handleOnDelete}
              ml={3}
              isLoading={deletePerson.isLoading}
            >
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}

export default DeleteWarning;
