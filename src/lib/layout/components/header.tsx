import { Box, Flex } from '@chakra-ui/react';

import { ColorModeButton, useColorModeValue } from '@/lib/components/ui/color-mode';
import { useProfile } from '@/lib/components/ui/profile-provider';
export const Header = () => {
  
  const profile = useProfile();
  if(!profile) return null;
  const options = profile.profileOptions[0];
  const colorPalette = options?.colorPalette ?? 'teal';
  const background = useColorModeValue(colorPalette + '.50', 'gray.900');

  return (
  <Flex
    align="center"
    alignSelf="flex-start"
    as="header"
    gridGap={2}
    justifyContent="center"
    width="full"
    bg={background}
    padding="8"
  >
    <Box marginLeft="auto">
      <ColorModeButton />
    </Box>
  </Flex>
  )
};
