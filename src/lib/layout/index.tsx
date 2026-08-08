import { Box, Flex } from '@chakra-ui/react';
import type { ReactNode } from 'react';

import { useColorModeValue } from '../components/ui/color-mode';
import { Footer } from './components/footer';
import { Header } from './components/header';

type LayoutProps = {
  children: ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  const bg = useColorModeValue('white', 'gray.900');

  return (
    <Box
      bg={bg}
      margin="0"
      maxWidth="full"
      padding="0"
      transition="0.5s ease-out"
    >
      <Flex minHeight="90vh" wrap="wrap">
        <Header />
        <Box as="main" width="full">
          {children}
        </Box>
        <Footer />
      </Flex>
    </Box>
  );
};
