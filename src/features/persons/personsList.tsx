import React, { useCallback, useState } from 'react';
import { useQuery } from 'react-query';
import { Flex, Heading, InputGroup, InputLeftElement, Input, Icon, Button, useDisclosure } from '@chakra-ui/react';
import { MdSearch } from 'react-icons/md';
import PersonService from '../../api/personService';
import { Items, Person, PersonsSearchResponse } from '../../api/types';
import List from './list';
import AddPersonModal from './addPerson';

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

type FooterProps = {
  onAddPersonClick: () => void;
};

function Footer({ onAddPersonClick }: FooterProps) {
  return (
    <Flex bg="#ebebeb" width="100%" p={4} shrink={0} justify="flex-end">
      <Button onClick={onAddPersonClick}>Add Person</Button>
    </Flex>
  );
}

function Persons() {
  const { isOpen: isAddPersonOpen, onOpen: onAddPersonOpen, onClose: onAddPersonClose } = useDisclosure();
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const isSearchEnabled = searchQuery.length >= 2;

  const { data: personList, isLoading } = useQuery(
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

  const persons = isSearchEnabled ? searchResult : personList;

  const handleOnSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchQuery(value);
    if (value.length >= 2) {
      setCurrentPage(0);
    }
  };

  const hasMoreItems = searchResult
    ? searchResult.additional_data.pagination.more_items_in_collection
    : personList?.additional_data.pagination.more_items_in_collection;

  const handleOnPreviousPage = () => {
    setCurrentPage((prevPageState) => prevPageState - PersonService.defaultListLimit);
  };

  const handleOnNextPage = () => {
    setCurrentPage((prevPageState) => prevPageState + PersonService.defaultListLimit);
  };

  return (
    <Flex w="full" flexDirection="column">
      <Header onSearch={handleOnSearch} searchQuery={searchQuery} />

      <List
        persons={persons?.data ?? []}
        currentPage={currentPage}
        hasMore={hasMoreItems ?? false}
        onNextPage={handleOnNextPage}
        onPreviousPage={handleOnPreviousPage}
      />

      <Footer onAddPersonClick={onAddPersonOpen} />
      <AddPersonModal onAddPersonClose={onAddPersonClose} isAddPersonOpen={isAddPersonOpen} />
    </Flex>
  );
}

export default Persons;
