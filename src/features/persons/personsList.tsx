import React from 'react';
import { useQuery } from 'react-query';
import {
  Avatar,
  Flex,
  Box,
  Text,
  Heading,
  InputGroup,
  InputLeftElement,
  Input,
  VStack,
  Icon,
  useDisclosure,
} from '@chakra-ui/react';
import { MdSearch, MdDomain } from 'react-icons/md';
import PersonService from '../../api/personService';
import { Person } from '../../api/types';
import PersonDetailModal from './personDetail';

function Header() {
  return (
    <Flex
      width="100%"
      justifyContent="space-between"
      alignItems="center"
      borderBottomWidth="1px"
      borderBottomColor="grey.500"
      p={4}
      position="fixed"
      zIndex="sticky"
      bg="white"
    >
      <Heading size="sm" color="blackAlpha.800">
        People&apos;s List
      </Heading>
      <InputGroup maxW="xs" size="sm">
        <InputLeftElement pointerEvents="none">
          <Icon as={MdSearch} color="blackAlpha.600" fontSize="1.2em" />
        </InputLeftElement>
        <Input
          rounded="full"
          border={0}
          bg="blackAlpha.200"
          type="search"
          placeholder="Filter by name"
          _placeholder={{
            color: 'blackAlpha.400',
          }}
        />
      </InputGroup>
    </Flex>
  );
}

type PersonCardProps = {
  name: string;
  organizationName: string;
  onClick: () => void;
};

function PersonCard({ name, organizationName, onClick }: PersonCardProps) {
  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      borderWidth="1px"
      borderColor="grey.500"
      py={2}
      px={4}
      onClick={onClick}
    >
      <Box>
        <Text fontSize="sm" color="blackAlpha.700" fontWeight="bold" lineHeight="short">
          {name}
        </Text>
        <Text fontSize="xs" color="blackAlpha.500">
          <Icon as={MdDomain} mr={1} />
          {organizationName}
        </Text>
      </Box>
      <Avatar bg="blue.100" color="blue.400" name={name} />
    </Flex>
  );
}

type PersonListProps = {
  persons: Person[];
};

function PersonList({ persons }: PersonListProps) {
  const { isOpen: isDetailOpen, onOpen: onDetailOpen, onClose: onDetailClose } = useDisclosure();
  return (
    <>
      <PersonDetailModal isDetailOpen={isDetailOpen} onDetailClose={onDetailClose} />
      <VStack spacing={4} align="stretch" px="4" py="20">
        {persons.map((person: Person) => {
          const { id, name, org_name: orgName } = person;
          return <PersonCard key={id} name={name} organizationName={orgName} onClick={onDetailOpen} />;
        })}
      </VStack>
    </>
  );
}

function Persons() {
  const { data } = useQuery(['persons'], PersonService.getAll);

  return (
    <Box w="full">
      <Header />
      {data && <PersonList persons={data?.data} />}
    </Box>
  );
}

export default Persons;
