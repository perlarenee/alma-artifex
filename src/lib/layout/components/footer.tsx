import { Flex, Text } from '@chakra-ui/react';
import { COPYRIGHT_TEXT } from '@/lib/services/constants';

export const Footer = () => (
  <Flex
    align="center"
    alignSelf="flex-end"
    as="footer"
    justifyContent="center"
    width="full"
  >
    <Text fontSize="xs">
      {COPYRIGHT_TEXT}
    </Text>
  </Flex>
);
