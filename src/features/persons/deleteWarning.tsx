import React, { useRef } from 'react';
import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Text,
  Button,
  Icon,
  Flex,
} from '@chakra-ui/react';
import { MdOutlineWarning } from 'react-icons/md';
import { useDeletePerson } from './queries';

type DeleteWarningProps = {
  personId: number;
  isDeleteWarningOpen: boolean;
  onDeleteWarningClose: () => void;
};

function DeleteWarning({ personId, isDeleteWarningOpen, onDeleteWarningClose }: DeleteWarningProps) {
  const cancelRef = useRef<HTMLButtonElement>(null);

  const deletePerson = useDeletePerson();

  const handleOnDelete = () => {
    if (personId) {
      deletePerson.mutate(personId, { onSuccess: () => onDeleteWarningClose() });
    }
  };

  return (
    <AlertDialog isOpen={isDeleteWarningOpen} leastDestructiveRef={cancelRef} onClose={onDeleteWarningClose}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader borderBottomWidth="1px" borderBottomColor="grey.500" bg="blackAlpha.100">
            Delete Customer
          </AlertDialogHeader>

          <AlertDialogBody>
            <Flex direction="column" align="center" justify="center" p="8">
              <Icon as={MdOutlineWarning} color="red.500" w="32" h="32" />
              <Text textAlign="center" fontSize="md" fontWeight="bold" p={2}>
                Are you sure? You can&apos;t undo this action afterwards.
              </Text>
            </Flex>
          </AlertDialogBody>

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
