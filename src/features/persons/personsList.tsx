import React, { useCallback, useState } from 'react';
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
import { Items, Person, PersonsSearchResponse } from '../../api/types';
import PersonDetailModal from './personDetail';

type HeaderProps = {
  searchQuery: string;
  onSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

function Header({ searchQuery, onSearch }: HeaderProps) {
  return (
    <Flex justifyContent="space-between" alignItems="center" borderBottomWidth="1px" borderBottomColor="grey.500" p={4}>
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
          value={searchQuery}
          onChange={onSearch}
        />
      </InputGroup>
    </Flex>
  );
}

type PersonCardProps = {
  id: number;
  name: string;
  organizationName: string;
  onClick: (personId: number) => void;
};

function PersonCard({ name, organizationName, onClick, id }: PersonCardProps) {
  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      borderWidth="1px"
      borderColor="grey.500"
      py={2}
      px={4}
      onClick={() => onClick(id)}
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
  // TODO: Improve this solution to open info modal (maybe useRef is better)
  const [selectedPerson, setSelectedPerson] = useState<number | null>();
  const { isOpen: isDetailOpen, onOpen: onDetailOpen, onClose: onDetailClose } = useDisclosure();

  const onPersonClick = (personId: number) => {
    setSelectedPerson(personId);
    onDetailOpen();
  };
  return (
    <>
      {selectedPerson && (
        <PersonDetailModal isDetailOpen={isDetailOpen} onDetailClose={onDetailClose} personId={selectedPerson} />
      )}
      <VStack spacing={4} align="stretch" px="4" py="20">
        {persons.map((person: Person) => {
          const { id, name, org_name: orgName } = person;
          return <PersonCard key={id} id={id} name={name} organizationName={orgName} onClick={onPersonClick} />;
        })}
      </VStack>
    </>
  );
}

function Persons() {
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const isSearchEnabled = searchQuery.length > 2;

  const { data: personList } = useQuery(
    ['persons', searchQuery, currentPage],
    async () => PersonService.getAll(currentPage),
    {
      enabled: !isSearchEnabled,
    }
  );

  const { data: searchResult } = useQuery(
    ['search', searchQuery, currentPage],
    async () => PersonService.search(searchQuery, currentPage),
    {
      enabled: isSearchEnabled,
      select: useCallback(
        (data: PersonsSearchResponse) => ({
          ...data,
          data: data.data.items.reduce((acc: Person[], curr: Items) => [...acc, curr.item], []),
        }),
        []
      ),
    }
  );

  const handleOnSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const persons = isSearchEnabled ? searchResult : personList;
  const hasMoreItems = searchResult
    ? searchResult.additional_data.pagination.more_items_in_collection
    : personList?.additional_data.pagination.more_items_in_collection;

  return (
    <Box w="full">
      <Header onSearch={handleOnSearch} searchQuery={searchQuery} />
      <PersonList persons={persons?.data ?? []} />
    </Box>
  );
}

export default Persons;
