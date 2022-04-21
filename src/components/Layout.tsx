import React from 'react';
import { Flex, Image } from '@chakra-ui/react';

interface ILayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: ILayoutProps) {
  return (
    <Flex width="100%" h="100vh" flexDirection="column">
      <Flex bg="#2a3647" p="2" alignItems="center" justifyContent="space-between" shrink={0}>
        <Image
          h="40px"
          objectFit="cover"
          src="http://labelcall.com/wp-content/uploads/2020/12/pipedrive-logo.png"
          alt="Pipedrive logo"
        />
      </Flex>
      <Flex grow={1} overflow="auto">
        {children}
      </Flex>
    </Flex>
  );
}

export default Layout;
