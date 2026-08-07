import { Flex, Text } from '@chakra-ui/react';
import { COPYRIGHT_TEXT } from '@/lib/services/constants';
import { useColorModeValue } from '@/lib/components/ui/color-mode';
import { useProfile } from '@/lib/components/ui/profile-provider';

export const Footer = () => {
  const profile = useProfile();
  if(!profile) return null;
  const options = profile.profileOptions[0];
  const colorPalette = options?.colorPalette ?? 'teal';
  const bg = useColorModeValue(colorPalette + '.50', 'gray.900');

  return (
  <Flex
    align="center"
    alignSelf="flex-end"
    as="footer"
    justifyContent="center"
    width="full"
    bg={bg}
  >
    <Text fontSize="xs">
      {COPYRIGHT_TEXT}
    </Text>
  </Flex>
  )
};
