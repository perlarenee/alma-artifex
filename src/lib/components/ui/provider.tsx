'use client';

import { ChakraProvider } from '@chakra-ui/react';

import { theme } from '@/lib/styles/theme';

import { ColorModeProvider } from './color-mode';
import {ProfileProvider} from './profile-provider';

export function Provider(props: React.PropsWithChildren) {
  return (
    <ChakraProvider value={theme}>
      <ColorModeProvider>
        <ProfileProvider>{props.children}</ProfileProvider>
      </ColorModeProvider>
    </ChakraProvider>
  );
}
