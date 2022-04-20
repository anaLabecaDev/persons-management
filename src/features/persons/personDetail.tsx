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
  Avatar,
  Flex,
  Text,
  SimpleGrid,
  List,
  ListItem,
} from '@chakra-ui/react';
import { useQuery } from 'react-query';
import PersonService from '../../api/personService';
import { Person } from '../../api/types';
import PersonsUtils from './util';

type PersonInfoProps = {
  person: Person;
};
function PersonInfo({ person }: PersonInfoProps) {
  const {
    name,
    phone,
    email,
    org_name: organization,
    '73d17c3f4d3c8a3856179466873d81a19b931b68': assistant,
    a4329aa33eb3484ce969c8ea9955d7c6a3d2b954: groups,
  } = person;
  return (
    <Flex direction="column">
      <Flex direction="column" align="center" justifyContent="center" py="8">
        <Avatar size="xl" bg="blue.100" color="blue.400" name={name} mb={4} />

        <Text color="black" fontWeight="bold">
          {name}
        </Text>
        <Text color="green.300" fontWeight="bold">
          {PersonsUtils.getPrimaryValue(phone)}
        </Text>
      </Flex>

      <SimpleGrid borderTopWidth="1px" borderTopColor="grey.500" templateColumns="auto 1fr" gap={4} py="10">
        <List fontSize="sm" fontWeight="bold" spacing={2} textAlign="right">
          <ListItem>Email</ListItem>
          <ListItem>Organization</ListItem>
          <ListItem>Assistant</ListItem>
          <ListItem>Groups</ListItem>
          <ListItem>Location</ListItem>
        </List>
        <List fontSize="sm" isTruncated spacing={2} color="blackAlpha.500">
          <ListItem>{PersonsUtils.getPrimaryValue(email) ?? '--'}</ListItem>
          <ListItem>{organization ?? '--'}</ListItem>
          <ListItem>{assistant ?? '--'}</ListItem>
          <ListItem>{groups ?? '--'}</ListItem>
          <ListItem>Location</ListItem>
        </List>
      </SimpleGrid>
    </Flex>
  );
}

type PersonDetailModalProps = {
  personId: number;
  isDetailOpen: boolean;
  onDetailClose: () => void;
};

function PersonDetailModal({ isDetailOpen, onDetailClose, personId }: PersonDetailModalProps) {
  const { data } = useQuery([`person-${personId}`], async () => PersonService.getById(personId.toString()));

  return (
    <Modal isOpen={isDetailOpen} onClose={onDetailClose} size="sm">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader borderBottomWidth="1px" borderBottomColor="grey.500" bg="blackAlpha.100">
          Persons information
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>{data && <PersonInfo person={data.data} />}</ModalBody>
        <ModalFooter borderTopWidth="1px" borderTopColor="grey.500" bg="blackAlpha.100">
          <Button variant="outline" onClick={onDetailClose} borderRadius="unset" bg="white">
            Back
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default PersonDetailModal;
