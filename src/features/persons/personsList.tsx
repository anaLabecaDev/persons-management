import React from 'react';
import { Avatar, Flex, Box, Text, Heading, InputGroup, InputLeftElement, Input, VStack } from '@chakra-ui/react';
import { useQuery } from 'react-query';
import PersonService from '../../api/personService';

function Header() {
  return (
    <Flex justifyContent="space-between" alignItems="center" borderBottomWidth="1px" borderBottomColor="grey.500" p={4}>
      <Heading size="md" color="blackAlpha.800">
        Peoples List
      </Heading>
      <InputGroup border={0} maxW="sm">
        {/* eslint-disable-next-line react/no-children-prop */}
        <InputLeftElement pointerEvents="none" children="s" width="4.5rem" />
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

function PersonCard() {
  return (
    <Flex justifyContent="space-between" alignItems="center" borderWidth="1px" borderColor="grey.500" py={2} px={4}>
      <Box>
        <Text fontSize="sm" color="blackAlpha.700" fontWeight="bold" lineHeight="short">
          Ana Labeca
        </Text>
        <Text fontSize="xs" color="blackAlpha.500">
          company
        </Text>
      </Box>
      <Avatar bg="blue.100" color="blue.400" name="Ana labeca" />
    </Flex>
  );
}

function PersonList() {
  return (
    <VStack spacing={4} align="stretch" p="4">
      <PersonCard />
    </VStack>
  );
}

function PersonsList() {
  const { data } = useQuery(['persons'], PersonService.getAll);

  return (
    <Box>
      <Header />
      <PersonList />
    </Box>
  );
}

export default PersonsList;
