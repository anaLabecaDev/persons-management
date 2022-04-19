import React from 'react';
import { useQuery } from 'react-query';
import { Avatar, Flex, Box, Text, Heading, InputGroup, InputLeftElement, Input, VStack, Icon } from '@chakra-ui/react';
import { MdSearch, MdDomain } from 'react-icons/md';
import PersonService from '../../api/personService';
import { Person } from '../../api/types';

function Header() {
  return (
    <Flex justifyContent="space-between" alignItems="center" borderBottomWidth="1px" borderBottomColor="grey.500" p={4}>
      <Heading size="md" color="blackAlpha.800">
        Peoples List
      </Heading>
      <InputGroup border={0} maxW="sm">
        {/* eslint-disable-next-line react/no-children-prop */}
        <InputLeftElement pointerEvents="none" children={<Icon as={MdSearch} />} width="4.5rem" />
        <Input
          rounded="full"
          border={0}
          bg="blackAlpha.200"
          type="search"
          placeholder="Filter by name"
          _placeholder={{
            color: 'blackAlpha.500',
          }}
        />
      </InputGroup>
    </Flex>
  );
}

type PersonCardProps = {
  name: string;
  organizationName: string;
};

function PersonCard({ name, organizationName }: PersonCardProps) {
  return (
    <Flex justifyContent="space-between" alignItems="center" borderWidth="1px" borderColor="grey.500" py={2} px={4}>
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
  return (
    <VStack spacing={4} align="stretch" p="4">
      {persons.map((person: Person) => {
        const { id, name, org_name: orgName } = person;
        return <PersonCard key={id} name={name} organizationName={orgName} />;
      })}
    </VStack>
  );
}

function Persons() {
  const { data } = useQuery(['persons'], PersonService.getAll);

  return (
    <Box>
      <Header />
      {data && <PersonList persons={data?.data} />}
    </Box>
  );
}

export default Persons;
