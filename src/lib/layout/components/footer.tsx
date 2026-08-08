import { Flex, Text } from '@chakra-ui/react';

import { useColorModeValue } from '@/lib/components/ui/color-mode';
import { useProfile } from '@/lib/components/ui/profile-provider';
import { COPYRIGHT_TEXT } from '@/lib/services/constants';

export const Footer = () => {
  const profile = useProfile();
  const [options] = profile?.profileOptions ?? [];
  const colorPalette = options?.colorPalette ?? 'teal';
  const bg = useColorModeValue(`${colorPalette}.50`, 'gray.900');

  if (!profile) {
    return null;
  }

  return (
    <Flex
      align="center"
      alignSelf="flex-end"
      as="footer"
      bg={bg}
      justifyContent="center"
      width="full"
    >
      <Text fontSize="xs">{COPYRIGHT_TEXT}</Text>
    </Flex>
  );
};
