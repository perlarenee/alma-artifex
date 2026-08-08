import { Box, Flex } from '@chakra-ui/react';

import {
  ColorModeButton,
  useColorModeValue,
} from '@/lib/components/ui/color-mode';
import { useProfile } from '@/lib/components/ui/profile-provider';
export const Header = () => {
  const profile = useProfile();
  const [options] = profile?.profileOptions ?? [];
  const colorPalette = options?.colorPalette ?? 'teal';
  const background = useColorModeValue(`${colorPalette}.50`, 'gray.900');

  if (!profile) {
    return null;
  }

  return (
    <Flex
      align="center"
      alignSelf="flex-start"
      as="header"
      bg={background}
      gridGap={2}
      justifyContent="center"
      padding="8"
      width="full"
    >
      <Box marginLeft="auto">
        <ColorModeButton />
      </Box>
    </Flex>
  );
};
