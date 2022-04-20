import React, { useState } from 'react';
import { Avatar, Box, Button, Flex, HStack, Icon, Text, useDisclosure, VStack } from '@chakra-ui/react';
import { MdDomain } from 'react-icons/md';
import { Person } from '../../api/types';
import PersonDetailModal from './personDetail';

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
      shrink={0}
    >
      <Box>
        <Text fontSize="sm" color="blackAlpha.700" fontWeight="bold" lineHeight="short">
          {name}
        </Text>
        <Text fontSize="xs" color="blackAlpha.500">
          <Icon as={MdDomain} mr={1} />
          {organizationName ?? '--'}
        </Text>
      </Box>
      <Avatar bg="blue.100" color="blue.400" name={name} />
    </Flex>
  );
}

type ListProps = {
  persons: Person[];
  onPreviousPage: () => void;
  onNextPage: () => void;
  currentPage: number;
  hasMore: boolean;
};

function List({ persons, onPreviousPage, onNextPage, currentPage, hasMore }: ListProps) {
  // TODO: Improve this solution to open info modal (maybe useRef is better)
  const [selectedPerson, setSelectedPerson] = useState<number | null>();
  const { isOpen: isDetailOpen, onOpen: onDetailOpen, onClose: onDetailClose } = useDisclosure();

  const onPersonClick = (personId: number) => {
    setSelectedPerson(personId);
    onDetailOpen();
  };

  return (
    <Flex grow={1} overflow="auto" direction="column">
      {selectedPerson && (
        <PersonDetailModal isDetailOpen={isDetailOpen} onDetailClose={onDetailClose} personId={selectedPerson} />
      )}
      <VStack spacing={4} align="stretch" p="4">
        {persons.map((person: Person) => {
          const { id, name, org_name: orgName } = person;
          return <PersonCard key={id} id={id} name={name} organizationName={orgName} onClick={onPersonClick} />;
        })}
      </VStack>
      <HStack justify="center" spacing={4} py="4">
        <Button variant="outline" onClick={onPreviousPage} disabled={currentPage === 0}>
          Previous
        </Button>
        <Button variant="outline" onClick={onNextPage} disabled={!hasMore}>
          Next
        </Button>
      </HStack>
    </Flex>
  );
}

export default List;
