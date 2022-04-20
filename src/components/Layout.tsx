import { Flex } from '@chakra-ui/react';
import React from 'react';

interface ILayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: ILayoutProps) {
  return (
    <Flex width="100%" h="100vh" flexDirection="column">
      <Flex bg="#2a3647" h={10} alignItems="center" justifyContent="space-between" shrink={0}>
        LOGO
      </Flex>
      <Flex grow={1} overflow="auto">
        {children}
      </Flex>
      <Flex bg="#ebebeb" width="100%" h={10} shrink={0} />
    </Flex>
  );
}

export default Layout;
