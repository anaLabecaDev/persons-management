import { Box, Flex } from '@chakra-ui/react';
import React from 'react';

interface ILayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: ILayoutProps) {
  return (
    <Flex width="100%" h="100vh" flexDirection="column" overflow="hidden">
      <Flex bg="#2a3647" h={10} alignItems="center" justifyContent="space-between">
        LOGO
      </Flex>
      <Box flex="1">{children}</Box>
      <Box bg="#ebebeb" width="100%" h={10} />
    </Flex>
  );
}

export default Layout;
