import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from '@chakra-ui/react';
import { useQuery } from 'react-query';
import PersonService from '../../api/personService';

type PersonDetailModalProps = {
  isDetailOpen: boolean;
  onDetailClose: () => void;
};

function PersonDetailModal({ isDetailOpen, onDetailClose }: PersonDetailModalProps) {
  // const { data } = useQuery([`person-${personId}`], async () => PersonService.getById(personId));

  return (
    <Modal isOpen={isDetailOpen} onClose={onDetailClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Persons information</ModalHeader>
        <ModalCloseButton />
        <ModalBody>body</ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onDetailClose}>
            Back
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default PersonDetailModal;
