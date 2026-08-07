import { Box, Flex } from '@chakra-ui/react';
import type { ReactNode } from 'react';

import { Footer } from './components/footer';
import { Header } from './components/header';
import { useColorModeValue } from '../components/ui/color-mode';

type LayoutProps = {
  children: ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
const bg = useColorModeValue('white', 'gray.900');
  return (
  <Box margin="0" padding="0" maxWidth="full" transition="0.5s ease-out" bg={bg}>
    <Flex minHeight="90vh" wrap="wrap">
      <Header />
      <Box as="main" width="full">
        {children}
      </Box>
      <Footer />
    </Flex>
  </Box>
  )
};
